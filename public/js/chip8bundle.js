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
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _Disassembler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _Memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _Registers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _SoundCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(11);










class Chip8 {
    constructor() {
        console.log("Create a new chip8");
        this.memory = new _Memory__WEBPACK_IMPORTED_MODULE_6__.Memory();
        this.loadCharSet()

        this.registers = new _Registers__WEBPACK_IMPORTED_MODULE_7__.Registers();
        this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_5__.Keyboard();
        this.soundCard = new _SoundCard__WEBPACK_IMPORTED_MODULE_8__.SoundCard();
        this.disassembler = new _Disassembler__WEBPACK_IMPORTED_MODULE_3__.Disassembler();
        this.display = new _Display__WEBPACK_IMPORTED_MODULE_4__.Display(this.memory);
    }
    sleep(ms = _constants_registersConstants__WEBPACK_IMPORTED_MODULE_2__.TIMER_60_HZ) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    loadCharSet() {
        this.memory.memory.set(_constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET, _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_1__.CHAR_SET_ADDRESS);
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
/* harmony export */   "Display": () => (/* binding */ Display)
/* harmony export */ });
/* harmony import */ var _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



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
    }
    drawBuffer() {
        for(let h = 0; h < _constants_displayConstants__WEBPACK_IMPORTED_MODULE_1__.DISPLAY_HEIGHT; h++) {
            this.frameBuffer.push([]);
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
        for(let lh = 0; lh < num; lh++) {
            const line = this.memory.memory[spriteAddress+lh];
            for(let lw = 0; lw < _constants_charSetConstants__WEBPACK_IMPORTED_MODULE_0__.CHAR_SET_WIDTH; lw++) {
                // Dislocate to the right.
                const bitToCheck = (0b10000000 >> lw);
                const value = line & bitToCheck;
                this.drawPixel(h+lh, w+lw, value);
            }
        }
    }
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DISPLAY_WIDTH": () => (/* binding */ DISPLAY_WIDTH),
/* harmony export */   "DISPLAY_HEIGHT": () => (/* binding */ DISPLAY_HEIGHT),
/* harmony export */   "DISPLAY_MULTIPLIER": () => (/* binding */ DISPLAY_MULTIPLIER),
/* harmony export */   "BG_COLOR": () => (/* binding */ BG_COLOR),
/* harmony export */   "COLOR": () => (/* binding */ COLOR)
/* harmony export */ });
const DISPLAY_WIDTH = 64;
const DISPLAY_HEIGHT = 32;
const DISPLAY_MULTIPLIER = 10;
const BG_COLOR = '#000';
const COLOR = '#3f6';

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _constants_keyboardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


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
        // "Is any key down?"
        return this.keys.findIndex((key) => key) != -1;
    }
}

/***/ }),
/* 7 */
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
/* 8 */
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
}

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Registers": () => (/* binding */ Registers)
/* harmony export */ });
/* harmony import */ var _constants_memoryConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _constants_registersConstants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



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
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SoundCard": () => (/* binding */ SoundCard)
/* harmony export */ });
/* harmony import */ var _constants_soundCardConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


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
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INITIAL_VOLUME": () => (/* binding */ INITIAL_VOLUME)
/* harmony export */ });
const INITIAL_VOLUME = 0.3;

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Disassembler": () => (/* binding */ Disassembler)
/* harmony export */ });
/* harmony import */ var _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class Disassembler {
    disassemble(opcode) {
        const instruction = _constants_instructionSet__WEBPACK_IMPORTED_MODULE_0__.INSTRUCTION_SET.find(
            instruction => (opcode & instruction.mask) === instruction.pattern
        );
        console.log('instruction', instruction);
    }
}

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INSTRUCTION_SET": () => (/* binding */ INSTRUCTION_SET)
/* harmony export */ });
const INSTRUCTION_SET = [
    {
        key: 1,
        id: 'CLS',
        name: 'CLS',
        mask: 0xFFFF,
        pattern: 0x00E0
    }
]

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


const chip8 = new _Chip8__WEBPACK_IMPORTED_MODULE_0__.Chip8();

async function runChip8() {
    chip8.disassembler.disassemble(0x00E0);
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