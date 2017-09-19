import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePaymentsComponent } from './type-payments.component';

describe('TypePaymentsComponent', () => {
  let component: TypePaymentsComponent;
  let fixture: ComponentFixture<TypePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
