import { Display } from "./Display";
import { Memory } from "./Memory";

export class Chip8 {
    constructor() {
        console.log("Create a new chip8");
        this.display = new Display();
        this.memory = new Memory();
    }
}