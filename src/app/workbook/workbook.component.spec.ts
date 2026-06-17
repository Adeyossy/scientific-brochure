import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbookComponent } from './workbook.component';

describe('WorkbookComponent', () => {
  let component: WorkbookComponent;
  let fixture: ComponentFixture<WorkbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkbookComponent]
    });
    fixture = TestBed.createComponent(WorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
