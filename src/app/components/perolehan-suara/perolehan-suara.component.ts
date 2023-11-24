import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil, delay, switchMap, tap } from 'rxjs';
import { TotalTps, defaultTotalTps } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-perolehan-suara',
  templateUrl: './perolehan-suara.component.html',
  styleUrls: ['./perolehan-suara.component.scss'],
})
export class PerolehanSuaraComponent  implements OnInit {
  private destroy: Subject<void> = new Subject<void>();
  totalTps: TotalTps = defaultTotalTps;
  totalTpsLoading = true;
  constructor(
    private tokenServ: TokenService,
    private callApiServ: CallApiService,
  ) { }

  ngOnInit() {
    this.getTotalTps();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getTotalTps(){
    return this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.get(`total-tps`, token)
      }),
      tap(()=> this.totalTpsLoading = false)
    )
    .subscribe({
      error: (e) => this.totalTpsLoading = true,
      next: (res: any) => (
        this.totalTps = res.data
      )
    })
  }
}
