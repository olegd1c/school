import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentItemComponent } from './recruitment-item.component';

describe('RecruitmentItemComponent', () => {
  let component: RecruitmentItemComponent;
  let fixture: ComponentFixture<RecruitmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
