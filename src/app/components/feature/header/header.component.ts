import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { SearchEventService } from 'src/app/shared/search-event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchList: Event[] = [];
  searchListFiltered: Event[] = [];
  displaySearchBar: boolean = false;
  displayHeader: boolean = true;

  constructor(public searchEventService: SearchEventService, private router: Router) { };

  ngOnInit():void {
    this.searchEventService.getEvents().subscribe(eventsFromJsonFile => {
      this.searchList = eventsFromJsonFile;
    }
    )
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/') {
          this.displaySearchBar = true;
        } else {
          this.displaySearchBar = false;
        }
        if (e.url === '/welcome') {
          this.displayHeader = false;
        } else {
          this.displayHeader = true;
        }
      }
    })
  }


  onDataReceive(inputSearch: string): void {
    this.searchEventService.inputSearch$.next(inputSearch);
    this.searchListFiltered = this.searchList.filter((event: Event) => event.name.toLowerCase().includes(inputSearch.toLowerCase()));
  }
}   
