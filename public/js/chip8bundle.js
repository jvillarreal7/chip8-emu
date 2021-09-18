/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chip8": () => (/* binding */ Chip8)
/* harmony export */ });
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _Disassembler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);











class Chip8 {
    constructor(romBuffer) {
        console.log("Create a new chip8");
        this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_7__.Memory();
        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_8__.Registers();
        this.loadCharSet()
        this.loadRom(romBuffer);
        this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_6__.Keyboard();
        this.soundCard = new _SoundCard__WEBPACK_IMPORTED_MODULE_9__.SoundCard();
        this.disassembler = new _Disassembler__WEBPACK_IMPORTED_MODULE_4__.Disassembler();
        this.display = new _Display__WEBPACK_IMPORTED_MODULE_5__.Display(this.memory);
    }
    sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_3__.TIMER_60_HZ) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    loadCharSet() {
        this.memory.memory.set(_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.CHAR_SET_ADDRESS);
    }
    loadRom(romBuffer) {
        console.assert(
            romBuffer.length + _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS <= _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.MEMORY_SIZE, 
            'This ROM is too large.');
        this.memory.memory.set(romBuffer, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS);
        this.registers.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_2__.LOAD_PROGRAM_ADDRESS;
    }
    async execute(opcode) {
        const {instruction, args} = this.disassembler.disassemble(opcode);
        const {id} = instruction;
        console.log('i', instruction);
        console.log('a', args);
        console.log('id', id);

        switch(id) {
            case 'CLS':
                this.display.reset();
                break;
            case 'RET':
                this.registers.PC = this.registers.stackPop();
                break;
            case 'JP_ADDR':
                this.registers.PC = args[0];
                break;
            case 'CALL_ADDR':
                this.registers.stackPush(this.registers.PC);
                this.registers.PC = args[0];
                break;
            case 'SE_VX_KK':
                if(this.registers.V[args[0]] === args[1]) {
                    this.registers.PC += 2;
                }
                break;
            case 'SNE_VX_KK':
                if(this.registers.V[args[0]] !== args[1]) {
                    this.registers.PC += 2;
                }
                break;
            case 'SE_VX_VY':
                if(this.registers.V[args[0]] === this.registers.V[args[1]]) {
                    this.registers.PC += 2;
                }
                break;
            case 'LD_VX_KK':
                this.registers.V[args[0]] = args[1];
                break;
            case 'ADD_VX_KK':
                this.registers.V[args[0]] += args[1];
                break;
            case 'LD_VX_VY':
                this.registers.V[args[0]] = this.registers.V[args[1]];
                break;
            case 'OR_VX_VY':
                this.registers.V[args[0]] |= this.registers.V[args[1]];
                break;
            case 'AND_VX_VY':
                this.registers.V[args[0]] &= this.registers.V[args[1]];
                break;
            case 'XOR_VX_VY':
                this.registers.V[args[0]] ^= this.registers.V[args[1]];
                break;
            case 'ADD_VX_VY':
                this.registers.V[0x0F] = 
                    (this.registers.V[args[0]] + this.registers.V[args[1]] > 0xFF);
                this.registers.V[args[0]] += this.registers.V[args[1]];
                break;
            case 'SUB_VX_VY':
                this.registers.V[0x0F] = 
                    this.registers.V[args[0]] > this.registers.V[args[1]];
                this.registers.V[args[0]] -= this.registers.V[args[1]];
                break;
            case 'SHR_VX_VY':
                this.registers.V[0x0F] = this.registers.V[args[0]] & 0x01;
                this.registers.V[args[0]] >>= 1;
                break;
            case 'SUBN_VX_VY':
                this.registers.V[0x0F] = this.registers.V[args[1]] > this.registers.V[args[0]];
                this.registers.V[args[0]] = this.registers.V[args[1]] - this.registers.V[args[0]];
                break;
            case 'SHL_VX_VY':
                this.registers.V[0x0F] = Boolean(this.registers.V[args[0]] & 0x80); //0b10000000
                this.registers.V[args[0]] <<= 1;
                break;
            case 'SNE_VX_VY':
                if(this.registers.V[args[0]] !== this.registers.V[args[1]]) {
                    this.registers.PC += 2;
                }
                break;
            case 'LD_I_ADDR':
                this.registers.I = args[0];
                break;
            case 'JP_V0_ADDR':
                this.registers.PC = this.registers.V[0] + args[0];
                break;
            case 'RND_VX_KK':
                const random = Math.floor(Math.random() * 0xFF);
                this.registers.V[args[0]] = random & args[1];
                break;
            case 'DRW_VX_VY_N':
                const collision = this.display.drawSprite(
                    this.registers.V[args[0]],
                    this.registers.V[args[1]],
                    this.registers.I,
                    args[2]
                );
                this.registers.V[0x0F] = collision;
                break;
            case 'SKP_VX':
                if(this.keyboard.isKeydown(this.registers.V[args[0]])) {
                    this.registers.PC += 2;
                }
                break;
            case 'SKNP_VX':
                if(!this.keyboard.isKeydown(this.registers.V[args[0]])) {
                    this.registers.PC += 2;
                }
                break;
            case 'LD_VX_DT':
                this.registers.V[args[0]] = this.registers.DT;
                break;
            case 'LD_VX_K':
                let keyPressed = -1;
                while(keyPressed === -1) {
                    keyPressed = this.keyboard.hasKeydown();
                    await this.sleep();
                }
                this.registers.V[args[0]] = keyPressed;
                break;
            case 'LD_DT_VX':
                this.registers.DT = this.registers.V[args[0]];
                break;
            case 'LD_ST_VX':
                this.registers.ST = this.registers.V[args[0]];
                break;
            case 'ADD_I_VX':
                this.registers.I += this.registers.V[args[0]];
                break;
            case 'LD_F_VX':
                this.registers.I = this.registers.V[args[0]] * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.SPRITE_HEIGHT;
                break;
            case 'LD_B_VX':
                let x = this.registers.V[args[0]];
                const hundreds = Math.floor(x / 100);
                x = x - hundreds * 100;
                const tens = Math.floor((x) / 10);
                const ones = x - tens * 10;
                this.memory.memory[this.registers.I] = hundreds;
                this.memory.memory[this.registers.I + 1] = tens;
                this.memory.memory[this.registers.I + 2] = ones;
                break;
            case 'LD_I_VX':
                for(let i = 0; i <= args[0]; i++) {
                    this.memory.memory[this.registers.I + i] = this.registers.V[i];
                }
                break;
            case 'LD_VX_I':
                for(let i = 0; i <= args[0]; i++) {
                    this.registers.V[i] = this.memory.memory[this.registers.I + i];
                }
                break;
            default:
                console.error(`Instruction with id ${id} not found.`, instruction, args);
        }
    }
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHAR_SET_WIDTH": () => (/* binding */ CHAR_SET_WIDTH),
/* harmony export */   "CHAR_SET": () => (/* binding */ CHAR_SET)
/* harmony export */ });
const CHAR_SET_WIDTH = 8;

