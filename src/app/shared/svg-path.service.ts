import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Svg } from '../models/svg.model';

@Injectable({
    providedIn: 'root'
})
export class SvgPathService {

    // pathD for categories are from fontawesome
    private _svgData: Svg[] = [];

  constructor(private http: HttpClient){
    this.http.get('../assets/jsons/svg-informations.json').subscribe((result: any) => {
        this._svgData = result["svg-informations"];
    });
  }

    convertCategoryToAwesomeString(category: string): string {
        if (this._svgData.filter(el => el.nameFr === category).length > 0) {
            return this._svgData.filter(el => el.nameFr === category)[0].nameAwesome;
        }
        return "question";
    }

    getTitlePathD(nameFr: string): string[]{
        const matchingSvg = this._svgData.filter(svg => svg.nameFr === nameFr);
        if(matchingSvg.length === 1){
            return [matchingSvg[0].title, matchingSvg[0].pathD];
        }
        return ["error",""];
    }

    getCategoryNameList(): string[]{
        let names: string[] = [];
        for(let i = 0; i < this._svgData.length; i++){
            if(this._svgData[i].type === "category"){
                names.push(this._svgData[i].nameFr);
            }
        }
        return names;
    }

    svgInnerHtml(nameFr: string, height: number, width: number): string{
        let titlePath = this.getTitlePathD(nameFr);
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+height+' '+width+'"><title>'+titlePath[0]+'</title><path d="'+titlePath[1]+'" /></svg>';
    }
}
