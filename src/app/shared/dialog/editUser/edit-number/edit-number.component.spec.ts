import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNumberComponent } from './edit-number.component';

describe('EditNumberComponent', () => {
  let component: EditNumberComponent;
  let fixture: ComponentFixture<EditNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNumberComponent]
    });
    fixture = TestBed.createComponent(EditNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