const CHAR_SET = [
    // Sprites for:
    // 0
    0xF0,
    0x90,
    0x90,
    0x90,
    0xF0,
    // 1
    0x20,
    0x60,
    0x20,
    0x20,
    0x70,
    // 2
    0xF0,
    0x10,
    0xF0,
    0x80,
    0xF0,
    // 3
    0xF0,
    0x10,
    0xF0,
    0x10,
    0xF0,
    // 4
    0x90,
    0x90,
    0xF0,
    0x10,
    0x10,
    // 5
    0xF0,
    0x80,
    0xF0,
    0x10,
    0xF0,
    // 6
    0xF0,
    0x80,
    0xF0,
    0x90,
    0xF0,
    // 7
    0xF0,
    0x10,
    0x20,
    0x40,
    0x40,
    // 8
    0xF0,
    0x90,
    0xF0,
    0x90,
    0xF0,
    // 9
    0xF0,
    0x90,
    0xF0,
    0x10,
    0xF0,
    // A
    0xF0,
    0x90,
    0xF0,
    0x90,
    0x90,
    // B
    0xE0,
    0x90,
    0xE0,
    0x90,
    0xE0,
    // C
    0xF0,
    0x80,
    0x80,
    0x80,
    0xF0,
    // D
    0xE0,
    0x90,
    0x90,
    0x90,
    0xE0,
    // E
    0xF0,
    0x80,
    0xF0,
    0x80,
    0xF0,
    // F
    0xF0,
    0x80,
    0xF0,
    0x80,
    0x80,
]

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MEMORY_SIZE": () => (/* binding */ MEMORY_SIZE),
/* harmony export */   "LOAD_PROGRAM_ADDRESS": () => (/* binding */ LOAD_PROGRAM_ADDRESS),
/* harmony export */   "CHAR_SET_ADDRESS": () => (/* binding */ CHAR_SET_ADDRESS)
/* harmony export */ });
const MEMORY_SIZE = 4095; // 0xFFF
const LOAD_PROGRAM_ADDRESS = 0x200; // 512
const CHAR_SET_ADDRESS = 0x000;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_REGISTERS": () => (/* binding */ NUMBER_OF_REGISTERS),
/* harmony export */   "STACK_DEPTH": () => (/* binding */ STACK_DEPTH),
/* harmony export */   "TIMER_60_HZ": () => (/* binding */ TIMER_60_HZ)
/* harmony export */ });
const NUMBER_OF_REGISTERS = 16;
const STACK_DEPTH = 16;
const TIMER_60_HZ = 1000/60;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disassembler": () => (/* binding */ Disassembler)
/* harmony export */ });
/* harmony import */ var _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


