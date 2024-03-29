import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { Subscription, tap } from 'rxjs';
import { Paslon, SuaraPaslon, defaultSuaraPaslon } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard-pie-chart',
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrls: ['./dashboard-pie-chart.component.scss'],
})
export class DashboardPieChartComponent  implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  // paslon: SuaraPaslon[] = defaultSuaraPaslon;
  cekDataEmpty: boolean=  false;
  viewChartSubcription: Subscription | undefined;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService
  ) {
    
  }

  ngOnInit() {
      this.viewChartSubcription = this.viewChart();
  }

  ngOnDestroy(): void {
    this.viewChartSubcription?.unsubscribe();
  }

  viewChart(){
    return this.dashboardFilterDataServ.getPaslonData
    .pipe(
      tap(paslon=> this.cekDataEmpty = paslon.length === 0 ? true: false )
    )
    .subscribe(paslon=> {
      
      this.chartOptions = {
        series: paslon.map(res => parseInt(res.suara)),
        chart: {
          type: "pie"
        },
        labels:  paslon.map(res => res.n_calon),
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom"
              },
              dataLabels: {
                enabled: true,
                formatter: function (val:any, opts:any) {
                  return val.toFixed(2) + "%";
                },
                textAnchor: 'middle',
                distributed: true
              },
            }
          }
        ],
        legend: {
          show:false
        }
      };
    })
  }

}
