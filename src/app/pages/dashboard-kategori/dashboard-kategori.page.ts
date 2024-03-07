import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { EMPTY, Subject, Subscription, combineLatest, delay, interval, of, startWith, switchMap, take, takeUntil, tap } from 'rxjs';
import { DashFilterData, TotalSuaraPartai, defaultDashFilterData, defaultSuaraPaslon } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-kategori',
  templateUrl: './dashboard-kategori.page.html',
  styleUrls: ['./dashboard-kategori.page.scss'],
})
export class DashboardKategoriPage implements ViewWillEnter, ViewWillLeave, OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  paramId: any = 0;
  tingkatan: string | null = null;

  reloadDashboardTpsIndikator = false;
  reloadDashboardCalegCapresIndikator = false;
  reloadDashboardPerolehanPartai = false;

  loadingDashboardTpsIndikator = true;
  loadingDashboardCalegCapresIndikator = true;
  loadingDashboardPerolehanPartai = true;

  dashFilter: DashFilterData = defaultDashFilterData;
  detectionPage: boolean = false;

  autoReload: boolean = true;

  suaraPartai: TotalSuaraPartai[] = []

  tampilkanList: boolean = true;

  constructor(
    private actRoute: ActivatedRoute,
    private callApiServ: CallApiService,
    private token: TokenService,
    private dashboardFilterDataServ: DashboardFilterDataService,
    private modalCtrl: ModalController,
    private router: Router
  ) {

  }

  ionViewWillEnter() {
    this.actRoute.params.subscribe(res => {
      this.paramId = res['id'];
      const mapping = {
        "1": "DPR",
        "2": "DPD",
        "4": "DPRD I",
        "3": "DPRD II",
        "5": "Presiden"
      };

      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
      // kota: '3674',
      this.dashboardFilterDataServ.updateFilterData({
        provinsi: '36',
        kota: '',
        kec: '',
        kel: ''
      })
    })
    this.getAllAutoRefresh();
    this.dashboardFilterDataServ.getFilterData.subscribe((res) => {
      this.dashFilter = res
    });
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.detectionPageFirstAccess();
  }

  ngOnDestroy(): void {
  }

  detectionPageFirstAccess() {
    return this.router.events
      .pipe(take(1))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.detectionPage = event.id === 1 ? false : true;
        };
      })
  }

  getAll() {
    return combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        take(1),
        tap(([ting, fal]) => ting ? this.getDataPresiden(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalMasukTpsPilpres(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(() => this.getDetailTPS()),
        tap(([ting, fal]) => this.getPerolahanPartai(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        takeUntil(this.destroy)
      )
      .subscribe(([ting, fil]) => EMPTY);
  }

  getAllAutoRefresh() {
    return interval(300000)
      .pipe(
        startWith(0),
        switchMap(() => combineLatest([
          of(this.tingkatan === "Presiden"),
          this.dashboardFilterDataServ.getFilterData
        ])),
        tap(([ting, fal]) => ting ? this.getDataPresiden(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalMasukTpsPilpres(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => this.getPerolahanPartai(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(() => this.getDetailTPS()),
        takeUntil(this.destroy)
      ).subscribe(([ting, fil]) => EMPTY);
  }


  getDataPresiden(provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      tap((res: any) => {
        this.dashboardFilterDataServ.updatePaslon(defaultSuaraPaslon)
      }),
      switchMap((token) => this.callApiServ.getPaslon(`suara-capres`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => {
        this.dashboardFilterDataServ.updatePaslon(res.data)
      }),
      tap(() => this.loadingDashboardCalegCapresIndikator = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        error: (e: any) => (
          this.loadingDashboardCalegCapresIndikator = true,
          this.reloadDashboardCalegCapresIndikator = true
        )
      }
    )
  }

  getDataCaleg(id: number, provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      tap((res: any) => {
        this.dashboardFilterDataServ.updatePaslon(defaultSuaraPaslon)
      }),
      switchMap((token) => this.callApiServ.getPaslon(`suara-caleg/${id}`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => {
        this.dashboardFilterDataServ.updatePaslon(res.data)
      }),
      tap(() => this.loadingDashboardCalegCapresIndikator = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => {
          const filter=  res.data.filter((val: any) => {
            return val.nama_partai === "GOLKAR"
          })
          console.log('golkar', filter);
          
        },
        error: (e: any) => (
          this.loadingDashboardCalegCapresIndikator = true,
          this.reloadDashboardCalegCapresIndikator = true
        )
      }
    )
  }

  getTotalTps(provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`get-total-tps-capres`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => this.dashboardFilterDataServ.updatetotalTps(res.data)),
      tap(() => this.loadingDashboardTpsIndikator = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        error: (e: any) => (
          this.loadingDashboardTpsIndikator = true,
          this.reloadDashboardTpsIndikator = true
        )
      }
    )
  }

  getPerolahanPartai(id: number, provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`suara-partai/${id}`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => this.dashboardFilterDataServ.updateDashSuaraPartai(res.data)),
      tap(() => this.loadingDashboardPerolehanPartai = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        error: (e: any) => (
          this.loadingDashboardPerolehanPartai = true,
          this.reloadDashboardPerolehanPartai = true
        )
      }
    )
  }

  getTotalMasukTpsPilpres(provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`get-total-tps-masuk-capres`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      delay(1000),
      tap((res: any) => this.dashboardFilterDataServ.updatetotalMasukTps(res.data)),
      tap(() => this.loadingDashboardTpsIndikator = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        error: (e: any) => (
          this.loadingDashboardTpsIndikator = true,
          this.reloadDashboardTpsIndikator = true
        )
      }
    )
  }

  getTotalMasukTpsCaleg(id: number, provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`get-total-tps-masuk-caleg/${id}`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      delay(1000),
      tap((res: any) => this.dashboardFilterDataServ.updatetotalMasukTps(res.data)),
      tap(() => this.loadingDashboardTpsIndikator = false),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => {

        },
        error: (e: any) => (
          this.loadingDashboardTpsIndikator = true,
          this.reloadDashboardTpsIndikator = true
        )
      }
    )
  }

  async filterData(newData: DashFilterData) {
    await this.dashboardFilterDataServ.updateFilterData(newData);
    return await combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm')),
        tap(([ting, fal]) => ting ? this.getDataPresiden(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalMasukTpsPilpres(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(() => this.getDetailTPS()),
        tap(([ting, fal]) => this.getPerolahanPartai(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!))
      )
      .subscribe(([ting, fil]) => EMPTY);

  }

  resetData() {
    return combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm')),
        tap(([ting, fal]) => ting ? this.getDataPresiden('', '', '', '') : this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalTps('', '', '', '') : this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalMasukTpsPilpres('', '', '', '') : this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(() => this.getDetailTPS()),
        tap(([ting, fal]) => this.getPerolahanPartai(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!))
      )
      .subscribe(([ting, fil]) => EMPTY);
  }

  reloadList() {
    combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm')),
        tap(([ting, fal]) => ting ? this.getDataPresiden(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
        tap(([ting, fal]) => ting ? this.getTotalMasukTpsPilpres(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!) : this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!))
      ).subscribe(res => {
        EMPTY
      })
  }

  reloadTps() {
    this.dashboardFilterDataServ.getFilterData
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm'))
      ).subscribe(res => {
        this.getTotalTps(res.provinsi!, res.kota!, res.kec!, res.kel!)
      })
  }

  reloadBar() {
    this.dashboardFilterDataServ.getFilterData
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm'))
      ).subscribe(res => {
        this.tingkatan !== "Presiden"
          && this.getDataCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!)
      })
  }

  reloadPie() {
    this.dashboardFilterDataServ.getFilterData
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm'))
      ).subscribe(res => {
        this.tingkatan === "Presiden"
          && this.getDataPresiden(res.provinsi!, res.kota!, res.kec!, res.kel!)
      })
  }

  reloadCapres() {
    this.dashboardFilterDataServ.getFilterData
      .pipe(
        take(1),
        tap(() => this.modalCtrl.dismiss('confirm'))
      ).subscribe(res => {
        this.tingkatan === "Presiden"
          && this.getDataPresiden(res.provinsi!, res.kota!, res.kec!, res.kel!)
      })
  }

  reloadSuaraPartai() {

  }

  backtoDash() {
    this.dashboardFilterDataServ.updateFilterData(defaultDashFilterData);
  }

  getDetailTPS() {
    return combineLatest([
      of(this.tingkatan),
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        switchMap(([tingkatan, token, val]) => {
          if (val.kec === '' && val.kel === '') {
            if (this.tingkatan === 'Presiden') {
              return this.callApiServ.get(`get-detail-tps-kecamatan?provinsi_id=${val.provinsi}&kota_id=${val.kota}`, token);
            } else {
              return this.callApiServ.get(`get-detail-tps-caleg-kecamatan/${this.paramId}?provinsi_id=${val.provinsi}&kota_id=${val.kota}`, token);
            }
          } else if (val.kel === '') {
            if (this.tingkatan === 'Presiden') {
              return this.callApiServ.get(`get-detail-tps-kelurahan/${val.kec}`, token);
            } else {
              return this.callApiServ.get(`get-detail-tps-caleg-kelurahan/${this.paramId}/${val.kec}`, token);
            }
          } else {
            if (this.tingkatan === 'Presiden') {
              return this.callApiServ.get(`get-detail-tps/${val.kel}`, token);
            } else {
              return this.callApiServ.get(`get-detail-tps-caleg/${this.paramId}/${val.kel}`, token);
            }

          }
        }),
        tap((val: any) => this.dashboardFilterDataServ.updateTpsDetail(val.data)),
        takeUntil(this.destroy)
      ).subscribe(
        {
          next: (val: any) => {
          },
          error: (e: any) => (
            console.log(e)
          )
        }
      )
  }

  gotoPageDash() {
    this.router.navigate(['dashboard'])
  }

  openList() {
    this.tampilkanList = this.tampilkanList ? false : true
  }

}
