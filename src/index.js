import { Chip8 } from "./Chip8";

const chip8 = new Chip8();

chip8.registers.stackPush(13);
chip8.registers.stackPush(15);
chip8.registers.stackPush(15);
let result;
result = chip8.registers.stackPop();
console.log(result);
result = chip8.registers.stackPop();
console.log(result);
result = chip8.registers.stackPop();
console.log(result);
result = chip8.registers.stackPop();
console.log(result);

// Set 26 into memory.
// chip8.memory.setMemory(0x05, 0x1a);
// const result = chip8.memory.getMemory(0x05);
// console.log(result);