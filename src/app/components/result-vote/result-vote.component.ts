import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { takeUntil, delay, switchMap, Subject, tap, of } from 'rxjs';
import { Candidate } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-result-vote',
  templateUrl: './result-vote.component.html',
  styleUrls: ['./result-vote.component.scss'],
})
export class ResultVoteComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() paramId: string | null = null;
  length: number = 5;
  page: number = 1;
  resultVoteLoading = true;
  candidates: Candidate[] = [];
  dataNotFound: boolean = false;
  reloadIndikator = false;
  constructor(
    private tokenServ: TokenService,
    private callApiServ: CallApiService
  ) { }

  ngOnInit() {
    this.resultAllCaleg(this.page, this.length, "")
      .pipe(
        tap(() => this.resultVoteLoading = false),
        takeUntil(this.destroy)
      )
      .subscribe({
        error: (e) =>{ 
          this.resultVoteLoading = true;
          this.reloadIndikator = true;
        },
        next: (res: any) => (
          this.candidates = res.data
        )
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  resultAllCaleg(page: number, length: number, cari: any) {
    return this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.getPagination(`get-all-caleg/${this.paramId}`, token, page, length, cari)
      }),
    )
  }

  onIonInfinite(ev: any) {
    of(this.page)
      .pipe(
        tap((page) => this.page = page + 1),
        switchMap((page) => this.resultAllCaleg(page + 1, this.length, "")),
        tap(() => (ev as InfiniteScrollCustomEvent).target.complete())
      )
      .subscribe({
        next: (res: any) => (
          this.candidates.push(...res.data)
        )
      })
  }

  onSearchCandidates(ev: any) {
    this.tokenServ.getToken.pipe(
      takeUntil(this.destroy),
      delay(1000),
      switchMap((token) => {
        return this.callApiServ.getPagination(`get-all-caleg/${this.paramId}`, token, this.page, this.length, ev.target.value)
      }),
      tap(() => this.resultVoteLoading = false)
    )
      .subscribe({
        error: (e) => {
          this.resultVoteLoading = true;
        },
        next: (res: any) => (
          this.dataNotFound = res.data.length === 0 ? true : false,
          this.candidates = res.data
        )
      })
  }

  async reload() {
    await this.resultAllCaleg(this.page, this.length, "")
      .pipe(
        tap(() => this.resultVoteLoading = false),
        takeUntil(this.destroy)
      )
      .subscribe({
        error: (e) => {
          this.resultVoteLoading = true;
          this.reloadIndikator = true;
        },
        next: (res: any) => (
          this.candidates = res.data
        )
      })
    this.reloadIndikator = false
  }

}
