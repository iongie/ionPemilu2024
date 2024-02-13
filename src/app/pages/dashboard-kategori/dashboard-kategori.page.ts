import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { EMPTY, Subject, Subscription, combineLatest, delay, of, switchMap, take, tap } from 'rxjs';
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
  filterSUbs: Subscription | undefined;

  reloadDashboardTpsIndikator = false;
  reloadDashboardCalegCapresIndikator = false;

  loadingDashboardTpsIndikator = true;
  loadingDashboardCalegCapresIndikator = true;

  dashFilter: DashFilterData = defaultDashFilterData;
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
        "4": "DPRD I",
        "3": "DPRD II",
        "5": "Presiden"
      };

      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
      this.dashboardFilterDataServ.updateFilterData({
        provinsi: '36',
        kota: '3674',
        kec: '',
        kel: ''
      })
      // this.dashboardFilterDataServ.updateFilterData({
      //   provinsi: res['id'] === '5' || res['id'] === '1' ? '' : '36',
      //   kota: res['id'] === '5' || res['id'] === '1' ? '' : '3674',
      //   kec: '',
      //   kel: ''
      // })
    })
    this.getAllSubs = this.getAll();
    this.dashboardFilterDataServ.getFilterData.subscribe((res)=>{
      this.dashFilter = res
    });
    this.getDetailTPS();
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
    this.getAllSubs?.unsubscribe();
  }

  getAll() {
    return combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
    .pipe(
      take(1),
      tap(([ting, fal]) => ting? this.getDataPresiden('', '', '', ''): this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
      tap(([ting, fal]) => ting? this.getTotalTps('', '', '', ''): this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
      tap(([ting, fal]) => ting? this.getTotalMasukTpsPilpres('', '', '', ''): this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!))
    )
    .subscribe(([ting, fil])=> EMPTY);
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
      // delay(1000),
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
      // delay(1000),
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

  async filterData(newData: DashFilterData) {
    await this.dashboardFilterDataServ.updateFilterData(newData);
    return await combineLatest([
      of(this.tingkatan === "Presiden"),
      this.dashboardFilterDataServ.getFilterData
    ])
    .pipe(
      take(1),
      tap(()=>this.modalCtrl.dismiss('confirm')),
      tap(([ting, fal]) => ting? this.getDataPresiden(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!): this.getDataCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
      tap(([ting, fal]) => this.getTotalTps(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
      tap(([ting, fal]) => ting? this.getTotalMasukTpsPilpres(fal.provinsi!, fal.kota!, fal.kec!, fal.kel!): this.getTotalMasukTpsCaleg(this.paramId, fal.provinsi!, fal.kota!, fal.kec!, fal.kel!)),
      tap(()=>this.getDetailTPS())
      )
    .subscribe(([ting, fil])=> EMPTY);

  }

  reloadList(){
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

  reloadTps(){
    this.dashboardFilterDataServ.getFilterData
    .pipe(
      take(1),
      tap(()=>this.modalCtrl.dismiss('confirm'))
    ).subscribe(res=> {
      this.getTotalTps(res.provinsi!, res.kota!, res.kec!, res.kel!)
    })
  }

  reloadBar(){
    this.dashboardFilterDataServ.getFilterData
    .pipe(
      take(1),
      tap(()=>this.modalCtrl.dismiss('confirm'))
    ).subscribe(res=> {
      this.tingkatan !== "Presiden"
      && this.getDataCaleg(this.paramId, res.provinsi!, res.kota!, res.kec!, res.kel!)
    })
  }

  reloadPie(){
    this.dashboardFilterDataServ.getFilterData
    .pipe(
      take(1),
      tap(()=>this.modalCtrl.dismiss('confirm'))
    ).subscribe(res=> {
      this.tingkatan === "Presiden"
      && this.getDataPresiden(res.provinsi!, res.kota!, res.kec!, res.kel!)
    })
  }

  reloadCapres(){
    this.dashboardFilterDataServ.getFilterData
    .pipe(
      take(1),
      tap(()=>this.modalCtrl.dismiss('confirm'))
    ).subscribe(res=> {
      this.tingkatan === "Presiden"
      && this.getDataPresiden(res.provinsi!, res.kota!, res.kec!, res.kel!)
    })
  }

  backtoDash(){
    this.dashboardFilterDataServ.updateFilterData(defaultDashFilterData);
  }

  getDetailTPS() {
    return combineLatest([
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ])
      .pipe(
        switchMap(([token, val]) => {
          console.log('val.kel', val.kel !== '' ? 'hallo' : 'budi');

          if (val.kec === '' && val.kel === '') {
            console.log('Calling API without val.kel');
            return this.callApiServ.get(`get-detail-tps-kecamatan?provinsi_id=${val.provinsi}&kota_id=${val.kota}`, token);
          } else if (val.kel === ''){
            console.log('Calling API with val.kel', this.callApiServ.get(`get-detail-tps-kelurahan/${val.kec}`, token));
            return this.callApiServ.get(`get-detail-tps-kelurahan/${val.kec}`, token);
          } else {
            console.log('Calling API with val.kel', this.callApiServ.get(`get-detail-tps/${val.kel}`, token));
            return this.callApiServ.get(`get-detail-tps/${val.kel}`, token);
          }
        }),
        tap((val:any)=> this.dashboardFilterDataServ.updateTpsDetail(val.data))
      ).subscribe(
        {
          next: (val: any) => {
            console.log(val);
            
          },
          error: (e: any) => (
            console.log(e)
          )
        }
      )
  }

}
