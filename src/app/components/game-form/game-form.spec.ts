import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameForm } from './game-form';

describe('GameForm', () => {
  let component: GameForm;
  let fixture: ComponentFixture<GameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameForm],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(GameForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
