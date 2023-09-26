import { Event } from "./event.model";
import { Organization } from "./organization.model";
import { Reacts } from "./reacts.model";

export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public pseudo: string,
        public email: string,
        public password: string,
        public profilePicture: string,
        public introduction: string,
        public friends: string[],
        public organizationFollowed: Organization[],
        public eventJoined: Event[],
        public categoryOfInterest: string[],
        public districtFavorite: string,
        public reacts: Reacts[]
    ) { }
}