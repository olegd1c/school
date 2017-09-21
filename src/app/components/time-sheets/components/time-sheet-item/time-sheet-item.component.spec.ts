import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetItemComponent } from './time-sheet-item.component';

describe('TimeSheetItemComponent', () => {
  let component: TimeSheetItemComponent;
  let fixture: ComponentFixture<TimeSheetItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
