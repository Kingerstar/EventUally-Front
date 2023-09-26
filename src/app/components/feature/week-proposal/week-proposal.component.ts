import { Component } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-week-proposal',
  templateUrl: './week-proposal.component.html',
  styleUrls: ['./week-proposal.component.scss']
})
export class WeekProposalComponent {

  eventListFiltered: Event[] = [];

  constructor(
    private eventService: EventService
  ){}

  ngOnInit(): void {
    this.eventService.getWeek().subscribe((events: Event[]) => {
      this.eventListFiltered = events;
    });
  }

}
