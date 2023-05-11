import {Component, OnInit} from '@angular/core';
import {BooksFacade} from "./+state/books.facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'some app';
  constructor(public facade: BooksFacade) {
  }

  ngOnInit(): void {
    this.facade.init()
  }
}