class Disassembler {
    disassemble(opcode) {
        const instruction = _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__.INSTRUCTION_SET.find(
            (instruction) => (opcode & instruction.mask) === instruction.pattern
        );
        const args = instruction.arguments.map(
            (arg) => (opcode & arg.mask) >> arg.shift
        );
        return {instruction, args};
    }
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MASK_NNN": () => (/* binding */ MASK_NNN),
/* harmony export */   "MASK_N": () => (/* binding */ MASK_N),
/* harmony export */   "MASK_X": () => (/* binding */ MASK_X),
/* harmony export */   "MASK_Y": () => (/* binding */ MASK_Y),
/* harmony export */   "MASK_KK": () => (/* binding */ MASK_KK),
/* harmony export */   "MASK_HIGHEST_BYTE": () => (/* binding */ MASK_HIGHEST_BYTE),
/* harmony export */   "MASK_HIGHEST_AND_LOWEST_BYTE": () => (/* binding */ MASK_HIGHEST_AND_LOWEST_BYTE),
/* harmony export */   "INSTRUCTION_SET": () => (/* binding */ INSTRUCTION_SET)
/* harmony export */ });
const MASK_NNN = {mask: 0x0FFF};
const MASK_N = {mask: 0x000F};
const MASK_X = {mask: 0x0F00, shift: 8};
const MASK_Y = {mask: 0x00F0, shift: 4};
const MASK_KK = {mask: 0x00FF};
const MASK_HIGHEST_BYTE = 0xF000;
const MASK_HIGHEST_AND_LOWEST_BYTE = 0xF00F;

