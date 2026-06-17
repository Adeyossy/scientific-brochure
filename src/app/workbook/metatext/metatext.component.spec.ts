import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatextComponent } from './metatext.component';

describe('MetatextComponent', () => {
  let component: MetatextComponent;
  let fixture: ComponentFixture<MetatextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetatextComponent]
    });
    fixture = TestBed.createComponent(MetatextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
