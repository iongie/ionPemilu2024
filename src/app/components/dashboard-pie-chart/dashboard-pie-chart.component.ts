import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Paslon, SuaraPaslon, defaultSuaraPaslon } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard-pie-chart',
  templateUrl: './dashboard-pie-chart.component.html',
  styleUrls: ['./dashboard-pie-chart.component.scss'],
})
export class DashboardPieChartComponent  implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  // paslon: SuaraPaslon[] = defaultSuaraPaslon;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService
  ) {
    
  }

  ngOnInit() {
    this.dashboardFilterDataServ.getPaslonData.subscribe(paslon=> {
      console.log('paslon', paslon);
      this.chartOptions = {
        series: paslon.map(res => parseInt(res.suara)),
        chart: {
          type: "pie"
        },
        labels:  paslon.map(res => res.n_calon),
        title: {
          text: `Data Suara Pemilu Presiden dan Wakil Presiden`,
          align: "center",
          floating: true,
          margin: 64
        },
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
      };
    })
  }

}
