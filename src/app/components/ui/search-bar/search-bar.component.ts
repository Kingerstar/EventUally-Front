
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output()
  dataChange: EventEmitter<string> = new EventEmitter();

  query: string = "";
  results: string[] = [];

  sendData(): void {
    this.dataChange.emit(this.query);
  }
} 