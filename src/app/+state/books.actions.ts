import { createAction, props } from '@ngrx/store';
import { BooksEntity } from './books.models';

export const initBooks = createAction('[Books Page] Init');

export const loadBooksSuccess = createAction(
  '[Books/API] Load Books Success',
  props<{ books: BooksEntity[] }>()
);

export const addBook = createAction('[Book/API] Add Book', props<{ book: BooksEntity }>());
export const addBookSuccess = createAction('[Book/API] Add Book Success', props<{ book: BooksEntity }>());


