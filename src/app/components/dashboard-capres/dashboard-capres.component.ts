import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs';
import { Paslon, defaultPaslon } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-capres',
  templateUrl: './dashboard-capres.component.html',
  styleUrls: ['./dashboard-capres.component.scss'],
})
export class DashboardCapresComponent implements OnInit {
  paslon : Paslon[] = defaultPaslon;
  constructor(
    private callApiServ: CallApiService,
    private token: TokenService,
  ){
    
  }

  ngOnInit() {
    this.getPaslon();
  }

  getPaslon(){
    this.token.getToken .pipe(
      switchMap((token)=> this.callApiServ.get(`capres-list`, token))
    ).subscribe(
      {
        next: (res: any) => (
          this.paslon = res.data
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }


}
