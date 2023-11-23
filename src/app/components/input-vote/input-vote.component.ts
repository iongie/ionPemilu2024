import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, delay, switchMap, takeUntil, tap } from 'rxjs';
import { Candidate } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-input-vote',
  templateUrl: './input-vote.component.html',
  styleUrls: ['./input-vote.component.scss'],
})
export class InputVoteComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() paramId: string | null = null;
  inputVoteLoading = true;
  candidates: Candidate[] = []
  constructor(
    private tokenServ: TokenService,
    private callApiServ: CallApiService
  ) { }

  ngOnInit() {
    this.getCandidate()
    .pipe(
      tap(()=> this.inputVoteLoading = false)
    )
    .subscribe({
      error: (e) => this.inputVoteLoading = true,
      next: (res: any) => (
        this.candidates = res.data
      )
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getCandidate(){
    return this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.get(`data-caleg/${this.paramId}`, token)
      }),
    )
  }

  onSearchCandidates(ev: any){
    this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.search(`data-caleg/${this.paramId}`, token, ev.target.value)
      }),
      tap(()=> this.inputVoteLoading = false)
    )
    .subscribe({
      error: (e) => this.inputVoteLoading = true,
      next: (res: any) => (
        this.candidates = res.data
      )
    })
  }

}
