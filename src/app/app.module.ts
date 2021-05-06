import {NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookSearchPageComponent} from './browse/book-search-page/book-search-page.component';
import {UserLayoutComponent} from './shared/components/user-layout/user-layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArrayFormatPipe} from './shared/pipes/array.format.pipe';
import {PaginatorComponent} from './shared/components/paginator/paginator.component';
import {BookLibraryComponent} from './book-library/book-library.component';
import {BrowseLayoutComponent} from './browse/shared/browse-layout/browse-layout.component';
import {GenresTypesComponent} from './genres-types/genres-types.component';
import {BookClassPipe} from './shared/pipes/book.class.pipe';
import {ViewBookComponent} from './view-book/view-book.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {ResponseInterceptor} from './shared/interceptors/response.interceptor';
import {MarkSearchPipe} from './shared/pipes/mark.search.pipe';

const RESPONSE_INTERCEPTOR_PROVIDER: Provider = {
  multi: true,
  provide: HTTP_INTERCEPTORS,
  useClass: ResponseInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    BookSearchPageComponent,
    UserLayoutComponent,
    PaginatorComponent,
    BookLibraryComponent,
    BrowseLayoutComponent,
    GenresTypesComponent,
    ViewBookComponent,
    AlertComponent,
    ArrayFormatPipe,
    BookClassPipe,
    MarkSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RESPONSE_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
