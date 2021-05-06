import {Component, OnInit} from '@angular/core';
import {BookDto, ClassificationDto, ClassType, Icon} from '../shared/dto/book';
import {BookService} from '../shared/services/book.service';
import {Paginator} from '../shared/interfaces/common';
import {AlertService} from '../shared/services/alert.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {StyleGeneratorService} from '../shared/services/style.generator.service';
import {PageEvent} from '../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-book-library',
  templateUrl: './book-library.component.html',
  styleUrls: ['./book-library.component.scss']
})
export class BookLibraryComponent extends Paginator implements OnInit {
  books: BookDto[] = [];
  subject = new Subject<any>();
  search = '';

  bookToDelete: BookDto;


  constructor(private bookService: BookService,
              private alertService: AlertService,
              private pictureGeneratorService: StyleGeneratorService) {
    super();
  }

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.search = value;
        this.searchBook(value, this.page);
      });
    this.getBooks(this.page, this.pageSize);
  }

  getBooks(page, pageSize = this.pageSize): void {
    this.bookService.getBooks(page, pageSize)
      .subscribe(response => {
        this.books = response.objects;
        this.page = response.page;
        this.totalPages = response.totalPages;
      });
  }

  deleteBook(): void {
    if (!this.bookToDelete) {
      return;
    }
    this.bookService.deleteBook(this.bookToDelete.id)
      .subscribe(() => {
        this.getBooks(this.page, this.pageSize);
        this.alertService.success('Book was successfully deleted');
        this.bookToDelete = null;
      });
  }

  onSearch($event): void {
    this.subject.next($event.target.value);
  }

  private searchBook(search, page, pageSize = this.pageSize): void {
    if (search) {
      this.bookService.searchLocal(search, page, pageSize)
        .subscribe(res => {
          this.page = res.page;
          this.totalPages = res.totalPages;
          this.books = res.objects;
          if (!this.books.length) {
            this.alertService.warning('An empty result');
          }
        });
    } else {
      this.getBooks(page, pageSize);
    }
  }

  randomCover(): string {
    return this.pictureGeneratorService.randomCover();
  }

  defaultIcon(): string {
    return Icon.DEFAULT;
  }

  getGenres(book: BookDto): ClassificationDto[] {
    return book.classification ? book.classification.filter(o => o.type === ClassType.GENRE) : [];
  }

  setBookForDeleting(book: BookDto): void {
    this.bookToDelete = book;
  }

  unsetBookToDelete(): void {
    this.bookToDelete = null;
  }

  onChangePage(pageEvent: PageEvent): void {
    console.log(pageEvent);
    this.searchBook(this.search, pageEvent.page);
  }
}
