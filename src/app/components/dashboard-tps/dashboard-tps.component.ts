import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { TotalTps, defaultTotalTps } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

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
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService
  ) { }

  ngOnInit() {
    this.getDataTotalTps();
    this.getDataTotalTpsMasuk();
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

}
