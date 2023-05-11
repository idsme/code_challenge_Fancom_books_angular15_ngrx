import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from "@ngrx/store";
import {BooksEntity} from "../+state/books.models";
import {BooksState} from "../+state/books.reducer";
import * as BooksActions from "../+state/books.actions";

@Component({
    selector: 'app-book-form',
    template: `
        <form [formGroup]="bookForm">
            <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" class="form-control" formControlName="title">
                <div *ngIf="isTextFieldInvalid('title')">
                    Please enter a valid title.
                </div>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" id="author" class="form-control" value="some author" formControlName="author">
                <div *ngIf="isTextFieldInvalid('author')">
                    Please enter a valid author.
                </div>
            </div>
            <div class="mb-3">
                <label for="publicationDate" class="form-label">Publication Date</label>
                <input type="date" id="publicationDate" class="form-control" formControlName="publicationDate">
                <div *ngIf="isTextFieldInvalid('publicationDate')">
                    Please enter a valid publication date.
                </div>
            </div>
            <button class="btn btn-primary" (click)="onAddBook()">Add</button>
        </form>
    `
})
export class BookFormComponent implements OnInit {
    bookForm!: FormGroup;
    constructor(public store: Store<{ books: BooksState }>, private formBuilder: FormBuilder) {
    }

    onAddBook(): BooksEntity {
        if (this.bookForm.valid) {
            // Perform form submission or API call here
            const book = <BooksEntity>this.bookForm.getRawValue();

            // Yes, I know this is fake, but it's just for demo purposes
            book.id = Math.floor(Math.random() * 100000000) + "";

            // dispatching addBook action with dummy book data
            console.log(`saving book pressed`, book);
            this.store.dispatch(BooksActions.addBook({book}));
            return book;
        } else {
            console.warn(`form is invalid please enter data correctly`, this.bookForm.getRawValue());
            this.bookForm.markAllAsTouched();
        }
        return this.bookForm.getRawValue();
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.bookForm = this.formBuilder.group({
            title: ['Some Title', Validators.required],
            author: ['Some Author', Validators.required],
            publicationDate: ['', Validators.required]
        });
    }


    isTextFieldInvalid(fieldName: string): boolean {
        let result = false;
        if((this.bookForm.get(fieldName)?.invalid && this.bookForm.get(fieldName)?.dirty || this.bookForm.get(fieldName)?.touched) && this.bookForm.get(fieldName)?.hasError('required')) {
            result = true;
        }
        // console.log(`isTextFieldInvalid(${fieldName}): ${result}`);
        return result;
    }

}
