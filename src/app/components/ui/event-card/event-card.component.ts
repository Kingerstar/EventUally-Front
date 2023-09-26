import { Component, Input } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { SvgPathService } from 'src/app/shared/svg-path.service';
import { UtilsService } from 'src/app/shared/utils.service';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input()
  event!: Event;

  selectedEventId: number = 0;
  calendarSvg: string[] = [];
  mapMarkerSvg: string[] = [];
  link: string = "";


  constructor(private svgPathService: SvgPathService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.calendarSvg = this.svgPathService.getTitlePathD("calendrier");
    this.mapMarkerSvg = this.svgPathService.getTitlePathD("épingle de carte");
    this.link = "/event/" + this.utils.convertIdNameToUrl(this.event.id, this.event.name);
  }

  formatDateAndTime(date: string): string {
    let year = '';
    if (date.substring(0, 4) !== new Date().toISOString().substring(0, 4)) {
      year = ' yyyy';
    }
    return this.utils.convertDateTo(date, 'DAY d MONTH' + year + ', H:m');
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  onItemClick(eventId: number): void {
    this.selectedEventId = eventId;
  }
}