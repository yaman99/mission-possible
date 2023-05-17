import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialLetterRequestsComponent } from './official-letter-requests.component';

describe('OfficialLetterRequestsComponent', () => {
  let component: OfficialLetterRequestsComponent;
  let fixture: ComponentFixture<OfficialLetterRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficialLetterRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialLetterRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
