import {Component, OnInit} from '@angular/core';
import {BookDetailsDto, BookDto, ClassificationDto, ClassType, LabelDto} from '../shared/dto/book';
import {BookService} from '../shared/services/book.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';
import {ClassificationService} from '../shared/services/classification.service';
import {StyleGeneratorService} from '../shared/services/style.generator.service';
import {Observable} from 'rxjs';
import {LabelService} from '../shared/services/label.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book: BookDto;
  bookDetails$: Observable<BookDetailsDto>;

  allClassifications: ClassificationDto[] = [];
  allLabels: LabelDto[] = [];

  form: FormGroup;
  currentLabel = '';

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private classificationService: ClassificationService,
              private styleGeneratorService: StyleGeneratorService,
              private labelService: LabelService) {
  }

  ngOnInit(): void {
    this.initForm();

    this.route.params.pipe(switchMap((params: Params) => {
      return this.bookService.getBookById(params.id)
        .pipe(map(response => {
          return response.body;
        }));
    })).subscribe(book => {
      this.book = book;
      this.fillEditForm();
    });

    this.initClassifications();
    this.initLabels();
  }

  private initLabels(): void {
    this.labelService.getAll()
      .subscribe(response => {
        this.allLabels = response.body;
      });
  }

  private initClassifications(): void {
    this.classificationService.getAll()
      .subscribe(response => {
        this.allClassifications = response.body;
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      authors: new FormControl('', Validators.required)
    });
  }

  private fillEditForm(): void {
    this.form.get('title').setValue(this.book.title);
    this.form.get('genre').setValue(this.getClassificationFromBook(this.book, ClassType.GENRE));
    this.form.get('type').setValue(this.getClassificationFromBook(this.book, ClassType.TYPE));
    this.form.get('authors').setValue(this.book.authors.join(', '));
  }

  private getClassificationFromBook(book: BookDto, type: ClassType): string {
    if (book.classification && book.classification.length) {
      const classification = book.classification.find(o => o.type === type);
      return classification ? classification.title : '';
    }
    return '';
  }

  editBook(): void {
    if (!this.form.valid) {
      return;
    }
    const book: BookDto = {
      title: this.form.get('title').value,
      classification: this.getClassifications(),
      selfLink: this.book.selfLink,
      imageLink: this.book.imageLink,
      authors: this.book.authors,
      labels: this.book.labels
    };

    this.bookService.updateBook({...book, id: this.book.id})
      .subscribe(() => {
        this.alertService.success(`Book '${book.title}' successfully edited!`);
        this.router.navigate(['/books']);
      });
  }

  getClassifications(): ClassificationDto[] {
    return [
      this.getClassification(ClassType.GENRE, this.form.get('genre').value),
      this.getClassification(ClassType.TYPE, this.form.get('type').value),
    ];
  }

  private getClassification(type: ClassType, title: string): ClassificationDto {
    const fromBack = this.allClassifications.find(o => o.title === title && o.type === type);
    return fromBack ? fromBack : {title, type};
  }

  getAllClassByType(type: string): ClassificationDto[] {
    return this.allClassifications.filter(o => o.type === type);
  }

  randomCover(): string {
    return this.styleGeneratorService.randomCover();
  }

  loadExtraInformation(): void {
    this.bookDetails$ = this.bookService
      .getDetails(this.book.selfLink)
      .pipe(map(response => response.body));
  }

  addLabel(): void {
    if (!this.currentLabel || this.labelExists()) {
      return;
    }
    this.book.labels.push({title: this.currentLabel, color: this.styleGeneratorService.randomLabelStyle()});
    this.currentLabel = '';
  }

  labelExists(): boolean {
    return this.book.labels.find(o => o.title === this.currentLabel) != null;
  }

  removeLabel(title): void {
    this.book.labels = this.book.labels.filter(o => o.title !== title);
  }
}
