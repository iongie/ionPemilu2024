import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, delay, switchMap, tap, combineLatest } from 'rxjs';
import { TotalTps, defaultTotalTps } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-info-tps',
  templateUrl: './info-tps.component.html',
  styleUrls: ['./info-tps.component.scss'],
})
export class InfoTpsComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() paramId: number | null = null;
  totalTps: TotalTps = defaultTotalTps;
  totalTpsLoading = true;
  reloadIndikator = false;
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
        return combineLatest([
          this.callApiServ.get(`total-tps`, token),
          this.callApiServ.get(`get-total-relawan-by-dapil/${this.paramId}`, token),
          this.callApiServ.get(`get-suara-by-dapil/${this.paramId}`, token)
        ])
      }),
      tap(()=> this.totalTpsLoading = false)
    )
    .subscribe({
      error: (e) => {
        this.totalTpsLoading = true;
        this.reloadIndikator = true
      },
      next: (res: any) => (
        this.totalTps.total_tps = res[0].data.total_tps,
        this.totalTps.total_relawan = res[1].data,
        this.totalTps.percent = res[2].data.suara
      )
    })
  }

  async reload(){
    await this.getTotalTps()
    this.reloadIndikator = false
  }

}
