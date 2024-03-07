import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPerolehanPartaiSuaraComponent } from './dashboard-perolehan-partai-suara.component';

describe('DashboardPerolehanPartaiSuaraComponent', () => {
  let component: DashboardPerolehanPartaiSuaraComponent;
  let fixture: ComponentFixture<DashboardPerolehanPartaiSuaraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPerolehanPartaiSuaraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPerolehanPartaiSuaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
