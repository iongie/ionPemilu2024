import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, combineLatest, delay, switchMap, takeUntil, tap } from 'rxjs';
import { TotalSuaraPartai } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { PwaService } from 'src/app/services/pwa/pwa.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  isInstallPWA = false;
  installPrompt: any;

  suaraPartai: TotalSuaraPartai[] = []
  perolehanSuaraPartaiLoading = true;

  name: string | null = null
  constructor(
    private user: UserService,
    private tokenServ: TokenService,
    private router: Router,
    private pwaService: PwaService,
    private callApiServ: CallApiService
  ) { }

  ngOnInit() {
    combineLatest([
      this.user.getUser,
      this.tokenServ.getToken
    ]).subscribe(res => {
      console.log(res)
      this.name = res[0].name
    })
    this.pwaService.getInstallPWA.subscribe(res => {
      this.isInstallPWA = res
    })
    this.perolehanSuaraPartai()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  perolehanSuaraPartai() {
    this.tokenServ.getToken
      .pipe(
        takeUntil(this.destroy),
        delay(1000),
        switchMap((token) => {
          return this.callApiServ.get('total-suara-partai', token)
        }),
        tap(() => this.perolehanSuaraPartaiLoading = false),
      ).subscribe({
        error: (e) => this.perolehanSuaraPartaiLoading = true,
        next: (res: any) => (
          this.suaraPartai = res.data
        )
      })
  }

}
