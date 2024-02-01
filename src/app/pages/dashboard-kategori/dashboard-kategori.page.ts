import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subject, Subscription, combineLatest, delay, switchMap, tap } from 'rxjs';
import { DashFilterData, Paslon, SuaraPaslon, defaultDashFilterData, defaultPaslon, defaultSuaraPaslon } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-kategori',
  templateUrl: './dashboard-kategori.page.html',
  styleUrls: ['./dashboard-kategori.page.scss'],
})
export class DashboardKategoriPage implements ViewWillEnter, ViewWillLeave {
  private destroy: Subject<void> = new Subject<void>();
  paramId: any = 0;
  tingkatan: string | null = null;

  getAllSubs: Subscription | undefined;

  reloadDashboardTpsIndikator = false;
  reloadDashboardCalegCapresIndikator = false;

  loadingDashboardTpsIndikator = true;
  loadingDashboardCalegCapresIndikator = true;
  constructor(
    private actRoute: ActivatedRoute,
    private callApiServ: CallApiService,
    private token: TokenService,
    private dashboardFilterDataServ: DashboardFilterDataService,
    private modalCtrl: ModalController,
  ) { }

  ionViewWillEnter() {
    this.actRoute.params.subscribe(res => {
      this.paramId = res['id'];
      const mapping = {
        "1": "DPR",
        "2": "DPD",
        "3": "DPRD",
        "4": "DPRD PROVINSI",
        "5": "Presiden"
      };

      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
      this.dashboardFilterDataServ.updateFilterData({
        provinsi: res['id'] === '5' || res['id'] === '1' ? '' : '36',
        kota: res['id'] === '5' || res['id'] === '1' ? '' : '3674',
        kec: '',
        kel: ''
      })
    })
    this.getAllSubs = this.getAll();
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
    this.getAllSubs?.unsubscribe();
  }

  getAll() {
   return  this.dashboardFilterDataServ.getFilterData.subscribe(res => {
      this.tingkatan === "Presiden"
        ? (this.getDataPresiden('', '', '', ''), this.getTotalTps('', '', '', ''), this.getTotalMasukTpsPilpres('', '', '', ''))
        : (
          this.getDataCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!),
          this.getTotalTps(res.provinsi!, res.kota!, res.kec!, res.kel!),
          this.getTotalMasukTpsCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!))
    })
  }


  getDataPresiden(provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`suara-capres`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => {
        this.dashboardFilterDataServ.updatePaslon(res.data)
      }),
      tap(() => this.loadingDashboardCalegCapresIndikator = false)
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
      switchMap((token) => this.callApiServ.getPaslon(`suara-caleg/${id}`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      tap((res: any) => {
        console.log(res.data);
        this.dashboardFilterDataServ.updatePaslon(res.data)
      }),
      tap(() => this.loadingDashboardCalegCapresIndikator = false)
    ).subscribe(
      {
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
      tap(() => this.loadingDashboardTpsIndikator = false)
    ).subscribe(
      {
        error: (e: any) => (
          this.loadingDashboardTpsIndikator = true,
          this.reloadDashboardTpsIndikator = true
        )
      }
    )
  }

  getTotalMasukTpsPilpres(provinsi_id: string, kota_id: string, kecamatan_id: string, kelurahan_id: string) {
    return this.token.getToken.pipe(
      switchMap((token) => this.callApiServ.getPaslon(`get-total-tps-masuk-capres`, token, provinsi_id, kota_id, kecamatan_id, kelurahan_id)),
      delay(1000),
      tap((res: any) => this.dashboardFilterDataServ.updatetotalMasukTps(res.data)),
      tap(() => this.loadingDashboardTpsIndikator = false)
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
      tap(() => this.loadingDashboardTpsIndikator = false)
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

  filterData(newData: DashFilterData) {
    this.dashboardFilterDataServ.updateFilterData(newData);
    this.dashboardFilterDataServ.getFilterData
    .pipe(
      tap(()=>this.modalCtrl.dismiss('confirm'))
    ).subscribe(res=> {
      this.tingkatan === "Presiden"
      ? (this.getDataPresiden(res.provinsi!, res.kota!, res.kec!, res.kel!),
        this.getTotalTps(res.provinsi!, res.kota!, res.kec!, res.kel!),
        this.getTotalMasukTpsPilpres(res.provinsi!, res.kota!, res.kec!, res.kel!))
      : (
        this.getDataCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!),
        this.getTotalTps(res.provinsi!, res.kota!, res.kec!, res.kel!),
        this.getTotalMasukTpsCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!)
      )
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  backtoDash(){
    this.dashboardFilterDataServ.updateFilterData(defaultDashFilterData);
  }

}
