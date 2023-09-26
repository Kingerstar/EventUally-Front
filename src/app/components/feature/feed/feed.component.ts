import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from 'src/app/models/event.model';
import { SearchEventService } from 'src/app/shared/search-event.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  eventFilteredList: Event[] = [];
  categoryListSelected!: string[];

  constructor(
    private searchEventService: SearchEventService,
    private utils: UtilsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.searchEventService.getEventsFiltered().subscribe((eventFilteredFromJson: Event[]) => {
      this.eventFilteredList = eventFilteredFromJson;
    });
  }

  ngAfterViewInit(): void {
    document.getElementsByTagName("main")[0].scrollTop = this.utils.getFeedScrollTop();
    this.loopUpdateScrollTop();
  }

  loopUpdateScrollTop(): void {
    setTimeout(() => {
      if(this.router.url === '/'){
        this.utils.setFeedScrollTop(document.getElementsByTagName("main")[0].scrollTop);
        this.loopUpdateScrollTop();
      }
    }, 1000);
  }

  onCategoryChange(event: string[]): void {
    this.categoryListSelected = event;
  }

  filterEventsByCategories(): Event[] {
    if (!this.categoryListSelected || this.categoryListSelected.length === 0) {
      return this.eventFilteredList;
    }

    return this.eventFilteredList.filter((event) => {
      for (let i = 0; i < event.categoryList.length; i++) {
        if (this.categoryListSelected.includes(event.categoryList[i])) {
          return true;
        }
      }
      return false;
    });
  }
}