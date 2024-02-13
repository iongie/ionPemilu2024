import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, switchMap, take, tap } from 'rxjs';
import { TPSdetail, TotalTps, defaultTPSdetail, defaultTotalTps } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-tps',
  templateUrl: './dashboard-tps.component.html',
  styleUrls: ['./dashboard-tps.component.scss'],
})
export class DashboardTpsComponent implements OnInit, OnDestroy {
  dataTotalTps: Subscription | undefined;
  totalTps: number | null = 0;
  suaraTpsMasuk: number | null = 0;
  totalTpsMasuk: number | null = 0;
  tpsDetail: TPSdetail[] = defaultTPSdetail;
  openDetail: boolean = false;
  constructor(
    private token: TokenService,
    private dashboardFilterDataServ: DashboardFilterDataService,
    private callApiServ: CallApiService,
  ) { }

  ngOnInit() {
    this.getDataTotalTps();
    this.getDataTotalTpsMasuk();
    this.getDetailTPS();
  }

  ngOnDestroy(): void {
    this.getDataTotalTps().unsubscribe();
    this.getDataTotalTpsMasuk().unsubscribe();
  }

  getDataTotalTps() {
    return this.dashboardFilterDataServ.gettotalTpsData
      .subscribe(res => this.totalTps = parseInt(res.jumlah_tps!))
  }

  getDataTotalTpsMasuk() {
    return this.dashboardFilterDataServ.getTotalMasukTps
      .subscribe(res => {
        this.suaraTpsMasuk = parseInt(res[0].suara!)
        this.totalTpsMasuk = res[0].total_tps_masuk!
      })
  }

  getDetailTPS() {
    this.dashboardFilterDataServ.getTpsDetail
    .pipe(
      tap(()=> this.openDetail =false)
    )
    .subscribe(
      {
        next: (val: any) => {
          this.tpsDetail = val;
        },
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  openDetailTps() {
    this.openDetail = this.openDetail ? false : true
  }

}
