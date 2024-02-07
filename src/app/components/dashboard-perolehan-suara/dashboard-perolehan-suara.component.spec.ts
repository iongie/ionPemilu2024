import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPerolehanSuaraComponent } from './dashboard-perolehan-suara.component';

describe('DashboardPerolehanSuaraComponent', () => {
  let component: DashboardPerolehanSuaraComponent;
  let fixture: ComponentFixture<DashboardPerolehanSuaraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPerolehanSuaraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPerolehanSuaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
