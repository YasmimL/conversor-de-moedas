import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CardLoadingComponent } from './card-loading.component';

describe('CardLoadingComponent', () => {
  let component: CardLoadingComponent;
  let fixture: ComponentFixture<CardLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a loading icon', () => {
    const icon = fixture.debugElement.query(
      By.css('.loading img')
    )?.nativeElement;
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('src')).toBe('assets/icons/loader.svg');
  });
});
