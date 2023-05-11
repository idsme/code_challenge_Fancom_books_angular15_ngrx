import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBooks from './+state/books.reducer';
import { BooksEffects } from './+state/books.effects';
import { BooksFacade } from './+state/books.facade';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {BookListComponent} from "./book/book-list.component";
import {PageBooksOverviewComponent} from "./book/page-books-overview.component";
import {BookFormComponent} from "./book/book-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [AppComponent, BookListComponent, PageBooksOverviewComponent, BookFormComponent],
  imports: [
      HttpClientModule,
  FormsModule,
 ReactiveFormsModule,
      AppRoutingModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([BooksEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.booksReducer),
  ],
  providers: [BooksFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
