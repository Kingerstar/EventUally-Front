import { AfterViewChecked, Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { Event } from 'src/app/models/event.model';
import { ApiExternalService } from 'src/app/shared/api-external.service';
import { EventService } from 'src/app/shared/event.service';
import { MapService } from 'src/app/shared/map.service';
import { SvgPathService } from 'src/app/shared/svg-path.service';
import { ENVIRONMENT } from 'src/environment/environment';

@Component({
    selector: 'app-map-gather',
    templateUrl: './map-gather.component.html',
    styleUrls: ['./map-gather.component.scss']
})
export class MapGatherComponent implements AfterViewInit, AfterViewChecked {

    eventList: Event[] = [];

    isMapLegendDisplayed: boolean = false;

    svgMapList: string[][] = [];

    constructor(
        private eventService: EventService,
        private api: ApiExternalService,
        private svgPathService: SvgPathService,
        private mapService: MapService
        ) { }

    ngOnInit():void {
        if (!localStorage.getItem("isFirstMapView")) {
            localStorage.setItem("isFirstMapView", "false");
            this.onMapLegendClick();
        }
        let svgMapNameList: string[] = this.svgPathService.getCategoryNameList();
        svgMapNameList.forEach(name => {
            let currentTitlePath = this.svgPathService.getTitlePathD(name);
            this.svgMapList.push([
                currentTitlePath[0],
                currentTitlePath[1],
                name[0].toUpperCase() + name.slice(1, name.length)
            ])
        });
    }

    ngAfterViewInit():void {

        const geoapifyKey = ENVIRONMENT.GEOAPIFY_KEY;

        this.api.ipApiGetLongLat().subscribe(jsonIp => {
            const map = new Map({
                center: [jsonIp.lon, jsonIp.lat],
                zoom: 12,
                container: 'map-container',
                style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${geoapifyKey}`,
            });
            map.addControl(new NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: true
            }));

            this.eventService.getAll().subscribe(jsonEvents => {
                this.eventList = jsonEvents.filter(event => event.endingDate > new Date().toISOString().substring(0, 16));
                this.eventList.sort(function (a, b) {
                    return b.localization.gpsCoordinates[1] - a.localization.gpsCoordinates[1];
                });
                for (let i = 0; i < this.eventList.length; i++) {
                    const currentEvent = this.eventList[i];
                    const mapIcon = document.createElement('div');
                    mapIcon.classList.add("map-icon");

                    const contentsAndImage = this.mapService.getContentsAndImage(this.eventList, i);
                    const htmlPopupContents = contentsAndImage[0];
                    const backgroundImage = contentsAndImage[1];
                    // Need to update i if multiple events are on the same localization
                    i = parseInt(contentsAndImage[2]);

                    mapIcon.style.backgroundImage = backgroundImage;

                    const mapPopup = new Popup({
                        anchor: 'bottom',
                        offset: [0, -64]
                    })
                        .setHTML(htmlPopupContents);

                    const mapMarker = new Marker(mapIcon, {
                        anchor: 'bottom',
                        offset: [0, 5]
                    })
                        .setLngLat([currentEvent.localization.gpsCoordinates[1], currentEvent.localization.gpsCoordinates[0]])
                        .setPopup(mapPopup)
                        .addTo(map);
                }
            });

        });
    }

    ngAfterViewChecked(): void {
        // Hide information of map
        if (document.getElementsByClassName("maplibregl-ctrl-attrib")[0] && document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className.includes(" maplibregl-compact-show mapboxgl-compact-show")) {
            document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className = document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className.replace(" maplibregl-compact-show mapboxgl-compact-show", "");
        }
    }

    onMapLegendClick(): void {
        this.isMapLegendDisplayed = !this.isMapLegendDisplayed;
    }
}
