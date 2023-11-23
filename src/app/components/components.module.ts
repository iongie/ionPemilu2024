import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerolehanSuaraComponent } from './perolehan-suara/perolehan-suara.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    FormVoteComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
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
    FormVoteComponent
  ]
})
export class ComponentsModule { }
