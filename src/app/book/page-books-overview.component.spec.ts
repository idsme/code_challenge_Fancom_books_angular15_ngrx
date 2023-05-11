import {ComponentFixture, TestBed} from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as BooksActions from '../+state/books.actions';

function findInvalidControls(bookForm: FormGroup) {
    const invalid = [];
    const controls = bookForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log('Invalide', invalid);
    return invalid;
}

describe('BookFormComponent', () => {
    let component: BookFormComponent;
    let fixture: ComponentFixture<BookFormComponent>;
    let mockStore: any; // Replace with the actual Store mock
    let formBuilder: FormBuilder;





    beforeEach(() => {
        mockStore = {
            dispatch: jest.fn(),
        };

        formBuilder = TestBed.inject(FormBuilder);

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

        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        component.onAddBook();

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'form is invalid please enter data correctly',
            component.bookForm.getRawValue()
        );
        expect(markAllAsTouchedSpy).toHaveBeenCalled();

        consoleWarnSpy.mockRestore(); // Restore the original console.warn function
    });

    it('should dispatch addBook action with valid form data', () => {

        component.bookForm = formBuilder.group({
            title: ['Some Title', Validators.required],
            author: ['Some Author', Validators.required],
            publicationDate: ['29-04-16', Validators.required],
        });

        const dispatchMock = jest.fn();
        const mockStore: any = { dispatch: dispatchMock };
        component.store = mockStore;

        const book = component.onAddBook();

        expect(dispatchMock).toHaveBeenCalledWith(BooksActions.addBook( { book: book}));
    });

    it('should return true for invalid text field with required error and dirty/touched state', () => {
        component.bookForm.get('title')?.setValue('');
        component.bookForm.get('title')?.markAsDirty();
        component.bookForm.get('title')?.markAsTouched();

        const result = component.isTextFieldInvalid('title');

        expect(result).toBe(true);
    });

});
