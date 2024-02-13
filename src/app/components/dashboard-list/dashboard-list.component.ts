import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { SuaraPaslon, defaultSuaraPaslon } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent  implements OnInit {
  paslon: SuaraPaslon[] = defaultSuaraPaslon;
  paramId: any = 0;
  tingkatan: string | null = null;
  cekDataEmpty: boolean=  false;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService,
    private actRoute: ActivatedRoute,
  ) {
    
  }

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
    this.dashboardFilterDataServ.getPaslonData
    .pipe(
      tap((paslon)=> this.cekDataEmpty = paslon.length === 0 ? true: false )
    )
    .subscribe(paslon=> {
      this.paslon = paslon
      if (this.tingkatan ==="Presiden" && this.paslon.length !== 0 ){
        this.paslon[0].photo = '../../../assets/capres-no-1.png';
        this.paslon[1].photo = '../../../assets/capres-no-2.png';
        this.paslon[2].photo = '../../../assets/capres-no-3.png';
      }
    })
  }

}
