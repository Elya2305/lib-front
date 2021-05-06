import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserLayoutComponent} from './shared/components/user-layout/user-layout.component';
import {BookSearchPageComponent} from './browse/book-search-page/book-search-page.component';
import {BookLibraryComponent} from './book-library/book-library.component';
import {GenresTypesComponent} from './genres-types/genres-types.component';
import {ViewBookComponent} from './view-book/view-book.component';

const routes: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {path: 'books', component: BookLibraryComponent},
      {path: 'classifier', component: GenresTypesComponent},
      {path: 'view/:id', component: ViewBookComponent},
      {path: 'search', component: BookSearchPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
