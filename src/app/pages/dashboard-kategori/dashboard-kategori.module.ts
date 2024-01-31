import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardKategoriPageRoutingModule } from './dashboard-kategori-routing.module';

import { DashboardKategoriPage } from './dashboard-kategori.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardKategoriPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DashboardKategoriPage]
})
export class DashboardKategoriPageModule {}
