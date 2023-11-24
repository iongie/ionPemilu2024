import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subject, delay, from, switchMap, takeUntil, tap, timer } from 'rxjs';
import { Vote, VoteCaleg, defaultVote, defaultVoteCaleg } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';
import { FormVoteComponent } from '../form-vote/form-vote.component';
import { MessageResponseService } from 'src/app/services/messageResponse/message-response.service';

@Component({
  selector: 'app-detail-input-vote',
  templateUrl: './detail-input-vote.component.html',
  styleUrls: ['./detail-input-vote.component.scss'],
})
export class DetailInputVoteComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() paramId: number | null = null;
  detailInputVoteLoading = true;
  detailInputVotes: Vote[] = [];
  voteCaleg: VoteCaleg = defaultVoteCaleg;
  constructor(
    private tokenServ: TokenService,
    private callApiServ: CallApiService,
    private modalCtrl: ModalController,
    private messageResponse: MessageResponseService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getDetailVoteCandidate();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getDetailVoteCandidate(){
    return this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.get(`data-vote-caleg/${this.paramId}`, token)
      }),
      tap(()=> this.detailInputVoteLoading = false)
    )
    .subscribe({
      error: (e) => this.detailInputVoteLoading = true,
      next: (res: any) => (
        this.detailInputVotes = res.data
      )
    })
  }

  async addPolling() {
    const modal = await this.modalCtrl.create({
      breakpoints: [0, 0.90],
      initialBreakpoint: 0.90,
      component: FormVoteComponent,
      componentProps:{
        voteCaleg: this.voteCaleg,
        voteCalegId: this.paramId,
        updateVote: false
      }
    });
    modal.present();
    const { data, role }  = await modal.onDidDismiss();
    await data == 'added' && this.getDetailVoteCandidate();
  }

  async updatePolling(ev: Vote){
    let voteCaleg= {
        id_caleg: ev.id_caleg,
        no_tps: ev.tps,
        total_suara: ev.suara,
        upload_bukti: ev.file_bukti
    }
    const modal = await this.modalCtrl.create({
      breakpoints: [0, 0.90],
      initialBreakpoint: 0.90,
      component: FormVoteComponent,
      componentProps:{
        voteCaleg: voteCaleg,
        voteCalegId: ev.id,
        updateVote: true
      }
    });
    modal.present();
    const { data, role }  = await modal.onDidDismiss()
    await data == 'update' && this.getDetailVoteCandidate()
  }

  deletePolling(event:any){
    from(this.loadingCtrl.create({
      message: 'loading...',
      duration: 100,
    })).pipe(
      tap((loading) => loading.present()),
      tap(() => timer(1000)),
      switchMap(() => this.tokenServ.getToken),
      switchMap((token) => this.callApiServ.post(null,`delete-vote-caleg/${event}`, token)),
      tap(()=> this.getDetailVoteCandidate()),
      takeUntil(this.destroy),
    ).subscribe(
      {
        next: (res: any) => (
          this.messageResponse.toastMode(res.message, 3000, 'top', 'header', 'success')
        ),
        error: (e) => (
          this.messageResponse.toastMode(e.error.message, 3000, 'top', 'header', 'danger')
        )
      }
    )
  }


}
