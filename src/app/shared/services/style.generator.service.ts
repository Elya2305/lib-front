import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StyleGeneratorService {
  bookCovers = [
    'https://static4.depositphotos.com/1011283/280/i/600/depositphotos_2808181-stock-photo-old-red-leather-texture-with.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTij-dy3HzefOPmzeF8_NPsiYq5mUBtJTARSz1LlV3W4J0gEmc4W6LE76eQfpDZOcSJp04&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ627HgBqs7KqspOeuBH26iBDNfr_XSVcmZaI6XQmAwVhIEPxQnquZsv5uv93sKd4J_Uvo&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbVCj7kMFIWQtzCG2brhrLe7NYohnSiqejEmkGYOBtvNpUwaiVw-zrTOo_Ry59wgCa8o&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_u1Zbbr0ROJPErynA9SflQ7t0KfBkcXrvtuB5tLFxXKvJO4pp2cAzCnUfyFwUmwDuIfc&usqp=CAU'
  ];

  labelStyles = ['secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  private static getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

  randomCover(): string {
    return this.bookCovers[StyleGeneratorService.getRandomInt(this.bookCovers.length)];
  }

  randomLabelStyle(): string {
    return this.labelStyles[StyleGeneratorService.getRandomInt(this.labelStyles.length)];
  }
}
