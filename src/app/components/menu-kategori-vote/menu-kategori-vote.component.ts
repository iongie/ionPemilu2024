import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-kategori-vote',
  templateUrl: './menu-kategori-vote.component.html',
  styleUrls: ['./menu-kategori-vote.component.scss'],
})
export class MenuKategoriVoteComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  gotoPage(ev: number) {
    this.router.navigate(['kategori-vote/' + ev]);
  }

}
