import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailInputVoteSkeletonComponent } from './detail-input-vote-skeleton.component';

describe('DetailInputVoteSkeletonComponent', () => {
  let component: DetailInputVoteSkeletonComponent;
  let fixture: ComponentFixture<DetailInputVoteSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInputVoteSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailInputVoteSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
