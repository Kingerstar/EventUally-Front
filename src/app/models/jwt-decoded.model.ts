export class JwtDecoded {
    constructor(
        public role: "ROLE_ADMIN" | "ROLER_USER" | "ROLE_ORGANIZATION",
        public sub: string,
        public iat: number,
        public exp: number 
    ){}
}