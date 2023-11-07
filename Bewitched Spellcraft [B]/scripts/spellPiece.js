export let typeWord = [
  // SELF
  {
    "word": "ETE",
    "tag": ["incant:self"],
    "OE_cost": {
      "operation": "add",
      "number": 1
    }
  },
  // TOUCH
  {
    "word": "GEL",
    "tag": ["incant:touch"],
    "OE_cost": {
      "operation": "add",
      "number": 2
    }
  },
  // PULSE
  {
    "word": "WIX",
    "tag": ["incant:pulse"],
    "OE_cost": {
      "operation": "add",
      "number": 3
    }
  },
  // PROJECTILE
  {
    "word": "MALIS",
    "tag": ["incant:projectile"],
    "OE_cost": {
      "operation": "add",
      "number": 4
    }
  },
  // CUSTOMIZE SPELL APPEARANCE
  {
    "word": "YIS",
    "tag": ["incant:self"],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }
];

export let effectWord = [
  // Basic Effects
  {
    "word": "HUS",
    "tag": ["incant:damage"],
    "effectType": "damage",
    "value": {
      "damageType": "entity_attack",
      "damageValue": 4
    },
    "OE_cost": {
      "operation": "add",
      "number": 5
    }
  }, // Damage
  {
    "word": "HUSCOR",
    "tag": ["incant:break"],
    "effectType": "break",
    "OE_cost": {
      "operation": "add",
      "number": 3
    }
  }, // Break
  {
    "word": "HES",
    "tag": ["incant:heal"],
    "effectType": "heal",
    "value": {
      "healValue": 4
    },
    "OE_cost": {
      "operation": "add",
      "number": 8
    }
  }, // Heal
  {
    "word": "BIS",
    "tag": ["incant:burn"],
    "effectType": "burn",
    "value": {
      "damageType": "fire",
      "damageValue": 4
    },
    "OE_cost": {
      "operation": "add",
      "number": 15
    }
  }, // Burn
  {
    "word": "QAR",
    "tag": ["incant:douse"],
    "effectType": "douse",
    "value": {
      "damageType": "drowning",
      "damageValue": 2
    },
    "OE_cost": {
      "operation": "add",
      "number": 10
    }
  }, // Douse
  {
    "word": "QARÏLIC",
    "tag": ["incant:frost"],
    "effectType": "frost",
    "value": {
      "damageType": "freezing",
      "damageValue": 4
    },
    "OE_cost": {
      "operation": "add",
      "number": 18
    }
  }, // Frost
  {
    "word": "SINBASHUS",
    "tag": ["incant:lightning"],
    "effectType": "lightning",
    "OE_cost": {
      "operation": "add",
      "number": 25
    }
  }, // Lightning
  {
    "word": "BISHUSCOR",
    "tag": ["incant:explode"],
    "effectType": "explosion",
    "value": {
      "destructive": false,
      "spawnFire": false,
      "underWater": false
    },
    "OE_cost": {
      "operation": "add",
      "number": 30
    }
  }, // Explode
  {
    "word": "MALBIEVER",
    "tag": ["incant:launch"],
    "effectType": "launch",
    "value": {
      "horizontal": 2,
      "vertical": 1.5
    },
    "OE_cost": {
      "operation": "add",
      "number": 12
    }
  }, // Launch
  
  // Potion Effects
  {
    "word": "HESAYIC",
    "tag": ["incant:regeneration"],
    "effectType": "potion_effect",
    "value": {
      "effect": "regeneration",
      "duration": 10
    },
    "OE_cost": {
      "operation": "add",
      "number": 10
    }
  }, // Regeneration
  {
    "word": "FANHUS",
    "tag": ["incant:inst_damage"],
    "effectType": "potion_effect",
    "value": {
      "effect": "instant_damage",
      "duration": 1
    },
    "OE_cost": {
      "operation": "add",
      "number": 45
    }
  }, // Instant Damage
  {
    "word": "FANHES",
    "tag": ["incant:inst_health"],
    "effectType": "potion_effect",
    "value": {
      "effect": "instant_health",
      "duration": 1
    },
    "OE_cost": {
      "operation": "add",
      "number": 45
    }
  }, // Instant Healing
  {
    "word": "SEMAYIQ",
    "tag": ["incant:poison"],
    "effectType": "potion_effect",
    "value": {
      "effect": "poison",
      "duration": 10
    },
    "OE_cost": {
      "operation": "add",
      "number": 15
    }
  }, // Poison
  {
    "word": "YINÏLIC",
    "tag": ["incant:haste"],
    "effectType": "potion_effect",
    "value": {
      "effect": "haste",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 17
    }
  }, // Haste
  {
    "word": "QARCUL",
    "tag": ["incant:water_breathing"],
    "effectType": "potion_effect",
    "value": {
      "effect": "water_breathing",
      "duration": 20
    },
    "OE_cost": {
      "operation": "add",
      "number": 20
    }
  }, // Water Breathing
  {
    "word": "BISCUL",
    "tag": ["incant:fire_resistance"],
    "effectType": "potion_effect",
    "value": {
      "effect": "fire_resistance",
      "duration": 20
    },
    "OE_cost": {
      "operation": "add",
      "number": 20
    }
  }, // Fire Resistance
  {
    "word": "CUL",
    "tag": ["incant:absorption"],
    "effectType": "potion_effect",
    "value": {
      "effect": "absorption",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 30
    }
  }, // Absorption
  {
    "word": "MALVARYIQ",
    "tag": ["incant:hunger"],
    "effectType": "potion_effect",
    "value": {
      "effect": "hunger",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 15
    }
  }, // Hunger
  {
    "word": "MALVER",
    "tag": ["incant:speed"],
    "effectType": "potion_effect",
    "value": {
      "effect": "speed",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 15
    }
  }, // Speed
  {
    "word": "MALBIE",
    "tag": ["incant:leaping"],
    "effectType": "potion_effect",
    "value": {
      "effect": "jump_boost",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 12
    }
  }, // Jump Boost
  {
    "word": "MALFIEVAR",
    "tag": ["incant:slow_fall"],
    "effectType": "potion_effect",
    "value": {
      "effect": "slow_falling",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 16
    }
  }, // Slow Falling
  {
    "word": "REDESI",
    "tag": ["incant:blind"],
    "effectType": "potion_effect",
    "value": {
      "effect": "blindness",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 18
    }
  }, // Blindness
  {
    "word": "XABESI",
    "tag": ["incant:invisible"],
    "effectType": "potion_effect",
    "value": {
      "effect": "invisibility",
      "duration": 15
    },
    "OE_cost": {
      "operation": "add",
      "number": 14
    }
  }, // Invisibility
  {
    "word": "ESIEME",
    "tag": ["incant:night_sight"],
    "effectType": "potion_effect",
    "value": {
      "effect": "night_vision",
      "duration": 20
    },
    "OE_cost": {
      "operation": "add",
      "number": 23
    }
  }, // Night Vision
  {
    "word": "YICYIQ",
    "tag": ["incant:wither"],
    "effectType": "potion_effect",
    "value": {
      "effect": "wither",
      "duration": 10
    },
    "OE_cost": {
      "operation": "add",
      "number": 38
    }
  }, // Wither
  {
    "word": "MALVAR",
    "tag": ["incant:slowness"],
    "effectType": "potion_effect",
    "value": {
      "effect": "slowness",
      "duration": 20
    },
    "OE_cost": {
      "operation": "add",
      "number": 16
    }
  }, // Slowness
  {
    "word": "YINFAN",
    "tag": ["incant:clear_effect"],
    "effectType": "potion_effect",
    "value": {
      "effect": "clear"
    },
    "OE_cost": {
      "operation": "add",
      "number": 10
    }
  }, // Dispel Effects
  
  // Particle Effects
  {
    "word": "WISPUS",
    "tag": ["incant:self"],
    "effectType": "particles",
    "value": {
      "particleName": "bw:wispy_particle_"
    },
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Wispy
  {
    "word": "SPARKIS",
    "tag": ["incant:self"],
    "effectType": "particles",
    "value": {
      "particleName": "bw:sparkly_particle_"
    },
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }  // Sparky
];

export let modifierWord = [
  {
    "word": "HET",
    "required": {
      "item": "none",
      "consumed": false
    },
    "valid": ["HUS", "HES", "SINBASHUS", "BISHUSCOR", "MALBIE", "BIS", "QAR", "QARÏLIC", "HUSCOR", "HESAYIC", "FANHUS", "FANHES", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "YICYIQ", "MALVAR", "YINFAN", "WISPUS", "SPARKIS"],
    "modifierType": "null",
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // No Modifier
  
  {
    "word": "TUL",
    "required": {
      "item": "minecraft:iron_ingot",
      "consumed": true
    },
    "valid": ["HUS", "HES", "BISHUSCOR", "MALBIE", "BIS", "QAR", "QARÏLIC", "HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "FANHUS", "FANHES", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "ESIEME", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "power",
    "value": 1,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.25
    }
  }, // Power I
  {
    "word": "TULVER",
    "required": {
      "item": "minecraft:diamond",
      "consumed": true
    },
    "valid": ["BISHUSCOR", "MALBIE", "BIS", "QAR", "QARÏLIC", "HESAYIC", "FANHUS", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "FANHES", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "ESIEME", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "power",
    "value": 2,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Power II
  
  {
    "word": "TIC",
    "required": {
      "item": "minecraft:double_plant",
      "consumed": true
    },
    "valid": ["HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIE", "MALFIEVAR", "REDESI", "XABESI", "ESIEME", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "duration",
    "value": 2,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.25
    }
  }, // Duration I
  {
    "word": "TICVER",
    "required": {
      "item": "minecraft:clock",
      "consumed": false
    },
    "valid": ["HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIE", "MALFIEVAR", "REDESI", "XABESI", "ESIEME", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "duration",
    "value": 3,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Duration II
  
  {
    "word": "PAL",
    "required": {
      "item": "minecraft:gunpowder",
      "consumed": true
    },
    "valid": ["HUS", "HES", "BISHUSCOR", "MALBIE", "BIS", "QAR", "QARÏLIC", "HUSCOR", "HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "FANHUS", "FANHES", "SINBASHUS", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "radius",
    "value": 2,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.25
    }
  }, // Radius I
  {
    "word": "PALVER",
    "required": {
      "item": "minecraft:web",
      "consumed": true
    },
    "valid": ["HUS", "HES", "BISHUSCOR", "MALBIE", "HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "BIS", "QAR", "QARÏLIC", "FANHUS", "FANHES", "SINBASHUS", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "radius",
    "value": 3,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Radius II
  {
    "word": "PALVEREME",
    "required": {
      "item": "minecraft:dragon_breath",
      "consumed": true
    },
    "valid": ["HUS", "HES", "BISHUSCOR", "MALBIE", "HESAYIC", "BISCUL", "QARCUL", "CUL", "MALVARYIQ", "BIS", "QAR", "QARÏLIC", "FANHUS", "FANHES", "SINBASHUS", "SEMAYIQ", "YINÏLIC", "MALVER", "MALBIEVER", "MALFIEVAR", "REDESI", "XABESI", "YICYIQ", "MALVAR", "YINFAN"],
    "modifierType": "radius",
    "value": 4,
    "OE_cost": {
      "operation": "multiply",
      "number": 1.75
    }
  }, // Radius III
  
  {
    "word": "FILFIE",
    "required": {
      "item": "minecraft:copper_ingot",
      "consumed": true
    },
    "valid": ["BIS", "QAR", "QARÏLIC", "HUSCOR"],
    "modifierType": "axis",
    "value": "vertical",
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Verticality
  {
    "word": "FILCIE",
    "required": {
      "item": "minecraft:copper_ingot",
      "consumed": true
    },
    "valid": ["BIS", "QAR", "QARÏLIC", "HUSCOR"],
    "modifierType": "axis",
    "value": "horizontal",
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Horizontality
  
  {
    "word": "XAB",
    "required": {
      "item": "minecraft:fermented_spider_eye",
      "consumed": true
    },
    "valid": ["MALBIEVER"],
    "modifierType": "reverse",
    "OE_cost": {
      "operation": "multiply",
      "number": 1.25
    }
  }, // Reverse
  
  {
    "word": "BISHUS",
    "required": {
      "item": "minecraft:tnt",
      "consumed": true
    },
    "valid": ["BISHUSCOR"],
    "modifierType": "explosion",
    "value": "fireDamage",
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Explosion: Do Fire Damage
  {
    "word": "QARHUS",
    "required": {
      "item": "minecraft:prismarine_shard",
      "consumed": true
    },
    "valid": ["BISHUSCOR"],
    "modifierType": "explosion",
    "value": "waterDamage",
    "OE_cost": {
      "operation": "multiply",
      "number": 1.5
    }
  }, // Explosion: Ignore Water
  
  // COLORS
  {
    "word": "WHITE",
    "required": {
      "item": "minecraft:white_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.976, 1.0, 0.996],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // White
  {
    "word": "BLACK",
    "required": {
      "item": "minecraft:black_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.114, 0.114, 0.129],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Black
  {
    "word": "L_GRAY",
    "required": {
      "item": "minecraft:light_gray_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.616, 0.616, 0.592],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Light Gray
  {
    "word": "GRAY",
    "required": {
      "item": "minecraft:gray_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.278, 0.31, 0.322],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Gray
  {
    "word": "BROWN",
    "required": {
      "item": "minecraft:brown_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.514, 0.329, 0.196],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Brown
  {
    "word": "RED",
    "required": {
      "item": "minecraft:red_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.69, 0.18, 0.149],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Red
  {
    "word": "ORANGE",
    "required": {
      "item": "minecraft:orange_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.976, 0.502, 0.114],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Orange
  {
    "word": "YELLOW",
    "required": {
      "item": "minecraft:yellow_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.996, 0.847, 0.239],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Yellow
  {
    "word": "LIME",
    "required": {
      "item": "minecraft:lime_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.502, 0.78, 0.122],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Lime
  {
    "word": "GREEN",
    "required": {
      "item": "minecraft:green_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.396, 0.486, 0.086],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Green
  {
    "word": "CYAN",
    "required": {
      "item": "minecraft:cyan_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.086, 0.612, 0.612],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Cyan
  {
    "word": "L_BLUE",
    "required": {
      "item": "minecraft:light_blue_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.227, 0.702, 0.855],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Light Blue
  {
    "word": "BLUE",
    "required": {
      "item": "minecraft:blue_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.235, 0.267, 0.667],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Blue
  {
    "word": "PURPLE",
    "required": {
      "item": "minecraft:purple_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.537, 0.196, 0.722],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Purple
  {
    "word": "MAGENTA",
    "required": {
      "item": "minecraft:magenta_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.78, 0.306, 0.741],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  }, // Magenta
  {
    "word": "PINK",
    "required": {
      "item": "minecraft:pink_dye",
      "consumed": true
    },
    "valid": ["WISPUS", "SPARKIS"],
    "modifierType": "color",
    "value": [0.953, 0.545, 0.667],
    "OE_cost": {
      "operation": "multiply",
      "number": 1
    }
  } // Pink
];