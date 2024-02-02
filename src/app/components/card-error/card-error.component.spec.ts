import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CardErrorComponent } from './card-error.component';

describe('CardErrorComponent', () => {
  let component: CardErrorComponent;
  let fixture: ComponentFixture<CardErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an error message', () => {
    const span = fixture.debugElement.query(By.css('span'))?.nativeElement;
    expect(span).toBeTruthy();
    expect(span.innerText).toBe('Algo deu errado');
  });

  it('should render a reload button', () => {
    const button = fixture.debugElement.query(By.css('button'))?.nativeElement;
    expect(button).toBeTruthy();
    expect(button.innerText).toBe('RECARREGAR');
  });

  it('should emit a retry event on button click', () => {
    spyOn(component.retry, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.retry.emit).toHaveBeenCalled();
  });
});
