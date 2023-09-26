import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgPathService } from 'src/app/shared/svg-path.service';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent {

  @Input()
  introduction!: string;

  @Output()
  formEmitter: EventEmitter<string> = new EventEmitter();

  isEditing: boolean = false;

  constructor(private svgPathService: SvgPathService){}

  updateIntro(){
    this.isEditing = true;
  }

  getSvg(name: string, element: string): string {
    const titlePath = this.svgPathService.getTitlePathD(name);
    if(element === 'title'){
      return titlePath[0];
    }
    return titlePath[1];
  }

  closePopup(): void {
    this.isEditing = false;
  }

  sendIntro(): void {
    this.formEmitter.emit(this.introduction);
    this.closePopup();
  }

}
