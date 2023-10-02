import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOccurrenceDialogComponent } from './create-occurrence-dialog.component';

describe('CreateOccurrenceDialogComponent', () => {
  let component: CreateOccurrenceDialogComponent;
  let fixture: ComponentFixture<CreateOccurrenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOccurrenceDialogComponent]
    });
    fixture = TestBed.createComponent(CreateOccurrenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
