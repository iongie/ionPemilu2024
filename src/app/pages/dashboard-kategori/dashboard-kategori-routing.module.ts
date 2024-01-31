import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardKategoriPage } from './dashboard-kategori.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardKategoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardKategoriPageRoutingModule {}
