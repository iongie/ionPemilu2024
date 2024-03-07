import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { DashTotalSuaraPartai, TotalSuaraPartai, defaultDashTotalSuaraPartai } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

@Component({
  selector: 'app-dashboard-perolehan-partai-suara',
  templateUrl: './dashboard-perolehan-partai-suara.component.html',
  styleUrls: ['./dashboard-perolehan-partai-suara.component.scss'],
})
export class DashboardPerolehanPartaiSuaraComponent  implements OnInit, OnDestroy {
  // @Input() suaraPartai: DashTotalSuaraPartai[] = []
  private destroy: Subject<void> = new Subject<void>();
  suaraPartai: DashTotalSuaraPartai[] = defaultDashTotalSuaraPartai;
  paramId: any = 0;
  tingkatan: string | null = null;
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
        "4": "DPRD I",
        "3": "DPRD II",
        "5": "Presiden"
      };

      this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
    })
    this.dashboardFilterDataServ.getDashTpsDetail
    .pipe(
      tap((suara)=> this.cekDataEmpty = suara.length === 0 ? true: false ),
      takeUntil(this.destroy)
    )
    .subscribe(paslon=> {
      this.suaraPartai = paslon
      
      // if (this.tingkatan ==="Presiden" && this.paslon.length !== 0 ){
      //   this.paslon[0].photo = '../../../assets/capres-no-1.png';
      //   this.paslon[1].photo = '../../../assets/capres-no-2.png';
      //   this.paslon[2].photo = '../../../assets/capres-no-3.png';
      // }
    })
  }

  ngOnDestroy(): void {
    
  }

}
