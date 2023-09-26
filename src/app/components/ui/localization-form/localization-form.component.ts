import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Localization } from 'src/app/models/localization.model';

@Component({
  selector: 'app-localization-form',
  templateUrl: './localization-form.component.html',
  styleUrls: ['./localization-form.component.scss']
})
export class LocalizationFormComponent {

  @Input() districtList!: string[];

  @Output() emitLocalization: EventEmitter<Localization> = new EventEmitter<Localization>();

  localization = new Localization(0,"Rue","Bordeaux","",[0.00000,0.00000]);

  onLocalizationChange():void {
    this.emitLocalization.emit(this.localization);
  }
}
