import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, tap } from 'rxjs';
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
      switchMap((token)=> this.callApiServ.get(`capres-list`, token)),
      tap((res:any)=>this.paslon = res.data),
      tap((res:any)=>this.paslon[0].photo = '../../../assets/capres-no-1.png'),
      tap((res:any)=>this.paslon[1].photo = '../../../assets/capres-no-2.png'),
      tap((res:any)=>this.paslon[2].photo = '../../../assets/capres-no-3.png'),
      
    ).subscribe(
      {
        next: (res: any) => {
          console.log(this.paslon);
        },
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }


}
