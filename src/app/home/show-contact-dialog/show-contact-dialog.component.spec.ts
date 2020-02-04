import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContactDialogComponent } from './show-contact-dialog.component';

describe('ShowContactDialogComponent', () => {
  let component: ShowContactDialogComponent;
  let fixture: ComponentFixture<ShowContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
