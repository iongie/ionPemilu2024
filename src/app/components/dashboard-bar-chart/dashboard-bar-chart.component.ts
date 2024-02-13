import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  ApexYAxis,
  ApexLegend
} from "ng-apexcharts";
import { Subscription, tap } from 'rxjs';
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
  legend: ApexLegend
};
@Component({
  selector: 'app-dashboard-bar-chart',
  templateUrl: './dashboard-bar-chart.component.html',
  styleUrls: ['./dashboard-bar-chart.component.scss'],
})
export class DashboardBarChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  paramId: any = 0;
  tingkatan: string | null = null;
  widthChart: string | number = '100%';

  getAllSubcription: Subscription | undefined;
  cekDataEmpty: boolean=  false;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService,
    private actRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.actRoute.params.subscribe(res => {
      this.paramId = res['id'];
      const mapping = {
        "1": "DPR",
        "2": "DPD",
        "3": "DPRD II",
        "4": "DPRD I",
        "5": "Presiden"
      };

      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
    })

    this.getAllSubcription= this.getAll();

  }

  ngOnDestroy(): void {
    this.getAllSubcription?.unsubscribe();
  }

  getAll() {
    return this.dashboardFilterDataServ.getPaslonData
    .pipe(
      tap(paslon=> this.cekDataEmpty = paslon.length === 0 ? true: false )
    )
    .subscribe(paslon => {
      this.chartOptions = {
        series: [
          {
            data: paslon.map(res => parseInt(res.suara!))
          }
        ],
        chart: {
          type: "bar",
          height: 280,
          width: this.widthChart,
          toolbar: {
            show: false
          },
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            borderRadius: 10,
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        dataLabels: {
          enabled: false,
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
            show: true
          },

        },
        tooltip: {
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return "";
              }
            }
          }
        },
        legend: {
          show: false
        }
      };
    })
  }

  getexam() {
    this.dashboardFilterDataServ.getPaslonData
    .pipe(
      tap(paslon=> this.cekDataEmpty = paslon.length === 0 ? true: false )
    )
    .subscribe(paslon => {
      this.chartOptions = {
        series: [
          {
            data: [20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300,
              20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300, 20000, 300000, 600000, 989700, 2300,],
          }
        ],
        chart: {
          type: "bar",
          height: 380,
          width: this.widthChart,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            borderRadius: 10,
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: ['gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi',
            'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi', 'gigih', 'santoso', 'dila', 'nita', 'regi',],
          labels: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return "";
              }
            }
          }
        },
        legend: {
          show: false
        }
      };
    })
  }

  zoom() {
    this.dashboardFilterDataServ.getPaslonData.subscribe(paslon => {
      this.widthChart = this.widthChart === '100%' 
      ? paslon.length > 50 ? 5000 : '100%' : '100%';
      this.getAll()

    })
  }
}



