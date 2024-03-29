import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-error',
  templateUrl: './card-error.component.html',
  styleUrls: ['./card-error.component.scss']
})
export class CardErrorComponent {
  @Output() retry = new EventEmitter<void>();
}
