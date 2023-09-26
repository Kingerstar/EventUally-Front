import { Localization } from "./localization.model";
import { Organization } from "./organization.model";

export class Event {

    constructor(
        public id: number,
        public name: string,
        public banner: string,
        public description: string,
        public localization: Localization,
        public categoryList: string[],
        public startingDate: string,
        public endingDate: string,
        public userMaxJoin: number,
        public organization: Organization
    ) { }
}