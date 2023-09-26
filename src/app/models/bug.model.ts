export class Bug{
    constructor(
        public state: string,
        public leftPosition: number,
        public topPosition: number,
        public leftDestination: number,
        public topDestination: number,
        public speed: number,
        public orientation: number
    ){
        this.state = "alive";
        this.leftPosition = Math.floor(Math.random() * 360);
        this.topPosition = Math.floor(Math.random() * 600);
        this.leftDestination = Math.floor(Math.random() * 360);
        this.topDestination = Math.floor(Math.random() * 600);
        this.speed = Math.floor(Math.random() * 10) + 5;
        this.orientation = 0;
    }

    move(maxWidth: number, maxHeight: number): void{
        // Left
        if(this.leftPosition < this.leftDestination){
            let remainsSpeed = this.speed;
            while(this.leftPosition !== this.leftDestination && remainsSpeed != 0){
                this.leftPosition ++;
                remainsSpeed --;
            }
        }else if(this.leftPosition > this.leftDestination){
            let remainsSpeed = this.speed;
            while(this.leftPosition !== this.leftDestination && remainsSpeed != 0){
                this.leftPosition --;
                remainsSpeed --;
            }
        }

        // Top
        if(this.topPosition < this.topDestination){
            let remainsSpeed = this.speed;
            while(this.topPosition !== this.topDestination && remainsSpeed != 0){
                this.topPosition ++;
                remainsSpeed --;
            }
        }else if(this.topPosition > this.topDestination){
            let remainsSpeed = this.speed;
            while(this.topPosition !== this.topDestination && remainsSpeed != 0){
                this.topPosition --;
                remainsSpeed --;
            }
        }

        // Orientation
        this.pythagoreOrientation([this.leftPosition, this.topPosition], [this.leftDestination, this.topDestination]);

        // Arrival
        if(this.leftPosition === this.leftDestination && this.topPosition === this.topDestination){
            this.generateNewDestination(maxWidth, maxHeight);
        }
    }

    getLeftPosition(): number{
        return this.leftPosition;
    }

    getTopPosition(): number{
        return this.topPosition;
    }

    generateNewDestination(maxWidth: number, maxHeight: number): void{
        this.leftDestination = -100 + Math.floor(Math.random() * (maxWidth+100));
        this.topDestination = -100 + Math.floor(Math.random() * (maxHeight+100));
    }

    pythagoreOrientation(position: number[], destination: number[]): void{
        let angleRad = Math.atan((destination[1]-position[1])/(destination[0]-position[0]));
        let angleDeg = angleRad * 180 / Math.PI;
        if(destination[0] >= position[0] && destination[1] <= position[1]){
            this.orientation = angleDeg+90;
        }else if(destination[0] >= position[0] && destination[1] >= position[1]){
            this.orientation = angleDeg+90;
        }else if(destination[0] <= position[0] && destination[1] >= position[1]){
            this.orientation = angleDeg-90;
        }else if(destination[0] <= position[0] && destination[1] <= position[1]){
            this.orientation = angleDeg-90;
        }
    }
}