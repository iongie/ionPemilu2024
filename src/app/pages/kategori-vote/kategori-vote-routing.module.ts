import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategoriVotePage } from './kategori-vote.page';

const routes: Routes = [
  {
    path: '',
    component: KategoriVotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoriVotePageRoutingModule {}
