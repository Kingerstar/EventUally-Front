import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Event } from 'src/app/models/event.model';
import { Localization } from 'src/app/models/localization.model';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'app-event-creation-form',
  templateUrl: './event-creation-form.component.html',
  styleUrls: ['./event-creation-form.component.scss']
})
export class EventCreationFormComponent {

  @Input() districtList!: string[];

  @Input() categoryList!: Category[];

  @Output() emitFormEvent: EventEmitter<Event> = new EventEmitter<Event>();

  event = new Event(0, "", "", "", new Localization(0, "", "", "", [0, 0]), [], new Date().toISOString().substring(0, 16), new Date().toISOString().substring(0, 16), 0, new Organization(0, "...", new Localization(0, "...", "...", "...", []), "...", "...", [], "...", "...", "...", []));

  onSubmit(): void {
    this.emitFormEvent.emit(this.event);
  }
  onReceiveLocalization(spot: Localization) {
    this.event.localization = spot;
  }

  onReceiveChoosedCategoryList(list: string[]): void {
    this.event.categoryList = list;
  }

  hasChoosedCategoryList(): boolean {
    if (this.event.categoryList.length !== 0) {
      return true;
    }
    return false;
  }
}
