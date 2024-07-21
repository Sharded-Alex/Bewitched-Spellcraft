/* jshint maxerr: 10000 */
// import {world, system, ItemStack, EntityHealthComponent, BlockVolume, BlockVolumeBase, BlockPermutation, MolangVariableMap, MoonPhase} from "@minecraft/server";

// Misc Info
let candleColor = [
  "wax_candle",
  "red_candle",
  "orange_candle",
  "yellow_candle",
  "green_candle",
  "lime_candle",
  "blue_candle",
  "light_blue_candle",
  "gray_candle",
  "light_gray_candle",
  "pink_candle",
  "magenta_candle",
  "purple_candle",
  "white_candle",
  "black_candle"
]
let validHeldItems = [
  {
    "item": "minecraft:gold_sword",
    "maxAmount": 1
  },
  {
    "item": "minecraft:golden_apple",
    "maxAmount": 32
  },
  {
    "item": "minecraft:enchanted_golden_apple",
    "maxAmount": 16
  },
  {
    "item": "minecraft:gold_ingot",
    "maxAmount": 64
  },
  {
    "item": "minecraft:gold_nugget",
    "maxAmount": 64
  }
];
let time = [
  {
    "start": 4000,
    "end": 8000
  }, // Around Noon
  {
    "start": 10000,
    "end": 14000
  }, // Dusk Hours
  {
    "start": 16000,
    "end": 20000
  }, // Around Midnight
  {
    "start": 22000,
    "end": 2000
  }, // Dawn Hours
];
let setup = () => {
  return {
    "candle": candleColor[Math.round(Math.random() * candleColor.length) - 1],
    "size": [3, 5, 7, 9][Math.round(Math.random() * 3)]
  }
};
let items = () => {
  let foundItem = validHeldItems[Math.round((validHeldItems.length - 1)* Math.random())];
  return {
    "item": foundItem.item,
    "amount": Math.round(Math.random() * foundItem.maxAmount) + 1
  };
}

// Cyphant Puzzle Mechanics

// Modular Rites of Isis

let r1 = {
  "time": time[Math.round(3 * Math.random())],
  "candleCircle": setup(),
  "heldItem": items(),
  "moonPhase": Math.round(Math.random() * 6) + 1
}

console.log(r1);
// 