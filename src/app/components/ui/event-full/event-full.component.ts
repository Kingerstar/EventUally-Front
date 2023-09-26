import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { UtilsService } from 'src/app/shared/utils.service';


@Component({
  selector: 'app-event-full',
  templateUrl: './event-full.component.html',
  styleUrls: ['./event-full.component.scss']
})
export class EventFullComponent {

  @Input() event!: Event;

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
    document.getElementsByTagName("main")[0].scrollTop = 0;
  }

  formatDateAndTime(date: string): string {
    let year = '';
    if (date.substring(0, 4) !== new Date().toISOString().substring(0, 4)) {
      year = ' yyyy';
    }
    return this.utils.convertDateTo(date, 'DAY d MONTH' + year + ', H:m');
  }
  mergeIdAndName(id: number, name: string): string {
    return this.utils.convertIdNameToUrl(id, name);

  }
}


