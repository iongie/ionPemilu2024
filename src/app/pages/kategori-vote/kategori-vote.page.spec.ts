import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KategoriVotePage } from './kategori-vote.page';

describe('KategoriVotePage', () => {
  let component: KategoriVotePage;
  let fixture: ComponentFixture<KategoriVotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(KategoriVotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
