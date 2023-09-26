import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'eventUally';
  currentUrl: string = '';

  constructor(private router: Router){}

  ngOnInit():void {

    if(!localStorage.getItem('isFirstVisit')){
      localStorage.setItem('isFirstVisit', 'false');
      this.router.navigate(['/welcome']);
    }

    this.router.events.subscribe(navInfo => {
      if(navInfo instanceof NavigationEnd){
        this.currentUrl = navInfo.url;
      }
    })
  }
}