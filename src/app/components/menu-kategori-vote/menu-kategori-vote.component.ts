import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-menu-kategori-vote',
  templateUrl: './menu-kategori-vote.component.html',
  styleUrls: ['./menu-kategori-vote.component.scss'],
})
export class MenuKategoriVoteComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Output() actionKategoriVote = new EventEmitter<string>();
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    this.destroy.next();
    this.destroy.complete();
  }


  gotoPage(ev: number) {
    this.router.navigate(['kategori-vote/' + ev]);
    this.actionKategoriVote.emit('kategori-vote')
  }

}
