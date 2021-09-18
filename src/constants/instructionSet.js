export const MASK_NNN = {mask: 0x0FFF};
export const MASK_N = {mask: 0x000F};
export const MASK_X = {mask: 0x0F00, shift: 8};
export const MASK_Y = {mask: 0x00F0, shift: 4};
export const MASK_KK = {mask: 0x00FF};
export const MASK_HIGHEST_BYTE = 0xF000;
export const MASK_HIGHEST_AND_LOWEST_BYTE = 0xF00F;

export const INSTRUCTION_SET = [
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