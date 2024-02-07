import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerolehanSuaraComponent } from './perolehan-suara/perolehan-suara.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserInfoComponent } from './user-info/user-info.component';
import { InfoTpsComponent } from './info-tps/info-tps.component';
import { PerolehanSuaraPartaiComponent } from './perolehan-suara-partai/perolehan-suara-partai.component';
import { MenuKategoriVoteComponent } from './menu-kategori-vote/menu-kategori-vote.component';
import { ResultVoteComponent } from './result-vote/result-vote.component';
import { InputVoteComponent } from './input-vote/input-vote.component';
import { DetailInputVoteComponent } from './detail-input-vote/detail-input-vote.component';
import { PerolehanSuaraPartaiSkeletonComponent } from './progress-indikator/perolehan-suara-partai-skeleton/perolehan-suara-partai-skeleton.component';
import { ResultVoteSkeletonComponent } from './progress-indikator/result-vote-skeleton/result-vote-skeleton.component';
import { InputVoteSkeletonComponent } from './progress-indikator/input-vote-skeleton/input-vote-skeleton.component';
import { FormVoteComponent } from './form-vote/form-vote.component';
import { DetailInputVoteSkeletonComponent } from './progress-indikator/detail-input-vote-skeleton/detail-input-vote-skeleton.component';
import { InfoTpsSkeletonComponent } from './progress-indikator/info-tps-skeleton/info-tps-skeleton.component';
import { DataNotFoundComponent } from './data-not-found/data-not-found.component';
import { InstallPwaComponent } from './install-pwa/install-pwa.component';
import { PerolehanSuaraSkeletonComponent } from './progress-indikator/perolehan-suara-skeleton/perolehan-suara-skeleton.component';
import { ConnectionComponent } from './connection/connection.component';
import { InputNonNegativeDirective } from '../directives/input-non-negative/input-non-negative.directive';
import { DashboardMenuKategoriComponent } from './dashboard-menu-kategori/dashboard-menu-kategori.component';
import { DashboardCapresComponent } from './dashboard-capres/dashboard-capres.component';
import { DashboardTpsComponent } from './dashboard-tps/dashboard-tps.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardBarChartComponent } from './dashboard-bar-chart/dashboard-bar-chart.component';
import { DashboardPieChartComponent } from './dashboard-pie-chart/dashboard-pie-chart.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardModalFilterDataComponent } from './dashboard-modal-filter-data/dashboard-modal-filter-data.component';
import { DashBarSkeletonComponent } from './progress-indikator/dash-bar-skeleton/dash-bar-skeleton.component';
import { DashCapresSkeletonComponent } from './progress-indikator/dash-capres-skeleton/dash-capres-skeleton.component';
import { DashPieSkeletonComponent } from './progress-indikator/dash-pie-skeleton/dash-pie-skeleton.component';
import { DashTpsSkeletonComponent } from './progress-indikator/dash-tps-skeleton/dash-tps-skeleton.component';
import { DashboardPerolehanSuaraComponent } from './dashboard-perolehan-suara/dashboard-perolehan-suara.component';
import { InputLimitDirective } from '../directives/input-limit/input-limit.directive';



@NgModule({
  declarations: [
    PerolehanSuaraComponent,
    UserInfoComponent,
    InfoTpsComponent,
    PerolehanSuaraPartaiComponent,
    MenuKategoriVoteComponent,
    ResultVoteComponent,
    InputVoteComponent,
    DetailInputVoteComponent,
    PerolehanSuaraPartaiSkeletonComponent,
    ResultVoteSkeletonComponent,
    InputVoteSkeletonComponent,
    DetailInputVoteSkeletonComponent,
    InfoTpsSkeletonComponent,
    FormVoteComponent,
    DataNotFoundComponent,
    InstallPwaComponent,
    PerolehanSuaraSkeletonComponent,
    ConnectionComponent,
    InputNonNegativeDirective,
    DashboardMenuKategoriComponent,
    DashboardCapresComponent,
    DashboardMenuKategoriComponent,
    DashboardTpsComponent,
    DashboardBarChartComponent,
    DashboardPieChartComponent,
    DashboardListComponent,
    DashboardModalFilterDataComponent,
    DashboardPerolehanSuaraComponent,
    DashBarSkeletonComponent,
    DashCapresSkeletonComponent,
    DashPieSkeletonComponent,
    DashTpsSkeletonComponent,
    InputLimitDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports: [
    PerolehanSuaraComponent,
    UserInfoComponent,
    InfoTpsComponent,
    PerolehanSuaraPartaiComponent,
    MenuKategoriVoteComponent,
    ResultVoteComponent,
    InputVoteComponent,
    DetailInputVoteComponent,
    PerolehanSuaraPartaiSkeletonComponent,
    ResultVoteSkeletonComponent,
    InputVoteSkeletonComponent,
    DetailInputVoteSkeletonComponent,
    InfoTpsSkeletonComponent,
    FormVoteComponent,
    DataNotFoundComponent,
    InstallPwaComponent,
    PerolehanSuaraSkeletonComponent,
    ConnectionComponent,
    DashboardMenuKategoriComponent,
    DashboardCapresComponent,
    DashboardMenuKategoriComponent,
    DashboardTpsComponent,
    DashboardBarChartComponent,
    DashboardPieChartComponent,
    DashboardListComponent,
    DashboardModalFilterDataComponent,
    DashboardPerolehanSuaraComponent,
    DashBarSkeletonComponent,
    DashCapresSkeletonComponent,
    DashPieSkeletonComponent,
    DashTpsSkeletonComponent
  ]
})
export class ComponentsModule { }
