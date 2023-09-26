import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Event } from 'src/app/models/event.model';
import { CategoriesService } from 'src/app/shared/categories.service';
import { DistrictsService } from 'src/app/shared/districts.service';
import { EventService } from 'src/app/shared/event.service';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss']
})
export class EventCreationComponent {

  districtList: string[] = [];

  categoryList: Category[] = [];

  constructor(private districts: DistrictsService, private categories: CategoriesService, private events: EventService) { }

  ngOnInit(): void {
    this.districts.getAll().subscribe(data => {
      this.districtList = data;
    });
  }

  onReceiveForm(event: Event) {
    this.events.post(event).subscribe();
  }
}
