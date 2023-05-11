import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageBooksOverviewComponent} from "./book/page-books-overview.component";
import {BookFormComponent} from "./book/book-form.component";

const routes: Routes = [
    {path: 'books-overview', component: PageBooksOverviewComponent},
    {path: 'add-book', component: BookFormComponent},
    {path: "", redirectTo: "books-overview", pathMatch: "full"},
    {path: "**", redirectTo: "books-overview", pathMatch: "full"},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
