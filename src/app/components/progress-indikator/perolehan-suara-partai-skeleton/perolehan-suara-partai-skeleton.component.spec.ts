import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerolehanSuaraPartaiSkeletonComponent } from './perolehan-suara-partai-skeleton.component';

describe('PerolehanSuaraPartaiSkeletonComponent', () => {
  let component: PerolehanSuaraPartaiSkeletonComponent;
  let fixture: ComponentFixture<PerolehanSuaraPartaiSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerolehanSuaraPartaiSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerolehanSuaraPartaiSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
