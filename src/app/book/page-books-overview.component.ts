import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {BooksEntity} from "../+state/books.models";
import {BooksState} from "../+state/books.reducer";
import * as BooksActions from "../+state/books.actions";
import * as BooksSelectors from '../+state/books.selectors';

@Component({
    selector: 'app-book',
    template: `
        <ng-container *ngIf="(loaded$|async) === false">
            <div class="spinner-border text-warning d-block my-4" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </ng-container>

        <ng-container *ngIf="error$|async">
            <p>
                Error has occured </p>
        </ng-container>

        <ng-container *ngIf="books$|async as books">
            <app-book-list [books]="books"></app-book-list>
        </ng-container>
    `,
    styles: []
})
export class PageBooksOverviewComponent implements OnInit {
    books$!: Observable<BooksEntity[]>;
    loaded$!: Observable<boolean>;
    error$!: Observable<any>;

    constructor(private store: Store<{ books: BooksState }>) {
    }

    ngOnInit(): void {
        this.books$ = this.store.select(BooksSelectors.selectAllBooks);
        this.loaded$ = this.store.select(BooksSelectors.selectBooksLoaded);
        this.error$ = this.store.select(BooksSelectors.selectBooksError);
        this.store.dispatch(BooksActions.initBooks());
    }

}
