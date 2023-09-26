import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-profile-events',
  templateUrl: './profile-events.component.html',
  styleUrls: ['./profile-events.component.scss']
})
export class ProfileEventsComponent {

  @Input()
  eventJoined!: Event[];

  @Output()
  eventLeaveEmitter: EventEmitter<number> = new EventEmitter();

  constructor(
    private router: Router,
    private utils: UtilsService
  ){}

  formatedDate(date: string): string {
    return this.utils.convertDateTo(date, "d/M H:m");
  }
  
  onDivClick(id: number, name: string): void {
    this.router.navigate(['/event/'+this.utils.convertIdNameToUrl(id, name)]);
  }

  onLeaveEvent(eventId: number): void {
    this.eventLeaveEmitter.emit(eventId);
  }
}
