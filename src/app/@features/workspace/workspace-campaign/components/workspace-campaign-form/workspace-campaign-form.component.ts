import { UpdateCampaignRequest } from './../../models/requests/updateCampaignRequest';
import { Campaign } from '@shared/features/campaign/models/campaign.model';
import { WorkspaceCampaignState } from './../../store/states/campaign.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignActions, CampaignPaths } from '@shared/paths';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { IBus } from '@shared/state-bus/IBus';
import { Select } from '@ngxs/store';
import { WorkspaceItemState } from '@features/workspace/workspace-items/store/states/item.state';
import { Item } from '@features/workspace/workspace-items/models/item.model';
import { AddNewCampaignRequest } from '../../models/requests/addNewCampaignRequest';
import { WorkspaceCampaignStateActions } from '../../store/actions/campaign.action';
import { validateCommissionValue } from './commissionValueValidator';
import { WorkspaceItemStateActions } from '@features/workspace/workspace-items/store/actions/item.action';
import { GetWorkspaceItemsRequest } from '@features/workspace/workspace-items/models/requests/getWorkspaceItemsRequest';
import { CommissionService } from '@shared/services/commission.service';

@Component({
  selector: 'app-workspace-campaign-form',
  templateUrl: './workspace-campaign-form.component.html',
  styleUrls: ['./workspace-campaign-form.component.scss'],
})
export class WorkspaceCampaignFormComponent implements OnInit {
  @Select(WorkspaceItemState.items) items$: Observable<Item[]>;
  paths = {
    CampaignsListPath: CampaignPaths.CampaignsListComponents,
  };
  subscriptions: Subscription[] = [];
  updateMode = false;
  workspaceId: string;
  campaignForm: FormGroup;
  currentCampaign: Campaign;
  currentStep: any;
  stepsCounter = 1;
  reviewForm = true;
  get campaignBaiscForm() {
    return this.campaignForm.controls['campaignBaiscForm'];
  }
  // get campaignTypeForm() {
  //   return this.campaignForm.controls['campaignTypeForm'];
  // }
  get campaignItemForm() {
    return this.campaignForm.controls['campaignItemForm'];
  }
  get campaignTargetsForm() {
    return this.campaignForm.controls['campaignTargetsForm'];
  }
  get campaignCommissionForm() {
    return this.campaignForm.controls['campaignCommissionForm'];
  }
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private stateBus: IBus , private commissionService:CommissionService) {}
  formSteps = [
    {
      id: 'campaignBaiscForm',
      name: 'CAMPAIGN.FORM.CAMPAIGN_DETAILS',
      icon: 'fas fa-star fa-2x',
    },
    // {
    //   id: 'campaignTypeForm',
    //   name: 'Campaign Type',
    //   icon: 'fas fa-sitemap icon-7x',
    // },
    {
      id: 'campaignItemForm',
      name: 'CAMPAIGN.FORM.CAMPAIGN_ITEM',
      icon: 'fas fa-cube fa-2x',
    },
    {
      id: 'campaignTargetsForm',
      name: 'CAMPAIGN.FORM.CAMPAIGN_TARGETS',
      icon: 'fas fa-bullseye fa-2x',
    },
    {
      id: 'campaignCommissionForm',
      name: 'CAMPAIGN.FORM.CAMPAIGN_COMMISSION',
      icon: 'fas fa-dollar-sign fa-2x',
    },
    {
      id: 'review',
      name: 'CAMPAIGN.FORM.REVIEW_AND_SUBMIT',
      icon: 'fas fa-check-double fa-2x',
    },
  ];
  setCurrentStep(step: number) {
    this.currentStep = this.formSteps[step - 1];
    // if(this.currentStep === 4){
    //   this.stateBus.excuteAction(new WorkspaceItemStateActions.GetAll(new GetWorkspaceItemsRequest().))
    // }
  }
  nextStep() {
    if (this.validateStep()) {
      this.setCurrentStep(this.isLastStep() ? this.stepsCounter : this.stepsCounter + 1);
      this.stepsCounter++;
    }
  }
  previousStep() {
    this.setCurrentStep(this.isFirstStep() ? 1 : this.stepsCounter - 1);
    this.stepsCounter--;
  }
  isLastStep() {
    return this.stepsCounter === this.formSteps.length;
  }
  isFirstStep() {
    return this.stepsCounter === 1;
  }
  validateStep(): boolean {
    let result = false;
    let target = this.currentStep.id;
    const form = this.campaignForm.controls;
    if (target) {
      result = form[target].valid;
      if (!result) {
        form[target].markAllAsTouched();
        return false;
      }
    }
    return true;
  }
  ngOnInit(): void {
    this.setCurrentStep(this.stepsCounter);
    this.initForm();
    const action = this.route.snapshot.url[0];
    switch (action.path) {
      case CampaignActions.EditCampaign:
        this.updateMode = true;
        this.prepareUpdateForm();
        break;
      case CampaignActions.AddCampaign:
        this.updateMode = false;
        CampaignActions;
        break;
    }
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
  }
  initForm() {
    this.campaignForm = this.fb.group({
      campaignBaiscForm: this.fb.group({
        name: ['', Validators.required],
        description: [''],
      }),
      // campaignTypeForm: this.fb.group({
      //   type: ['', Validators.required],
      // }),
      campaignItemForm: this.fb.group({
        item: ['', Validators.required],
        coupon: [''],
      }),
      campaignTargetsForm: this.fb.group({
        targetCountries: [[], Validators.required],
        targetCategories: [[], Validators.required],
      }),
      campaignCommissionForm: this.fb.group(
        {
          type: ['percentage', Validators.required],
          value: ['', Validators.required],
        },
        {
          validators: validateCommissionValue(),
        }
      ),
    });
  }
  prepareUpdateForm() {
    const campaignId = this.route.snapshot.paramMap.get('id')!;
    this.currentCampaign = this.stateBus.getSnapshot(
      WorkspaceCampaignState.getCampaignById(campaignId)
    )!;
    this.campaignForm.patchValue(this.currentCampaign);
    this.campaignBaiscForm.patchValue(this.currentCampaign);
    this.campaignCommissionForm.patchValue(this.currentCampaign.commission);
    this.campaignTargetsForm.patchValue(this.currentCampaign);
    this.campaignItemForm.patchValue(this.currentCampaign);

    this.campaignItemForm.get('item')?.disable();
  }
  selectCategories(selectedCategories: any) {
    this.campaignTargetsForm.get('targetCategories')?.patchValue(selectedCategories);
  }
  selecteCountries(selectedCountries: any) {
    this.campaignTargetsForm.get('targetCountries')?.patchValue(selectedCountries);
  }
  saveChanges() {
    if (this.campaignForm.valid) {
      if (!this.updateMode) {
        let model: AddNewCampaignRequest = {
          workspace: this.workspaceId,
          name: this.campaignBaiscForm.get('name')?.value,
          description: this.campaignBaiscForm.get('description')?.value,
          item: this.campaignItemForm.get('item')?.value,
          coupon: this.campaignItemForm.get('coupon')?.value,
          targetCountries: this.campaignTargetsForm.get('targetCountries')?.value,
          targetCategories: this.campaignTargetsForm.get('targetCategories')?.value,
          commissionType: this.campaignCommissionForm.get('type')?.value,
          commissionValue: this.campaignCommissionForm.get('value')?.value,
        };
        this.stateBus.excuteAction(new WorkspaceCampaignStateActions.Create(model));
      } else {
        let model: UpdateCampaignRequest = {
          campaignId: this.currentCampaign.id,
          name: this.campaignBaiscForm.get('name')?.value,
          description: this.campaignBaiscForm.get('description')?.value,
          coupon: this.campaignItemForm.get('coupon')?.value,
          targetCountries: this.campaignTargetsForm.get('targetCountries')?.value,
          targetCategories: this.campaignTargetsForm.get('targetCategories')?.value,
        };
        this.stateBus.excuteAction(new WorkspaceCampaignStateActions.Update(model));
      }
    }
  }

  calculatePromoterPercentage() {
    const actualPercentage = this.campaignCommissionForm.value.value;
    const remainingPercentage = this.commissionService.getCommissionPercentageForPromoter(actualPercentage)
    return `  عليك ان تعلم بأنه سوف يحصل المسوق على ${remainingPercentage} % كصافي عمولة`;
  }
  calculatePromoterFixedPrice() {
    const actualPrice = this.campaignCommissionForm.value.value;
    const remainingPrice = this.commissionService.getCommissionFixedPriceForPromoter(actualPrice)
    return `  عليك ان تعلم بأنه سوف يحصل المسوق على ${remainingPrice} ريال كصافي أرباح`;
  }
}
