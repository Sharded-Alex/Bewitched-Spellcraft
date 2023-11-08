import {EntityDamageCause} from "@minecraft/server";

export const spellTagList = [
  {
    "tag": "incant:self",
    "xpReq": 1,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.entityAttack
    },
    "msg": "§gEte§r has been discovered."
  }, // Self
  {
    "tag": "incant:touch",
    "xpReq": 4,
    "condition": {
      "type": "doDamage"
    },
    "msg": "§gGel§r has been discovered."
  }, // Touch
  {
    "tag": "incant:pulse",
    "xpReq": 16,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.entityExplosion
    },
    "msg": "§gWix§r has been discovered."
  }, // Pulse
  {
    "tag": "incant:projectile",
    "xpReq": 12,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.projectile
    },
    "msg": "§gMalis§r has been discovered."
  }, // Projectile
  
  {
    "tag": "incant:damage",
    "xpReq": 5,
    "condition": {
      "type": "doDamage"
    },
    "msg": "§cHus§r has been discovered."
  }, // Damage
  {
    "tag": "incant:break",
    "xpReq": 3,
    "condition": {
      "type": "breakBlock",
      "value": "minecraft:deepslate"
    },
    "msg": "§cHuscor§r has been discovered."
  }, // Break
  {
    "tag": "incant:heal",
    "xpReq": 15,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.entityAttack
    },
    "msg": "§cHes§r has been discovered."
  }, // Heal
  
  {
    "tag": "incant:burn",
    "xpReq": 7,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.fire
    },
    "msg": "§cBis§r has been discovered."
  }, // Burn
  {
    "tag": "incant:douse",
    "xpReq": 6,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.drowning
    },
    "msg": "§cQar§r has been discovered."
  }, // Douse
  {
    "tag": "incant:frost",
    "xpReq": 17,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.freezing
    },
    "msg": "§cQarïlic§r has been discovered."
  }, // Frost
  {
    "tag": "incant:lightning",
    "xpReq": 21,
    "condition": {
      "type": "lightning"
    },
    "msg": "§cSinbashus§r has been discovered."
  }, // Lightning
  {
    "tag": "incant:explode",
    "xpReq": 25,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.blockExplosion
    },
    "msg": "§cBishuscor§r has been discovered."
  }, // Explode
  {
    "tag": "incant:launch",
    "xpReq": 13,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.entityExplosion
    },
    "msg": "§cMalbie§r has been discovered."
  }, // Launch
  {
    "tag": "incant:resistance",
    "xpReq": 24,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.magic
    },
    "msg": "§cFancul§r has been discovered."
  }, // Resistance
  
  {
    "tag": "incant:regeneration",
    "xpReq": 8,
    "condition": {
      "type": "effect",
      "value": {
        "name": "regeneration"
      }
    },
    "msg": "§cHesayic§r has been discovered."
  }, // Regeneration
  {
    "tag": "incant:inst_damage",
    "xpReq": 27,
    "condition": {
      "type": "effect",
      "value": {
        "name": "instant_damage"
      }
    },
    "msg": "§cFanhus§r has been discovered."
  }, // Instant Damage
  {
    "tag": "incant:inst_health",
    "xpReq": 28,
    "condition": {
      "type": "effect",
      "value": {
        "name": "instant_health"
      }
    },
    "msg": "§cFanhes§r has been discovered."
  }, // Instant Health
  {
    "tag": "incant:poison",
    "xpReq": 14,
    "condition": {
      "type": "effect",
      "value": {
        "name": "poison"
      }
    },
    "msg": "§cSemayiq§r has been discovered."
  }, // Poison
  {
    "tag": "incant:haste",
    "xpReq": 16,
    "condition": {
    "condition": {
      "type": "breakBlock",
      "value": "minecraft:iron_ore"
    },
    },
    "msg": "§cYinïlin§r has been discovered."
  }, // Haste
  {
    "tag": "incant:speed",
    "xpReq": 17,
    "condition": {
      "type": "effect",
      "value": {
        "name": "speed"
      }
    },
    "msg": "§cMalver§r has been discovered."
  }, // Speed
  {
    "tag": "incant:leaping",
    "xpReq": 14,
    "condition": {
      "type": "effect",
      "value": {
        "name": "jump_boost"
      }
    },
    "msg": "§cMalbiever§r has been discovered."
  }, // Jump Boost
  {
    "tag": "incant:slow_fall",
    "xpReq": 12,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.fall
    },
    "msg": "§cMalfievar§r has been discovered."
  }, // Slow Falling
  {
    "tag": "incant:hunger",
    "xpReq": 4,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.starve
    },
    "msg": "§cMalvaryiq§r has been discovered."
  }, // Hunger
  {
    "tag": "incant:fire_resistance",
    "xpReq": 17,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.lava
    },
    "msg": "§cBiscul§r has been discovered."
  }, // Fire Resistance
  {
    "tag": "incant:water_breathing",
    "xpReq": 12,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.drowning
    },
    "msg": "§cQarcul§r has been discovered."
  }, // Water Breathing
  {
    "tag": "incant:absorption",
    "xpReq": 20,
    "condition": {
      "type": "itemUse",
      "value": {
        "name": "minecraft:golden_apple"
      }
    },
    "msg": "§cCul§r has been discovered."
  }, // Absorption
  {
    "tag": "incant:blind",
    "xpReq": 19,
    "condition": {
      "type": "effect",
      "value": {
        "name": "blindness"
      }
    },
    "msg": "§cRedesi§r - Discovered Incant, §aBlind§r"
  }, // Blindness
  {
    "tag": "incant:invisible",
    "xpReq": 18,
    "condition": {
      "type": "effect",
      "value": {
        "name": "invisibility"
      }
    },
    "msg": "§cXabesi§r has been discovered."
  }, // Invisibility
  {
    "tag": "incant:night_sight",
    "xpReq": 16,
    "condition": {
      "type": "effect",
      "value": {
        "name": "night_vision"
      }
    },
    "msg": "§cEsieme§r has been discovered."
  }, // Night Vision
  {
    "tag": "incant:wither",
    "xpReq": 30,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.wither
    },
    "msg": "§cYicyiq§r - Discovered Incant, §aWither§r"
  }, // Wither
  {
    "tag": "incant:slowness",
    "xpReq": 16,
    "condition": {
      "type": "effect",
      "value": {
        "name": "slowness"
      }
    },
    "msg": "§cMalvar§r has been discovered."
  }, // Slowness
  {
    "tag": "incant:clear_effect",
    "xpReq": 11,
    "condition": {
      "type": "itemUse",
      "value": {
        "name": "minecraft:milk_bucket"
      }
    },
    "msg": "§cYinfan§r has been discovered."
  }, // Dispel Effects
];