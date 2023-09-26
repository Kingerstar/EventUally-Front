import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-week-structure',
  templateUrl: './week-structure.component.html',
  styleUrls: ['./week-structure.component.scss']
})
export class WeekStructureComponent {

  @Input()
  eventList!: Event[];

  constructor(
    private utils: UtilsService
  ){}

  formatDay(date: string): string {
    return this.utils.convertDateToDayOfTheWeek(date, "long");
  }

  formatHour(date: string): string {
    return this.utils.convertDateTo(date, "H:m");
  }

  urlIdName(id: number, name: string): string {
    return this.utils.convertIdNameToUrl(id, name);
  }

}
