import { Component, Input } from '@angular/core';
import { Map, Marker, NavigationControl, Popup } from 'maplibre-gl';
import { ENVIRONMENT } from 'src/environment/environment';

@Component({
  selector: 'app-map-focus',
  templateUrl: './map-focus.component.html',
  styleUrls: ['./map-focus.component.scss']
})
export class MapFocusComponent {

  @Input()
  gps!: number[];

  ngAfterViewInit(): void {

    const geoapifyKey = ENVIRONMENT.GEOAPIFY_KEY;
    const map = new Map({
      center: [this.gps[1], this.gps[0]],
      zoom: 12,
      container: 'map-container',
      style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${geoapifyKey}`,
    });
    map.addControl(new NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true
    }));

    const mapIcon = document.createElement('div');
    mapIcon.classList.add("map-icon");

    const backgroundImage = 'url(https://api.geoapify.com/v1/icon/?type=awesome&color=%23' + 'eb3c27' + '&size=x-large&icon=' + 'crosshairs' + '&iconSize=large&scaleFactor=2&noWhiteCircle&apiKey=' + ENVIRONMENT.GEOAPIFY_KEY + ')';

    mapIcon.style.backgroundImage = backgroundImage;

    const mapPopup = new Popup({
        anchor: 'bottom',
        offset: [0, -64]
    });

    const mapMarker = new Marker(mapIcon, {
        anchor: 'bottom',
        offset: [0, 5]
    })
        .setLngLat([this.gps[1], this.gps[0]])
        .setPopup(mapPopup)
        .addTo(map);

  }

  ngAfterViewChecked(): void {
    // Hide information of map
    if (document.getElementsByClassName("maplibregl-ctrl-attrib")[0] && document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className.includes(" maplibregl-compact-show mapboxgl-compact-show")) {
      document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className = document.getElementsByClassName("maplibregl-ctrl-attrib")[0].className.replace(" maplibregl-compact-show mapboxgl-compact-show", "");
    }
  }

}
