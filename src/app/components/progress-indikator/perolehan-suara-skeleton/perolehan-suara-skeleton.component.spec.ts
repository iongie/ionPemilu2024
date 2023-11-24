import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerolehanSuaraSkeletonComponent } from './perolehan-suara-skeleton.component';

describe('PerolehanSuaraSkeletonComponent', () => {
  let component: PerolehanSuaraSkeletonComponent;
  let fixture: ComponentFixture<PerolehanSuaraSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerolehanSuaraSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerolehanSuaraSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
