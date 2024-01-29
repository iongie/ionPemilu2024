import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subject, Subscription, combineLatest, delay, interval, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { TotalSuaraPartai, TotalTps, defaultTotalTps } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { PwaService } from 'src/app/services/pwa/pwa.service';
import { TokenService } from 'src/app/services/token/token.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements ViewWillEnter, ViewWillLeave {
  private destroy: Subject<void> = new Subject<void>();
  isInstallPWA = false;
  installPrompt: any;

  suaraPartai: TotalSuaraPartai[] = []
  perolehanSuaraPartaiLoading = true;

  name: string | null = null;
  tingkatan: string | null = null;
  dapil: string | null = null;
  kategoriVote: string = '';
  perolehanSuaraPartaiSubcribe: Subscription | undefined;
  reloadIndikator = false;

  totalTps: TotalTps = defaultTotalTps;
  totalTpsLoading = true;
  reloadtotalTpsIndikator = false;
  getTotalTpsSubcription: Subscription | undefined;
  constructor(
    private user: UserService,
    private tokenServ: TokenService,
    private pwaService: PwaService,
    private callApiServ: CallApiService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    combineLatest([
      this.user.getUser,
      this.tokenServ.getToken
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(res => {
        this.name = res[0].name;
        this.dapil = res[0].dapil
        .map((value: any) => value.toLowerCase())
        .filter((value:any, index:any, self:any) => {
          return self.indexOf(value) === index;
        });
        this.tingkatan = res[0].jenis_dapil
        .map((value: any) => value)
        .filter((value:any, index:any, self:any) => {
          return self.indexOf(value) === index;
        });
        console.log(res[0].dapil, res[0].jenis_dapil);
        
      })
    this.pwaService.getInstallPWA.subscribe(res => {
      this.isInstallPWA = res
    })
    this.perolehanSuaraPartaiSubcribe = this.perolehanSuaraPartai()
    this.getTotalTpsSubcription = this.getTotalTps()
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
    this.perolehanSuaraPartaiSubcribe?.unsubscribe();
    this.getTotalTpsSubcription?.unsubscribe();
  }
  

  perolehanSuaraPartai() {
    return interval(60000)
      .pipe(
        startWith(0),
        switchMap(() => this.tokenServ.getToken),
        delay(1000),
        switchMap((token) => this.callApiServ.get('total-suara-partai', token)),
        tap(() => this.perolehanSuaraPartaiLoading = false),
        takeUntil(this.destroy)
      )
      .subscribe({
      error: (e) => {
        this.perolehanSuaraPartaiLoading = true;
        this.reloadIndikator = true
      },
      next: (res: any) => {
        this.suaraPartai = res.data;
        this.suaraPartai = this.suaraPartai.map((element)=>{
          if (element.logo_partai !== null) {
            if (element.logo_partai.startsWith('v')) {
              element.logo_partai = element.logo_partai.slice(1); // Mengubah properti name menjadi 'host'
            }
          }
          return element;
        })
      }
    });
  }

  async closeAlert() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Logout?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Batal',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
        {
          text: 'Oke',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            this.tokenServ.clearToken();
            this.user.clearUser();
            await this.router.navigate(['/login']);
          }
        }
      ],
    });

    await alert.present();
  }

  actionKategoriVote(ev: string) {
    this.kategoriVote = ev;
  }

  reload(){
    this.perolehanSuaraPartaiSubcribe = this.perolehanSuaraPartai()
    this.reloadIndikator = false
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
      error: (e) => (
        this.totalTpsLoading = true,
        this.reloadtotalTpsIndikator = true
      ),
      next: (res: any) => (
        this.totalTps = res.data
      )
    })
  }

  reloadTotalTps(){
    this.getTotalTpsSubcription = this.getTotalTps()
    this.reloadtotalTpsIndikator = false
  }

}
