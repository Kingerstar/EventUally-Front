import { Event } from "./event.model";
import { Localization } from "./localization.model";

export class Organization {
    constructor(
        public id: number,
        public name: string,
        public localization: Localization,
        public password: string,
        public logo: string,
        public categoryList: string[],
        public email: string,
        public description: string,
        public websiteLink: string,
        public eventCreated: Event[],
    ) { }
}