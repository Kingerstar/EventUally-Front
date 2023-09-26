import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bug } from 'src/app/models/bug.model';
import { PopUp } from 'src/app/models/pop-up.model';
import { PopUpService } from 'src/app/shared/pop-up.service';

@Component({
  selector: 'app-error-page-contents',
  templateUrl: './error-page-contents.component.html',
  styleUrls: ['./error-page-contents.component.scss']
})
export class ErrorPageContentsComponent {

  score: number = 0;
  secondsLeft: number = 5;
  bugList: Bug[]= [];

  constructor(private router: Router, private popup: PopUpService){}

  ngOnInit():void {
    for(let i = 0; i < 10; i++){
      this.bugList.push(new Bug("alive",0,0,0,0,0,0));
    }
  }

  ngAfterViewInit(): void{
    for(let i = 0; i < this.bugList.length; i++){
      (document.getElementsByClassName("alive")[i] as HTMLElement).style.left = this.bugList[i].leftDestination+"px";
      (document.getElementsByClassName("alive")[i] as HTMLElement).style.top = this.bugList[i].topDestination+"px";
      (document.getElementsByClassName("bug")[i] as HTMLElement).style.zIndex = "2";
    }
    this.letThemSwarm();
  }

  letThemSwarm(): void{
    setTimeout(() => {
      for(let i = 0 ; i < this.bugList.length; i++){
        if(this.bugList[i].state === "alive"){
          this.bugList[i].move(document.getElementById("error-page-container")?.clientWidth as number, document.getElementById("error-page-container")?.clientHeight as number);
          (document.getElementsByClassName("alive")[i] as HTMLElement).style.left = this.bugList[i].getLeftPosition().toString()+"px";
          (document.getElementsByClassName("alive")[i] as HTMLElement).style.top = this.bugList[i].getTopPosition().toString()+"px";
          (document.getElementsByClassName("alive")[i] as HTMLElement).style.transform = "rotate("+this.bugList[i].orientation+"deg)";
        }
      }
      this.secondsLeft = parseFloat((this.secondsLeft - 0.1).toFixed(1));
      if(this.secondsLeft <= 0){
        this.router.navigate(['']);
        this.popup.addToList(new PopUp("Tu as corrigé "+this.score+" bug"+(this.score >= 2 ? "s" : "")+" 🐜", "work"));
      }else{
        this.letThemSwarm();
      }
    }, 100);
  }

  onBugClick(i: number): void {
    if(this.bugList[i].state === "alive"){
      this.bugList[i].state = "dead";
      (document.getElementsByClassName("bug")[i] as HTMLElement).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>blood</title><path d="M18.14 16.7C17.23 18.21 16.08 17.73 15 17.09S12.9 15.68 12.25 16.59C11.54 17.37 12.09 18.62 12.37 19.72C12.65 20.83 12.67 21.79 10.9 22C9.5 21.81 9.58 20.65 9.81 19.42C10.04 18.19 10.4 16.89 9.5 16.43C8.78 15.95 8.28 16.78 7.65 17.6C7 18.41 6.26 19.2 5.04 18.62C3.94 17.71 4.36 17.18 4.94 16.5S6.27 14.91 5.84 13.31C5.66 12.66 4.76 12.81 3.87 12.79C3 12.77 2.12 12.59 2.03 11.29C1.96 10.5 2.55 10.18 3.16 9.93C3.78 9.68 4.41 9.5 4.42 8.87C4.45 8.26 4.04 7.83 3.78 7.38S3.41 6.46 4.03 5.76C5.08 4.9 5.92 5.63 6.76 6.42S8.43 8.04 9.46 7.39C10.28 6.85 9.53 5.9 8.95 4.97S7.96 3.15 9.46 2.74C10.76 2.38 11.26 3.27 11.71 4.3C12.17 5.33 12.57 6.5 13.67 6.71C15.24 7 16.38 5.16 17.47 3.7S19.63 1.15 21 2.95C22.5 4.84 21.07 5.72 19.4 6.5C17.73 7.23 15.81 7.87 16.27 9.28C16.54 10.1 17.42 9.65 18.35 9.34C19.27 9.03 20.26 8.86 20.74 10.27C21.25 11.76 20.04 12.1 18.68 12.24C17.32 12.38 15.8 12.32 15.7 13C15.59 13.71 16.5 14 17.29 14.42C18.08 14.85 18.75 15.42 18.14 16.7M20.5 19C19.55 19 19.06 18.26 19.06 17.5C19.06 16.74 19.54 16 20.5 16C21.5 16 22 16.74 22 17.5C22 18.26 21.5 19 20.5 19Z" /></svg>';
      (document.getElementsByClassName("bug")[i] as HTMLElement).style.fill = "var(--color-accent)";
      (document.getElementsByClassName("bug")[i] as HTMLElement).style.zIndex = "0";
      this.score ++;
    }
  }
}
