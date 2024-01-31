import { Component, OnInit } from '@angular/core';
import { SuaraPaslon, defaultSuaraPaslon } from 'src/app/app.interface';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent  implements OnInit {
  paslon: SuaraPaslon[] = defaultSuaraPaslon;
  constructor(
    private dashboardFilterDataServ: DashboardFilterDataService
  ) {
    
  }

  ngOnInit() {
    this.dashboardFilterDataServ.getPaslonData.subscribe(paslon=> {
      console.log('list-paslon', paslon);
      this.paslon = paslon
    })
  }

}
