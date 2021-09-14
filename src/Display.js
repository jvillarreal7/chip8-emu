import { BG_COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLIER, DISPLAY_WIDTH } from "./constants/displayConstants";

export class Display {
    constructor() {
        console.log("Create new display");
        this.screen = document.querySelector('canvas');
        this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLIER;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLIER;
        this.context = this.screen.getContext('2d');
        this.context.fillStyle = BG_COLOR;
        this.context.fillRect(0, 0, this.screen.width, this.screen.height);
    }
}