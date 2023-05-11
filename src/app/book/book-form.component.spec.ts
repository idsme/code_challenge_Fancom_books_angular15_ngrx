import { ComponentFixture } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import * as BooksActions from '../+state/books.actions';

describe('BookFormComponent', () => {
    let component: BookFormComponent;
    let fixture: ComponentFixture<BookFormComponent>;
    let mockStore: any;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        mockStore = {
            dispatch: jest.fn(),
        };

        formBuilder = new FormBuilder();

        component = new BookFormComponent(mockStore, formBuilder);
        component.bookForm = formBuilder.group({
            title: ['Some Title', Validators.required],
            author: ['Some Author', Validators.required],
            publicationDate: ['', Validators.required],
        });
    });

    it('should initialize the form with default values', () => {
        expect(component.bookForm.get('title')?.value).toBe('Some Title');
        expect(component.bookForm.get('author')?.value).toBe('Some Author');
        expect(component.bookForm.get('publicationDate')?.value).toBe('');
    });

    it('should mark the form as touched when onAddBook is called with invalid form', () => {
        const markAllAsTouchedSpy = jest.spyOn(component.bookForm, 'markAllAsTouched');

        component.onAddBook();

        expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });


    it('should dispatch addBook action with valid form data', () => {

        const dispatchMock = jest.fn();
        const mockStore: any = { dispatch: dispatchMock };
        component.store = mockStore;

        // Set the form fields to valid values
        component.bookForm.get('title')?.setValue('Some Title');
        component.bookForm.get('author')?.setValue('Some Author');
        component.bookForm.get('publicationDate')?.setValue('2023-05-11');

        const book = component.onAddBook();

        expect(component.bookForm.valid).toBe(true);
        expect(dispatchMock).toHaveBeenCalledWith(BooksActions.addBook({ book }));
    });


    it('should return true for invalid text field with required error and dirty/touched state', () => {
        component.bookForm.get('title')?.setValue('');
        component.bookForm.get('title')?.markAsDirty();
        component.bookForm.get('title')?.markAsTouched();

        const result = component.isTextFieldInvalid('title');

        expect(result).toBe(true);
    });

});
