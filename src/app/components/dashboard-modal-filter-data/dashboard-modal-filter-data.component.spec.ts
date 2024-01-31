import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardModalFilterDataComponent } from './dashboard-modal-filter-data.component';

describe('DashboardModalFilterDataComponent', () => {
  let component: DashboardModalFilterDataComponent;
  let fixture: ComponentFixture<DashboardModalFilterDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardModalFilterDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardModalFilterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
