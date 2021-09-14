import { Display } from "./Display";
import { Memory } from "./Memory";
import { Registers } from "./Registers";

export class Chip8 {
    constructor() {
        console.log("Create a new chip8");
        this.display = new Display();
        this.memory = new Memory();
        this.registers = new Registers();
    }
}