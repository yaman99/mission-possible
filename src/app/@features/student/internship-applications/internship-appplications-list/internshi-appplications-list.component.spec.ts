import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshiAppplicationsListComponent } from './internshi-appplications-list.component';

describe('InternshiAppplicationsListComponent', () => {
  let component: InternshiAppplicationsListComponent;
  let fixture: ComponentFixture<InternshiAppplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshiAppplicationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshiAppplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
