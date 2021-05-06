import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ClassificationDto, ClassType, Icon} from '../shared/dto/book';
import {ClassificationService} from '../shared/services/classification.service';
import {AlertService} from '../shared/services/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-genres-types',
  templateUrl: './genres-types.component.html',
  styleUrls: ['./genres-types.component.scss']
})
export class GenresTypesComponent implements OnInit {
  classType: ClassType;
  classifications: ClassificationDto[];
  form: FormGroup;
  target: ClassificationDto;
  icon = 'help_outline';

  constructor(private route: ActivatedRoute,
              private classificationService: ClassificationService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.classificationService.getAll()
      .subscribe(response => {
        this.route.queryParams.subscribe((params: Params) => {
          if (params.class === 'genres') {
            this.classType = ClassType.GENRE;
          } else if (params.class === 'types') {
            this.classType = ClassType.TYPE;
          }
          this.classifications = response.body.filter(o => o.type === this.classType);
        });
      });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  invalidAndTouched(val: string): boolean {
    return this.form.get(val).invalid && this.form.get(val).touched;
  }

  getDefaultIcon(): string {
    return Icon.DEFAULT;
  }

  createClassType(): void {
    if (!this.form.valid) {
      return;
    }
    const classification: ClassificationDto = {
      title: this.form.get('title').value,
      icon: this.icon,
      type: this.classType
    };
    this.classificationService.create(classification)
      .subscribe(response => {
        if (response.body) {
          this.alertService.success(this.classType + ' is successfully created!');
          this.classifications.push(response.body);
          this.form.reset();
        }
      });
  }

  deleteClassType(): void {
    this.classificationService.delete(this.target)
      .subscribe(response => {
        if (response.body) {
          this.alertService.success(this.classType + ' is successfully deleted!');
          this.classifications = this.classifications.filter(o => o.id !== this.target.id);
          this.target = null;
        }
      });
  }

  clearTarget(): void {
    this.target = null;
    this.icon = this.getDefaultIcon();
    this.form.get('title').setValue(null);
  }

  editClassType(): void {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }
    const classification: ClassificationDto = {
      id: this.target.id,
      title: this.form.get('title').value,
      icon: this.icon,
      type: this.classType,
    };
    this.classificationService.edit(classification)
      .subscribe(response => {
        if (response.body) {
          this.alertService.success(this.classType + ' is successfully edited!');
          this.classifications = this.classifications.map(o => o.id === this.target.id ? response.body : o);
          this.target = null;
        }
      });
  }

  choose(icon: string): void {
    if (this.icon === icon) {
      this.icon = null;
    } else {
      this.icon = icon;
    }
  }

  targetEdit(classType: ClassificationDto): void {
    this.target = classType;
    this.icon = this.target.icon || Icon.DEFAULT;
    this.form.get('title').setValue(this.target.title);
  }
}
