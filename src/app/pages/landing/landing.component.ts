import { Component } from '@angular/core';
import { SvgPathService } from 'src/app/shared/svg-path.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  display: string = "logo";

  emoticonCultiVibes: string = "";

  constructor(
    private svgPathService: SvgPathService
  ){}

  ngOnInit():void {
    this.emoticonCultiVibes = this.svgPathService.getTitlePathD("cool")[1];
    setTimeout(() => {
      this.display = "hero";
    }, 2000);    
  }

}
