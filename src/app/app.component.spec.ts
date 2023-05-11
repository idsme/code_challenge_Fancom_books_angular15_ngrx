import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {BooksFacade} from "./+state/books.facade";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockFacade: Partial<BooksFacade>; // Replace with the actual BooksFacade mock

  beforeEach(async () => {
    mockFacade = {
      init: jest.fn(), // Mock the init method
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: BooksFacade, useValue: mockFacade }], // Provide the BooksFacade mock
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render company-name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span#company-name')?.textContent).toEqual(
        'ACME Labs BV'
    );
  });

  it(`should have app.title 'some app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('some app');
  });

  it('should call facade.init() in ngOnInit', () => {
    component.ngOnInit();
    expect(mockFacade.init).toHaveBeenCalled();
  });
});

