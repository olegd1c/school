import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetEditComponent } from './time-sheet-edit.component';

describe('TimeSheetEditComponent', () => {
  let component: TimeSheetEditComponent;
  let fixture: ComponentFixture<TimeSheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
