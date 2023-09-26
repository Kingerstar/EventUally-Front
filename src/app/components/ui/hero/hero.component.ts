import { Component } from '@angular/core';
import { EventService } from 'src/app/shared/event.service';
import { OrganizationService } from 'src/app/shared/organization.service';
import { SvgPathService } from 'src/app/shared/svg-path.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  changingTextList: string[] = ["cherchent de belles découvertes 🔍", "aiment sortir 💨", "ont le temps 🫖", "sont ouvertes 🤗", "veulent s'émerveiller ✨", "ont de l'énergie ⚡", "sont férues d'aventures 🤠"];
  indexOfChangingTextList: number = -1;
  currentChangingText: string = "";
  changingTextAddingChar: boolean = true;

  asRole: string = "user";
  userLi: string[][] = [
    ["filtre","Parcours tous les évènements existants et filtre les selon tes envies."],
    ["favoris","Découvres les évènements liés à tes centres d'intérêt et ton quartier favoris."],
    ["carte","Affiche les évènements sur une carte intéractive, et vois facilement les activités proche de toi."],
    ["sociabilise","Invite tes potes et partage les évènements auxquels tu participes. Vois les leurs et rejoins les."]
  ];
  orgaLi: string[][] = [
    ["show","Présente ton association au monde."],
    ["création d'évènement","Crée et modifie les évènements que tu souhaites proposer."],
    ["répandre","Fait connaître ton asso et fait la suivre par un maximum de monde."],
    ["réaction","Vois comment les gens réagissent à tes évènements."]
  ];

  figureList = [
    {
      svg: this.svgPathService.getTitlePathD("évènement"),
      number$: this.eventService.getQuantity(),
      description: "Évènements ont et ont eu lieux avec succès et pour votre plus grand plaisir 🎉"
    },
    {
      svg: this.svgPathService.getTitlePathD("utilisateurs"),
      number$: this.userService.getQuantity(),
      description: "Utilisateur·ices ont le plaisir d'avoir des recommendations personnalisées 🤗"
    },
    {
      svg: this.svgPathService.getTitlePathD("organisation"),
      number$: this.organizationService.getQuantity(),
      description: "Associations et organismes ont rejoins nos rangs pour vous proposer toujours plus d'évènements ✨"
    }
  ];

  constructor(
    private svgPathService: SvgPathService,
    private userService: UserService,
    private eventService: EventService,
    private organizationService: OrganizationService
  ){}

  ngOnInit(): void{
    this.runChangingText();
  }


  runChangingText(): void{
    let timeSpeed = 75;
    // New sentence
    if(this.currentChangingText === ""){
      this.changingTextAddingChar = true;
      let random = Math.floor(Math.random() * this.changingTextList.length);
      while(random === this.indexOfChangingTextList){
        random = Math.floor(Math.random() * this.changingTextList.length);
      }
      this.indexOfChangingTextList = random;
    }

    // Modify sentence
    if(this.changingTextAddingChar){
      this.currentChangingText = this.changingTextList[this.indexOfChangingTextList].slice(0,this.currentChangingText.length+1);
      // Emoji are consider as 2 char
      if(this.currentChangingText.length === this.changingTextList[this.indexOfChangingTextList].length-1){
        this.currentChangingText = this.changingTextList[this.indexOfChangingTextList];
        this.changingTextAddingChar = false;
        timeSpeed = 1000;
      }
    }else{
      timeSpeed = 42;
      // For emoji
      if(this.currentChangingText.length === this.changingTextList[this.indexOfChangingTextList].length){
        this.currentChangingText = this.changingTextList[this.indexOfChangingTextList].slice(0,this.currentChangingText.length-1);
      }
      this.currentChangingText = this.changingTextList[this.indexOfChangingTextList].slice(0,this.currentChangingText.length-1);
    }

    // Typing speed
    setTimeout(() => {
      this.runChangingText();
    }, timeSpeed);
  }

  searchSvg(name: string): string[]{
    return this.svgPathService.getTitlePathD(name);
  }

  changeAsRole(name: string): void{
    this.asRole = name;
  }
}
