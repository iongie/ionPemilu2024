import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subscription, combineLatest, filter, map, switchMap, tap } from 'rxjs';
import { DashFilterData, defaultDashFilterData } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';
import { DataProvinsiService } from 'src/app/services/data-provinsi/data-provinsi.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-desc-filter',
  templateUrl: './dashboard-desc-filter.component.html',
  styleUrls: ['./dashboard-desc-filter.component.scss'],
})
export class DashboardDescFilterComponent implements OnInit, OnDestroy {
  dashFilter: DashFilterData = defaultDashFilterData;
  provinsi: string = '-';
  kota: string = '-';
  kec: string = '-';
  kel: string = '-';
  
  getProvinsiSubcription: Subscription | undefined;
  getKotaSubcription: Subscription | undefined;
  getKecamatanSubcription: Subscription | undefined;
  getKelurahanSubcription: Subscription | undefined;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService,
    private callApiServ: CallApiService,
    private token: TokenService,
  ) { }

  ngOnInit() {
    this.getProvinsiSubcription = this.getProvinsi();
    this.getKotaSubcription = this.getKota();
    this.getKecamatanSubcription = this.getKecamatan();
    this.getKelurahanSubcription = this.getKelurahan();
  }

  ngOnDestroy(): void {
    this.getProvinsiSubcription?.unsubscribe();
    this.getKotaSubcription?.unsubscribe();
    this.getKecamatanSubcription?.unsubscribe();
    this.getKelurahanSubcription?.unsubscribe();
  }

  getProvinsi() {
    return combineLatest([
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ]).pipe(
      tap(()=>this.provinsi  = ""),
      switchMap(([token, filterData]) => {
        return this.callApiServ.get('provinsi-list', token).pipe(
          map((apiData: any) => [apiData.data, filterData.provinsi])
        );
      }),
      switchMap(([apiData, filterData]) => apiData.filter((res: any) => res.id == parseInt(filterData)))
    ).subscribe(
      {
        next: (res: any) => (
          this.provinsi = res.n_provinsi
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  getKota() {
    return combineLatest([
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ]).pipe(
      tap(()=>this.kota = ""),
      switchMap(([token, filterData]) => {
        return filterData.kota == "" ? EMPTY : this.callApiServ.get(`kota-list/${filterData.provinsi}`, token).pipe(
          map((apiData: any) => [apiData.data, filterData.kota])
        )
      }),
      switchMap(([apiData, filterData]) => apiData.filter((res: any) => res.id == parseInt(filterData)))
    ).subscribe(
      {
        next: (res: any) => {
          this.kota = res.n_kota;
        },
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  getKecamatan() {
    return combineLatest([
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ]).pipe(
      tap(()=>this.kec = ""),
      switchMap(([token, filterData]) => {
        return filterData.kec == "" ? EMPTY : this.callApiServ.get(`kecamatan-list/${filterData.kota}`, token).pipe(
          map((apiData: any) => [apiData.data, filterData.kec])
        )
      }),
      switchMap(([apiData, filterData]) => apiData.filter((res: any) => res.id == parseInt(filterData)))
    ).subscribe(
      {
        next: (res: any) => (
          this.kec = res.n_kecamatan
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  getKelurahan() {
    return combineLatest([
      this.token.getToken,
      this.dashboardFilterDataServ.getFilterData
    ]).pipe(
      tap(()=>this.kel = ""),
      switchMap(([token, filterData]) => {
        return filterData.kel == "" ? EMPTY : this.callApiServ.get(`kelurahan-list/${filterData.kec}`, token).pipe(
          map((apiData: any) => [apiData.data, filterData.kel])
        )
      }),
      switchMap(([apiData, filterData]) => apiData.filter((res: any) => res.id == parseInt(filterData)))
    ).subscribe(
      {
        next: (res: any) => {
          this.kel = res.n_kelurahan
        },
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

}
