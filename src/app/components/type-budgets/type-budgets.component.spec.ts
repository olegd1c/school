import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBudgetsComponent } from './type-budgets.component';

describe('TypeBudgetsComponent', () => {
  let component: TypeBudgetsComponent;
  let fixture: ComponentFixture<TypeBudgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBudgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
