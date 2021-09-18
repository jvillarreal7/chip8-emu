import { Chip8 } from "./Chip8";

async function runChip8() {
    const rom = await fetch('./roms/test_opcode');
    const arrayBuffer = await rom.arrayBuffer();
    const romBuffer = new Uint8Array(arrayBuffer);
    const chip8 = new Chip8(romBuffer);
    chip8.registers.PC = 0x006;
    chip8.registers.V[5] = 0x01;
    chip8.registers.V[8] = 0x02;
    chip8.execute(0x5580);
    console.log('pc', chip8.registers.PC);
    


    // chip8.registers.ST = 10;
    // while(1) {
    //     await chip8.sleep(200);
    //     if(chip8.registers.DT > 0) {
    //         await chip8.sleep();
    //         chip8.registers.DT--;
    //     }
    //     if(chip8.registers.ST > 0) {
    //         chip8.soundCard.enableSound();
    //         await chip8.sleep();
    //         chip8.registers.ST--;
    //     }
    //     if(chip8.registers.ST === 0) {
    //         chip8.soundCard.disableSound();
    //     }
    // }
}

runChip8();

// while(1) {
    //     const haskeydown = chip8.keyboard.hasKeydown();
    //     const iskeydown = chip8.keyboard.isKeydown(1);
    //     console.log('haskeydown', haskeydown);
    //     console.log('iskeydown', iskeydown);
    //     await chip8.sleep();
    // }

// chip8.registers.stackPush(13);
// chip8.registers.stackPush(15);
// chip8.registers.stackPush(15);
// let result;
// result = chip8.registers.stackPop();
// console.log(result);
// result = chip8.registers.stackPop();
// console.log(result);
// result = chip8.registers.stackPop();
// console.log(result);
// result = chip8.registers.stackPop();
// console.log(result);

// Set 26 into memory.
// chip8.memory.setMemory(0x05, 0x1a);
// const result = chip8.memory.getMemory(0x05);
// console.log(result);