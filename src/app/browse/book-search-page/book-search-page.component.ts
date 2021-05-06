import {Component, OnInit} from '@angular/core';
import {BookDto, ClassType, SearchBookDto} from '../../shared/dto/book';
import {BookService} from '../../shared/services/book.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Paginator} from '../../shared/interfaces/common';
import {PageEvent} from '../../shared/components/paginator/paginator.component';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';
import {StyleGeneratorService} from '../../shared/services/style.generator.service';

@Component({
  selector: 'app-book-search-page',
  templateUrl: './book-search-page.component.html',
  styleUrls: ['./book-search-page.component.scss']
})
export class BookSearchPageComponent extends Paginator implements OnInit {
  books: SearchBookDto[];
  search = '';

  private subject = new Subject<any>();

  constructor(private bookService: BookService,
              private router: Router,
              private alertService: AlertService,
              private pictureGeneratorService: StyleGeneratorService) {
    super();
  }

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.search = value;
        this.searchBook(value, 0);
      });
  }

  onSearch($event): void {
    this.subject.next($event.target.value);
  }

  randomCover(): string {
    return this.pictureGeneratorService.randomCover();
  }

  searchBook(search, page, pageSize = this.pageSize): void {
    if (search) {
      this.bookService.search(search, page, pageSize)
        .subscribe(res => {
          this.page = res.page;
          this.totalPages = res.totalPages;
          this.books = res.objects;
        });
    } else {
      this.books = [];
    }
  }

  onChangePage(pageEvent: PageEvent): void {
    this.searchBook(this.search, pageEvent.page);
  }

  saveBook(book: SearchBookDto): void {
    const bookDto: BookDto = {
      title: book.title,
      authors: book.authors,
      classification: book.categories ? book.categories.map(o => ({title: o, type: ClassType.GENRE, icon: ''})) : [],
      imageLink: book.imageLink,
      selfLink: book.selfLink
    };

    this.bookService.createBook(bookDto)
      .subscribe((response) => {
        this.alertService.success('Book \'' + response.body.title + '\' is saved');
        this.router.navigate(['/books'], {queryParams: {fromWeb: true}});
      });
  }
}
