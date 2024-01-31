import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardKategoriPage } from './dashboard-kategori.page';

describe('DashboardKategoriPage', () => {
  let component: DashboardKategoriPage;
  let fixture: ComponentFixture<DashboardKategoriPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardKategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
