import {Component, Input} from "@angular/core";
import {BooksEntity} from "../+state/books.models";

@Component({
    selector: "app-book-list",
    template: `
        <h2>Add Books 📚</h2>
        <app-book-form/>
        <h2>Books 📚</h2>
        <div>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publication Date</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let book of books">
                    <td>{{book?.id}}</td>
                    <td>{{book?.title}}</td>
                    <td>{{book?.author}}</td>
                    <td>{{book?.publicationDate}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    `
})

export class BookListComponent {
    @Input() books!: BooksEntity[];
}
