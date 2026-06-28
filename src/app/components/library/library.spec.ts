import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Library } from './library';

describe('Library', () => {
  let component: Library;
  let fixture: ComponentFixture<Library>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Library],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Library);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
