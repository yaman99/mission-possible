import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceCampaignFormComponent } from './workspace-campaign-form.component';

describe('WorkspaceCampaignFormComponent', () => {
  let component: WorkspaceCampaignFormComponent;
  let fixture: ComponentFixture<WorkspaceCampaignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceCampaignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceCampaignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
