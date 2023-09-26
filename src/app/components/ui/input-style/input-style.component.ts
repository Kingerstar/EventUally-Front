import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-style',
  templateUrl: './input-style.component.html',
  styleUrls: ['./input-style.component.scss']
})
export class InputStyleComponent {

  @Input() name!: string;
  @Input() type !: "text" | "textarea" | "password" | "email" | "number";
  @Input() label!: string;
  @Input() placeHolder!: string;
  @Input() minLength: number = 0;

  @Output() inputChange: EventEmitter<string> = new EventEmitter();

  inputEntry: string = "";
  inputPasswordEyeStatus: string = "open";

  labelClicked(event: any){
    let currentName;
    let currentLabel;
    let currentInput;
    if(event.target.tagName === "LABEL"){
      currentName = event.target.htmlFor;
      currentLabel = event.target;
      currentInput = event.target.nextSibling;
    }else{ // INPUT
      currentName = event.target.previousSibling.htmlFor;
      currentLabel = event.target.previousSibling;
      currentInput = event.target;
    }

    // Reset all LABEL without value
    for(let i = 0; i < document.getElementsByTagName("label").length; i++){
      if(document.getElementsByTagName("input")[i].value === ""){
        document.getElementsByTagName("label")[i].className = "";
      }
    }
    // Move up current and correct label
    if(currentLabel.className === ""){
      currentLabel.className = "move-up";
    }

    currentInput.focus();
  }

  onKeyup():void {
    this.inputChange.emit(this.inputEntry);
  }

  passwordEyeClicked():void {
    let div = document.getElementsByClassName("input-password")[0];
    let input = document.getElementsByName("password")[0].getElementsByTagName("input")[0];
    if(div.className.includes("open")){
      div.className = div.className.replace("open", "close");
      this.inputPasswordEyeStatus = "close";
      input.setAttribute("type", "text");
    }else{
      div.className = div.className.replace("close", "open");
      this.inputPasswordEyeStatus = "open";
      input.setAttribute("type", "password");
    }
  }
}
