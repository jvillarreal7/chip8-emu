import { Chip8 } from "./Chip8";

async function runChip8() {
    const rom = await fetch('./roms/test_opcode');
    const arrayBuffer = await rom.arrayBuffer();
    const romBuffer = new Uint8Array(arrayBuffer);
    const chip8 = new Chip8(romBuffer);
    chip8.registers.PC = 0x010;
    chip8.registers.V[0] = 7;
    chip8.registers.V[1] = 1;
    chip8.registers.V[2] = 2;
    chip8.registers.I = 0x100;

    chip8.execute(0xf355);

    chip8.registers.V[0] = 0;
    chip8.registers.V[1] = 0;
    chip8.registers.V[2] = 0;

    chip8.execute(0xf365);

    console.log('v0', chip8.registers.V[0].toString(16));
    console.log('v1', chip8.registers.V[1].toString(16));
    console.log('v2', chip8.registers.V[2].toString(16));
    console.log('i', chip8.registers.I.toString(16));


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