import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentEditComponent } from './recruitment-edit.component';

describe('RecruitmentEditComponent', () => {
  let component: RecruitmentEditComponent;
  let fixture: ComponentFixture<RecruitmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
