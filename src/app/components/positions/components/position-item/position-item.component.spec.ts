import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionItemComponent } from './position-item.component';

describe('PositionItemComponent', () => {
  let component: PositionItemComponent;
  let fixture: ComponentFixture<PositionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
