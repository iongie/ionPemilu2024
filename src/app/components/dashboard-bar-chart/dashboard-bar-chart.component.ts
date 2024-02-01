import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard-bar-chart',
  templateUrl: './dashboard-bar-chart.component.html',
  styleUrls: ['./dashboard-bar-chart.component.scss'],
})
export class DashboardBarChartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  paramId: any = 0;
  tingkatan: string | null = null;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService,
    private actRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.actRoute.params.subscribe(res=>{
      this.paramId = res['id'];
      const mapping = {
        "1": "DPR",
        "2": "DPD",
        "3": "DPRD",
        "4": "DPRD PROVINSI",
        "5": "Presiden"
      };
      
      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
    })
    this.dashboardFilterDataServ.getPaslonData.subscribe(paslon => {
      this.chartOptions = {
        series: [
          {
            data: paslon.map(res=> parseInt(res.suara!))
          }
        ],
        chart: {
          type: "bar",
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"]
          },
          formatter: function(val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: paslon.map(res => res.n_calon),
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          text: `Data Suara Pemilu ${this.tingkatan}`,
          align: "center",
          floating: true
        },
        tooltip: {
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function() {
                return "";
              }
            }
          }
        }
      };
    })
  }

}

