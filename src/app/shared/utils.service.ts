import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  feedScrollTop: number = 0;

  convertDateToDayOfTheWeek(date: string, length: "long" | "short"): string {
    if (new Date(date).getDay() === 1) {
      return length === "long" ? "lundi" : "lun.";
    } else if (new Date(date).getDay() === 2) {
      return length === "long" ? "mardi" : "mar.";
    } else if (new Date(date).getDay() === 3) {
      return length === "long" ? "mercredi" : "mer.";
    } else if (new Date(date).getDay() === 4) {
      return length === "long" ? "jeudi" : "jeu.";
    } else if (new Date(date).getDay() === 5) {
      return length === "long" ? "vendredi" : "ven.";
    } else if (new Date(date).getDay() === 6) {
      return length === "long" ? "samedi" : "sam.";
    }
    return length === "long" ? "dimanche" : "dim.";
  }

  convertDateTo(date: string, type: string): string{
    const yyyy = date.substring(0,4);
    const yy = date.substring(2,4);
    const M = date.substring(5,7);
    const d = date.substring(8,10);
    const H = date.substring(11,13);
    const m = date.substring(14,16);

    let formatedDate = type;
    if(formatedDate.includes('yyyy')){
      formatedDate = formatedDate.replace('yyyy', yyyy);
    }
    if(formatedDate.includes('yy')){
      formatedDate = formatedDate.replace('yy', yy);
    }
    if(formatedDate.includes('d')){
      formatedDate = formatedDate.replace('d', d);
    }
    if(formatedDate.includes('m')){// minute
      formatedDate = formatedDate.replace('m', m);
    }
    if(formatedDate.includes('MONTH')){
      formatedDate = formatedDate.replace('MONTH', this.convertMonthNumberToString(M));
    }
    if(formatedDate.includes('M')){// month
      formatedDate = formatedDate.replace('M', M);
    }
    if(formatedDate.includes('H')){
      formatedDate = formatedDate.replace('H', H);
    }
    if(formatedDate.includes('DAY')){
      formatedDate = formatedDate.replace('DAY', this.convertDateToDayOfTheWeek(date, "long"));
    }
    return formatedDate;
  }

  convertMonthNumberToString(monthNumber: string): string{
    if(monthNumber === "01"){return "janvier"}
    else if(monthNumber === "02"){return "février"}
    else if(monthNumber === "03"){return "mars"}
    else if(monthNumber === "04"){return "avril"}
    else if(monthNumber === "05"){return "mai"}
    else if(monthNumber === "06"){return "juin"}
    else if(monthNumber === "07"){return "juillet"}
    else if(monthNumber === "08"){return "août"}
    else if(monthNumber === "09"){return "septembre"}
    else if(monthNumber === "10"){return "octobre"}
    else if(monthNumber === "11"){return "novembre"}
    else if(monthNumber === "12"){return "décembre"}
    else{return "[error in month]"}
  }

  convertIdNameToUrl(id: number, name: string): string {
    name = name.toLowerCase();
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    name = name.replaceAll(" ", "-");
    return id + "-" + name;
  }

  compareTwoDates(firstDate: string, secondDate: string): "same day" | "same week" | "same month" | "different" {
    const firstDateDay = parseInt(firstDate.substring(0, 4)) * 365 + parseInt(firstDate.substring(5, 7)) * 30 + parseInt(firstDate.substring(8, 10));
    const secondDateDay = parseInt(secondDate.substring(0, 4)) * 365 + parseInt(secondDate.substring(5, 7)) * 30 + parseInt(secondDate.substring(8, 10));
    if (firstDateDay === secondDateDay) {
      return "same day";
    } else if (Math.max(firstDateDay, secondDateDay) - Math.min(firstDateDay, secondDateDay) <= 7) {
      return "same week";
    } else if (Math.max(firstDateDay, secondDateDay) - Math.min(firstDateDay, secondDateDay) <= 31) {
      return "same month";
    }
    return "different";
  }

  isEventCurrentlyOpen(start: string, end: string): boolean {
    const currentTime = new Date().toISOString().substring(0, 16);
    if (start < currentTime && end > currentTime) {
      return true;
    }
    return false;
  }

  baseUrl(): string{
    return 'http://localhost:8080/api/v1/';
  }

  getFeedScrollTop(): number {
    return this.feedScrollTop;
  }

  setFeedScrollTop(value: number): void {
    this.feedScrollTop = value;
  }
}
