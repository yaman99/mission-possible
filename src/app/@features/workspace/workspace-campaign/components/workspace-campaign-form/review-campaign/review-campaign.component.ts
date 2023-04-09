import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-campaign',
  templateUrl: './review-campaign.component.html',
  styleUrls: ['./review-campaign.component.scss'],
})
export class ReviewCampaignComponent {
  @Input() CampaignForm: any;
  constructor() {}
}
