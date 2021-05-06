import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class PageEvent {
  page: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalPages: number;
  @Output() onChangePage: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() {
  }

  nextPage(): void {
    this.onChangePage.emit({page: this.page + 1});
  }

  previousPage(): void {
    this.onChangePage.emit({page: this.page - 1});
  }

  getPage(page): void {
    this.onChangePage.emit({page: page - 1});
  }

  pages(): number[] {
    const start = Math.max(1, this.page - 1);
    return this.range(start, Math.min(start + 4, this.totalPages));
  }

  getCurrentPage(page: number): boolean {
    return page === this.page + 1;
  }

  startPage(): boolean {
    return this.page === 0;
  }

  endPage(): boolean {
    return this.page === this.totalPages - 1;
  }

  private range(start, end): number[] {
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  }
}
