import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { Localization } from 'src/app/models/localization.model';
import { Organization } from 'src/app/models/organization.model';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-event-detailed',
  templateUrl: './event-detailed.component.html',
  styleUrls: ['./event-detailed.component.scss']
})
export class EventDetailedComponent {

  event: Event = new Event(0, "...", "", "...", new Localization(0, "...", "...", "...", [0, 0]), [], "", "", 0, new Organization(0, "...", new Localization(0, "...", "...", "...", []), "...", "...", [], "...", "...", "...", []));
  organizationName: string = "...";

  constructor(
    private router: Router,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const idNameUrl = this.router.url.replace("/event/", "");
    this.eventService.getById(idNameUrl).subscribe((json: Event) => {
      this.event = json;
    });
  }
}
