import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerolehanSuaraPartaiComponent } from './perolehan-suara-partai.component';

describe('PerolehanSuaraPartaiComponent', () => {
  let component: PerolehanSuaraPartaiComponent;
  let fixture: ComponentFixture<PerolehanSuaraPartaiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerolehanSuaraPartaiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerolehanSuaraPartaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
