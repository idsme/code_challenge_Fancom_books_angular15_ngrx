import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BooksEntity } from '../+state/books.models';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "../app.module";

describe('BookListComponent', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule, FormsModule, ReactiveFormsModule],
            declarations: [BookListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookListComponent);
        component = fixture.componentInstance;
    });

    it('should render the component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display the list of books', () => {
        const books: BooksEntity[] = [
            {
                id: "1",
                title: 'Book 1',
                author: 'Author 1',
                publicationDate: '2023-01-01',
            },
            {
                id: "2",
                title: 'Book 2',
                author: 'Author 2',
                publicationDate: '2023-01-02',
            },
        ];

        component.books = books;
        fixture.detectChanges();

        const tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(books.length + 1); // Including the header row

        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            const tableData = tableRows[i + 1].querySelectorAll('td');

            expect(tableData[0].textContent).toContain(book.id);
            expect(tableData[1].textContent).toContain(book.title);
            expect(tableData[2].textContent).toContain(book.author);
            expect(tableData[3].textContent).toContain(book.publicationDate);
        }
    });
});
