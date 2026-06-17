import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatypeComponent } from './metatype.component';

describe('MetatypeComponent', () => {
  let component: MetatypeComponent;
  let fixture: ComponentFixture<MetatypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetatypeComponent]
    });
    fixture = TestBed.createComponent(MetatypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
