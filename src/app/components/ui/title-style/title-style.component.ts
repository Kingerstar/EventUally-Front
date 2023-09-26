import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-style',
  templateUrl: './title-style.component.html',
  styleUrls: ['./title-style.component.scss']
})
export class TitleStyleComponent {

  @Input() title!: string;

}
