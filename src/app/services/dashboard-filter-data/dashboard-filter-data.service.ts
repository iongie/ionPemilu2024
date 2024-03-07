import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashFilterData, DashTotalSuaraPartai, SuaraPaslon, TPSdetail, TotalMasukTPS, TotalTPS, defaultDashFilterData, defaultDashTotalSuaraPartai, defaultSuaraPaslon, defaultTPSdetail, defaultTotalMasukTPS, defaultTotalTPS } from 'src/app/app.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterDataService {
  filterData = new BehaviorSubject<DashFilterData>(defaultDashFilterData);
  getFilterData = this.filterData.asObservable();

  paslon = new BehaviorSubject<SuaraPaslon[]>(defaultSuaraPaslon);
  getPaslonData = this.paslon.asObservable();

  totalTps = new BehaviorSubject<TotalTPS>(defaultTotalTPS);
  gettotalTpsData = this.totalTps.asObservable();

  totalMasukTps = new BehaviorSubject<TotalMasukTPS[]>(defaultTotalMasukTPS);
  getTotalMasukTps = this.totalMasukTps.asObservable();

  tpsDetail = new BehaviorSubject<TPSdetail[]>(defaultTPSdetail);
  getTpsDetail = this.tpsDetail.asObservable();

  dashSuaraPartai = new BehaviorSubject<DashTotalSuaraPartai[]>(defaultDashTotalSuaraPartai);
  getDashTpsDetail = this.dashSuaraPartai.asObservable();
  constructor() { }

  updateFilterData(newDashFilterData: DashFilterData) {
    this.filterData.next(newDashFilterData);
  }

  updatePaslon(newPaslon: SuaraPaslon[]){
    this.paslon.next(newPaslon)
  }

  updatetotalTps(newTotalTps: TotalTPS){
    this.totalTps.next(newTotalTps)
  }
  
  updatetotalMasukTps(newTotalMasukTps: TotalMasukTPS[]){
    this.totalMasukTps.next(newTotalMasukTps)
  }

  updateTpsDetail(newTpsDetail: TPSdetail[]){
    this.tpsDetail.next(newTpsDetail)
  }

  updateDashSuaraPartai(newDashSUaraPartai: DashTotalSuaraPartai[]){
    this.dashSuaraPartai.next(newDashSUaraPartai)
  }

  
}
