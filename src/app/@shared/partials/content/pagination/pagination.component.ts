import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PagedResultBase } from '@shared/models/pagination';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pagination$: Observable<PagedResultBase> ;
  @Input() pagination: PagedResultBase;
  @Output() getPageButtonClicked = new EventEmitter<number>();
  constructor() {}

  getPage(pageNumber: number) {
    this.getPageButtonClicked.next(pageNumber);
  }
}