const INSTRUCTION_SET = [
    {
        key: 2,
        id: 'CLS',
        name: 'CLS',
        mask: 0xFFFF,
        pattern: 0x00E0,
        arguments: []
    },
    {
        key: 3,
        id: 'RET',
        name: 'RET',
        mask: 0xFFFF,
        pattern: 0x00EE,
        arguments: []
    },
    {
        key: 4,
        id: 'JP_ADDR',
        name: 'JP',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x1000,
        arguments: [MASK_NNN]
    },
    {
        key: 5,
        id: 'CALL_ADDR',
        name: 'CALL',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x2000,
        arguments: [MASK_NNN]
    },
    {
        key: 6,
        id: 'SE_VX_KK',
        name: 'SE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x3000,
        arguments: [MASK_X, MASK_KK]
    },
    {
        key: 7,
        id: 'SNE_VX_KK',
        name: 'SNE',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x4000,
        arguments: [MASK_X, MASK_KK]
    },
    {
        key: 8,
        id: 'SE_VX_VY',
        name: 'SE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x5000,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 9,
        id: 'LD_VX_KK',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x6000,
        arguments: [MASK_X, MASK_KK]
    },
    {
        key: 10,
        id: 'ADD_VX_KK',
        name: 'ADD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0x7000,
        arguments: [MASK_X, MASK_KK]
    },
    {
        key: 11,
        id: 'LD_VX_VY',
        name: 'LD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8000,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 12,
        id: 'OR_VX_VY',
        name: 'OR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8001,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 13,
        id: 'AND_VX_VY',
        name: 'AND',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8002,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 14,
        id: 'XOR_VX_VY',
        name: 'XOR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8003,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 15,
        id: 'ADD_VX_VY',
        name: 'ADD',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8004,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 16,
        id: 'SUB_VX_VY',
        name: 'SUB',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8005,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 17,
        id: 'SHR_VX_VY',
        name: 'SHR',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8006,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 18,
        id: 'SUBN_VX_VY',
        name: 'SUBN',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x8007,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 19,
        id: 'SHL_VX_VY',
        name: 'SHL',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x800E,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 20,
        id: 'SNE_VX_VY',
        name: 'SNE',
        mask: MASK_HIGHEST_AND_LOWEST_BYTE,
        pattern: 0x9000,
        arguments: [MASK_X, MASK_Y]
    },
    {
        key: 21,
        id: 'LD_I_ADDR',
        name: 'LD',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xA000,
        arguments: [MASK_NNN]
    },
    {
        key: 22,
        id: 'JP_V0_ADDR',
        name: 'JP',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xB000,
        arguments: [MASK_NNN]
    },
    {
        key: 23,
        id: 'RND_VX_KK',
        name: 'RND',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xC000,
        arguments: [MASK_X, MASK_KK]
    },
    {
        key: 24,
        id: 'DRW_VX_VY_N',
        name: 'DRW',
        mask: MASK_HIGHEST_BYTE,
        pattern: 0xD000,
        arguments: [MASK_X, MASK_Y, MASK_N]
    },
    {
        key: 25,
        id: 'SKP_VX',
        name: 'SKP',
        mask: 0xF0FF,
        pattern: 0xE09E,
        arguments: [MASK_X]
    },
    {
        key: 26,
        id: 'SKNP_VX',
        name: 'SKNP',
        mask: 0xF0FF,
        pattern: 0xE0A1,
        arguments: [MASK_X]
    },
    {
        key: 27,
        id: 'LD_VX_DT',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF007,
        arguments: [MASK_X]
    },
    {
        key: 28,
        id: 'LD_VX_K',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF00A,
        arguments: [MASK_X]
    },
    {
        key: 29,
        id: 'LD_DT_VX',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF015,
        arguments: [MASK_X]
    },
    {
        key: 30,
        id: 'LD_ST_VX',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF018,
        arguments: [MASK_X]
    },
    {
        key: 31,
        id: 'ADD_I_VX',
        name: 'ADD',
        mask: 0xF0FF,
        pattern: 0xF01E,
        arguments: [MASK_X]
    },
    {
        key: 32,
        id: 'LD_F_VX',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF029,
        arguments: [MASK_X]
    },
    {
        key: 33,
        id: 'LD_B_VX',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF033,
        arguments: [MASK_X]
    },
    {
        key: 34,
        id: 'LD_I_VX',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF055,
        arguments: [MASK_X]
    },
    {
        key: 35,
        id: 'LD_VX_I',
        name: 'LD',
        mask: 0xF0FF,
        pattern: 0xF065,
        arguments: [MASK_X]
    }
]

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class Display {
    constructor(memory) {
        console.log("Create new display");
        this.memory = memory;
        this.screen = document.querySelector('canvas');
        this.screen.width = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER;
        this.screen.height = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER;
        this.context = this.screen.getContext('2d');
        this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.BG_COLOR;
        this.frameBuffer = [];
        this.reset();
    }
    reset() {
        for(let i = 0; i < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT; i++) {
            this.frameBuffer.push([]);
            for(let j = 0; j < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH; j++) {
                this.frameBuffer[i].push(0);
            }
        }
        this.context.fillRect(0, 0, this.screen.width, this.screen.height);
        this.drawBuffer();
        console.log("Reset display")
    }
    drawBuffer() {
        for(let h = 0; h < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT; h++) {
            for(let w = 0; w < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH; w++) {
                this.drawPixel(h, w, this.frameBuffer[h][w]);
            }
        }
    }
    drawPixel(h, w, value) {
        if(value) {
            // Pixel is on
            this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.COLOR;
        } else {
            // Pixel is off
            this.context.fillStyle = _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.BG_COLOR;
        }
        this.context.fillRect(
            w * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER, 
            h * _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER, 
            _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER, 
            _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_MULTIPLIER
        );
    }
    drawSprite(h, w, spriteAddress, num) {
        let pixelCollision = 0;
        for(let lh = 0; lh < num; lh++) {
            const line = this.memory.memory[spriteAddress+lh];
            for(let lw = 0; lw < _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET_WIDTH; lw++) {
                // Dislocate to the right.
                const bitToCheck = (0b10000000 >> lw);
                const value = line & bitToCheck;
                // Wrap around screen.
                const ph = (h + lh) % _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT;
                const pw = (w + lw) % _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_WIDTH;
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

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "DISPLAY_MULTIPLIER": () => (/* binding */ DISPLAY_MULTIPLIER),
/* harmony export */   "SPRITE_HEIGHT": () => (/* binding */ SPRITE_HEIGHT),
/* harmony export */   "BG_COLOR": () => (/* binding */ BG_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const DISPLAY_MULTIPLIER = 10;
const SPRITE_HEIGHT = 5;
const BG_COLOR = '#000';
const COLOR = '#3f6';

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class Keyboard {
    constructor() {
        this.keys = new Array(_constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.NUMBER_OF_KEYS).fill(false);
        document.addEventListener("keydown", (event) => this.keydown(event.key));
        document.addEventListener("keyup", (event) => this.keyup(event.key));
    }
    keydown(key) {
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.keyMap.findIndex((mapKey) => mapKey === key.toLowerCase());
        if(keyIndex > -1) {
            //console.log("Real key", key, "mapped to chip8", keyIndex);
            this.keys[keyIndex] = true;
        }
    }

    keyup(key) {
        const keyIndex = _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__.keyMap.findIndex((mapKey) => mapKey === key.toLowerCase());
        if(keyIndex > -1) {
            this.keys[keyIndex] = false;
        }
    }

    isKeydown(keyIndex) {
        return this.keys[keyIndex]
    }

    hasKeydown() {
        return this.keys.findIndex((key) => key);
    }
}

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NUMBER_OF_KEYS": () => (/* binding */ NUMBER_OF_KEYS),
/* harmony export */   "keyMap": () => (/* binding */ keyMap)
/* harmony export */ });
const NUMBER_OF_KEYS = 16
const keyMap = [
    "1", "2", "3", 
    "q", "w", "e",
    "a", "s", "d",
    "x", "z", "c",
    "4", "r", "f", "v"
]

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Memory": () => (/* binding */ Memory)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Memory {
    constructor() {
        this.memory = new Uint8Array(_constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE);
        this.reset();
    }
    reset() {
        this.memory.fill(0);
    }
    setMemory(index, value) {
        this.assertMemory(index);
        this.memory[index] = value;
    }
    getMemory(index) {
        this.assertMemory(index);
        return this.memory[index];
    }
    assertMemory(index) {
        console.assert(
            index >= 0 && index < _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.MEMORY_SIZE, 
            `Error trying to access memory at index ${index}`
        );
    }
    getOpcode(index) {
        const highByte = this.getMemory(index);
        const lowByte = this.getMemory(index + 1);
        return (highByte << 8) | lowByte;
    }
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



class Registers {
    constructor() {
        this.V = new Uint8Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.NUMBER_OF_REGISTERS);
        this.I = 0;
        // Delay timer
        this.DT = 0;
        // Sound timer
        this.ST = 0;
        // Program counter
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
        // Stack pointer
        this.SP = -1;
        this.stack = new Uint16Array(_constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEPTH);
        this.reset();
    }
    reset() {
        this.V.fill(0);
        this.I = 0;
        this.delayTimer = 0;
        this.soundTimer = 0;
        this.PC = _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__.LOAD_PROGRAM_ADDRESS;
        this.SP = -1;
        this.stack.fill(0);
    }
    stackPush(value) {
        this.SP++;
        this.assertStackOverflow();
        this.stack[this.SP] = value
    }
    stackPop() {
        const value = this.stack[this.SP];
        this.SP--;
        this.assertStackUnderflow();
        return value;
    }
    assertStackUnderflow() {
        console.assert(this.SP >= -1, 'Error: Stack underflow');
    }
    assertStackOverflow() {
        console.assert(this.SP < _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__.STACK_DEPTH, 'Error: Stack overflow');
    }
}

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SoundCard": () => (/* binding */ SoundCard)
/* harmony export */ });
/* harmony import */ var _constants_soundCardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class SoundCard {
    constructor() {
        this.soundEnabled = false;
        if("AudioContext" in window || "webkitAudioContext" in window) {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const masterGain = new GainNode(audioContext);

            masterGain.gain.value = _constants_soundCardConstants__WEBPACK_IMPORTED_MODULE_0__.INITIAL_VOLUME;
            masterGain.connect(audioContext.destination);

            let soundEnabled = false;
            let oscillator;
            Object.defineProperties(this, {
                soundEnabled: {
                    get function() {
                        return soundEnabled;
                    },
                    set: function(value) {
                        if(value === soundEnabled) {
                            return;
                        }
                        soundEnabled = value;
                        if(soundEnabled) {
                            oscillator = new OscillatorNode(audioContext, {
                                type: "square"
                            });
                            oscillator.connect(masterGain);
                            oscillator.start();
                        } else {
                            oscillator.stop();
                        }
                    }
                }
            })
        }
    }
    enableSound() {
        this.soundEnabled = true;
    }
    disableSound() {
        this.soundEnabled = false;
    }
}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INITIAL_VOLUME": () => (/* binding */ INITIAL_VOLUME)
/* harmony export */ });
const INITIAL_VOLUME = 0.3;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chip8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


async function runChip8() {
    const rom = await fetch('./roms/test_opcode');
    const arrayBuffer = await rom.arrayBuffer();
    const romBuffer = new Uint8Array(arrayBuffer);
    const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8(romBuffer);
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
})();

/******/ })()
;