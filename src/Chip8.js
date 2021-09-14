import { Display } from "./Display";

export class Chip8 {
    constructor() {
        console.log("Create a new chip8");
        this.display = new Display();
    }
}