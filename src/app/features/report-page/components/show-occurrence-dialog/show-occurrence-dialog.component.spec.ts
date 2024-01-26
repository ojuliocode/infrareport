import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOccurrenceDialogComponent } from './show-occurrence-dialog.component';

describe('ShowOccurrenceDialogComponent', () => {
  let component: ShowOccurrenceDialogComponent;
  let fixture: ComponentFixture<ShowOccurrenceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowOccurrenceDialogComponent]
    });
    fixture = TestBed.createComponent(ShowOccurrenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
