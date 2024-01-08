import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest, delay, map, switchMap, takeUntil } from 'rxjs';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-kategori-vote',
  templateUrl: './kategori-vote.page.html',
  styleUrls: ['./kategori-vote.page.scss'],
})
export class KategoriVotePage implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  segmentVote: string = 'result';
  paramId: any = 0;
  tingkatan: string | null = null;
  constructor(
    private actRoute: ActivatedRoute,
    private tokenServ: TokenService,
    private callApiServ: CallApiService,
    private router: Router
  ) { }

  ngOnInit() {
      this.actRoute.params.subscribe(res=>{
        this.paramId = res['id'];
        const mapping = {
          "1": "DPR",
          "2": "DPD",
          "3": "DPRD",
          "4": "DPRD PROVINSI"
        };
        
        this.tingkatan = mapping[this.paramId as keyof typeof mapping] || '-';
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
