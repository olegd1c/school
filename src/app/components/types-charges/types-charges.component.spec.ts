import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesChargesComponent } from './types-charges.component';

describe('TypesChargesComponent', () => {
  let component: TypesChargesComponent;
  let fixture: ComponentFixture<TypesChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
