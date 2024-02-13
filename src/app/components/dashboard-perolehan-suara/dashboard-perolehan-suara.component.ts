import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TotalTps, defaultTotalTps } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

@Component({
  selector: 'app-dashboard-perolehan-suara',
  templateUrl: './dashboard-perolehan-suara.component.html',
  styleUrls: ['./dashboard-perolehan-suara.component.scss'],
})
export class DashboardPerolehanSuaraComponent  implements OnInit {
  dataTotalTps: Subscription | undefined;
  totalTps: number | null = 0;
  suaraTpsMasuk: number | null = 0;
  totalTpsMasuk: number | null = 0;
  @Input() tps: TotalTps = defaultTotalTps;
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
        if (res.length !== 0){
          this.suaraTpsMasuk = parseInt(res[0].suara!)
          this.totalTpsMasuk = res[0].total_tps_masuk!
        }
      })
  }
}
