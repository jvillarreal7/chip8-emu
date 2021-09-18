import { CHAR_SET_WIDTH } from "./constants/charSetConstants";
import { BG_COLOR, DISPLAY_HEIGHT, DISPLAY_MULTIPLIER, DISPLAY_WIDTH, COLOR } from "./constants/displayConstants";

export class Display {
    constructor(memory) {
        console.log("Create new display");
        this.memory = memory;
        this.screen = document.querySelector('canvas');
        this.screen.width = DISPLAY_WIDTH * DISPLAY_MULTIPLIER;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_MULTIPLIER;
        this.context = this.screen.getContext('2d');
        this.context.fillStyle = BG_COLOR;
        this.frameBuffer = [];
        this.reset();
    }
    reset() {
        for(let i = 0; i < DISPLAY_HEIGHT; i++) {
            this.frameBuffer.push([]);
            for(let j = 0; j < DISPLAY_WIDTH; j++) {
                this.frameBuffer[i].push(0);
            }
        }
        this.context.fillRect(0, 0, this.screen.width, this.screen.height);
        this.drawBuffer();
        console.log("Reset display")
    }
    drawBuffer() {
        for(let h = 0; h < DISPLAY_HEIGHT; h++) {
            for(let w = 0; w < DISPLAY_WIDTH; w++) {
                this.drawPixel(h, w, this.frameBuffer[h][w]);
            }
        }
    }
    drawPixel(h, w, value) {
        if(value) {
            // Pixel is on
            this.context.fillStyle = COLOR;
        } else {
            // Pixel is off
            this.context.fillStyle = BG_COLOR;
        }
        this.context.fillRect(
            w * DISPLAY_MULTIPLIER, 
            h * DISPLAY_MULTIPLIER, 
            DISPLAY_MULTIPLIER, 
            DISPLAY_MULTIPLIER
        );
    }
    drawSprite(h, w, spriteAddress, num) {
        let pixelCollision = 0;
        for(let lh = 0; lh < num; lh++) {
            const line = this.memory.memory[spriteAddress+lh];
            for(let lw = 0; lw < CHAR_SET_WIDTH; lw++) {
                // Dislocate to the right.
                const bitToCheck = (0b10000000 >> lw);
                const value = line & bitToCheck;
                // Wrap around screen.
                const ph = (h + lh) % DISPLAY_HEIGHT;
                const pw = (w + lw) % DISPLAY_WIDTH;
                if(value === 0) {
                    continue;
                }
                if(this.frameBuffer[ph][pw] === 1) {
                    pixelCollision = 1;
                }
                this.frameBuffer[ph][pw] ^= 1;
            }
        }
        this.drawBuffer();
        return pixelCollision;
    }
}