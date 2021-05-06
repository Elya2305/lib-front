export class SearchBookDto {
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  shortDescription: string;
  imageLink: string;
  selfLink: string;
}

export class BookDto {
  id?: number;
  title: string;
  authors?: string[];
  classification: ClassificationDto[];
  labels?: LabelDto[];
  selfLink?: string;
  imageLink?: string;
  status?: BookStatusDto;
}

export class ClassificationDto {
  id?: number;
  title: string;
  type: ClassType;
  icon?: string;
}

export class LabelDto {
  id?: number;
  title: string;
  color: string;
}

export class BookStatusDto {
  status: BookStatus;
  uiText: string;
}

export class BookStatus {
  TO_READ = 'TO_READ';
  ALREADY_READ = 'ALREADY_READ';
}

export enum ClassType {
  GENRE = 'GENRE',
  TYPE = 'TYPE'
}

export class BookDetailsDto {
  description: string;
  publishedDate: string;
  pageCount: number;
  buyLink: string;
}

export class Icon {
  public static DEFAULT = 'help_outline';
}
