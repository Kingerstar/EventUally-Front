import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { UtilsService } from './utils.service';
import { ENVIRONMENT } from 'src/environment/environment';
import { SvgPathService } from './svg-path.service';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    constructor(private utils: UtilsService, private svgPathService: SvgPathService) { }

    getContentsAndImage(allEvents: Event[], i: number): string[] {
        const currentEvent = allEvents[i];
        let contents = "";
        let image = 'url(https://api.geoapify.com/v1/icon/?type=awesome&color=%23';
        const currentDate = new Date().toISOString().substring(0, 16);
        let contentsAndImage: string[] = [];

        // Date text
        if (this.utils.isEventCurrentlyOpen(currentEvent.startingDate, currentEvent.endingDate)) {
            contentsAndImage = this.adaptedContentsAndImage(
                "open",
                currentEvent.endingDate
                );
        } else {
            contentsAndImage = this.adaptedContentsAndImage(
                this.utils.compareTwoDates(currentDate, currentEvent.startingDate),
                currentEvent.startingDate
            );
        }

        contents += contentsAndImage[0];
        image += contentsAndImage[1];

        contents += this.textTitleAndButton(currentEvent);

        let svgLogoName = this.svgPathService.convertCategoryToAwesomeString(currentEvent.categoryList[0]);

        // Multiple events on the same localization
        while (
            allEvents[i + 1]
            && allEvents[i + 1].localization.gpsCoordinates[0] === allEvents[i].localization.gpsCoordinates[0]
            && allEvents[i + 1].localization.gpsCoordinates[1] === allEvents[i].localization.gpsCoordinates[1]
        ) {
            svgLogoName = 'plus';
            contents +=
                '<br><hr><br>'
                + this.adaptedContentsAndImage(
                    this.utils.compareTwoDates(currentDate, allEvents[i + 1].startingDate),
                    allEvents[i + 1].startingDate
                )[0]
                + this.textTitleAndButton(allEvents[i + 1]);
            i++;
        }

        image += svgLogoName + '&iconSize=large&scaleFactor=2&apiKey=' + ENVIRONMENT.GEOAPIFY_KEY + ')';

        return [contents, image, i.toString()];
    }

    private adaptedContentsAndImage(timming: "open" | "same day" | "same week" | "same month" | "different", date: string): string[]{
        let rContents: string = "contents";
        let rImage: string = "image";

        let svgTitle: string = '';
        let svgName = "";
        let text: string = "";

        if(timming === "open"){
            svgTitle = 'Actuellement ouvert';
            svgName = "en cours";
            text = "Ouvert jusqu'au " + this.utils.convertDateTo(date, 'DAY d/M');
            rImage = "eb3c27";
        }else if(timming === "same day"){
            svgTitle = 'Heure';
            svgName = "horloge";
            text = "Aujourd'hui à " + this.utils.convertDateTo(date, 'H:m');
            rImage = "eb3c27";
        }else if(timming === "same week"){
            svgTitle = 'Calendrier';
            svgName = "calendrier";
            text = this.utils.convertDateTo(date, 'DAY à H:m');
            rImage = "55b8ce";
        }else if(timming === "same month"){
            svgTitle = 'Calendrier';
            svgName = "calendrier";
            text = this.utils.convertDateTo(date, 'd/M');
            rImage = "000000";
        }else{
            svgTitle = 'Calendrier';
            svgName = "calendrier";
            text = this.utils.convertDateTo(date, 'd/M');
            rImage = "ffffff";
        }

        rContents =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>'
            + svgTitle
            + '</title><path d="'
            + this.svgPathService.getTitlePathD(svgName)[1]
            + '" /></svg> '
            + text
            + '<br>';
        rImage += '&size=x-large&icon=';
        return [rContents, rImage];
    }

    textTitleAndButton(event: Event): string{
        return '<h3>'
            + event.name
            + '</h3><p><a href="../event/'
            + this.utils.convertIdNameToUrl(event.id, event.name)
            + '" class="button">En savoir plus</a></p>';
    }
}