import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2CustomFormComponentComponent } from './ng2-custom-form-component.component';

describe('Ng2CustomFormComponentComponent', () => {
  let component: Ng2CustomFormComponentComponent;
  let fixture: ComponentFixture<Ng2CustomFormComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2CustomFormComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2CustomFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
