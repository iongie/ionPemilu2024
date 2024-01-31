import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-menu-kategori',
  templateUrl: './dashboard-menu-kategori.component.html',
  styleUrls: ['./dashboard-menu-kategori.component.scss'],
})
export class DashboardMenuKategoriComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Output() actionKategoriVote = new EventEmitter<string>();
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }


  gotoPage(ev: number) {
    this.router.navigate(['dashboard/' + ev]);
    this.actionKategoriVote.emit('dashboard')
  }

}
