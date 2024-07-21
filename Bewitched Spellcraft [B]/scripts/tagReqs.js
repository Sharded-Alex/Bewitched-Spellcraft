import {EntityDamageCause} from "@minecraft/server";

export const spellTagList = [
  {
    "tag": "entry:arcanaBasics",
    "xpReq": 1,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.entityAttack
    },
    "msg": "I see! That was the answer! As this wound opens me, my §deyes§r open as well! I have now stepped onto the path of Arcanism and can call myself a §aMagus§r."
  }, // The Beginning
  
  {
    "tag": "incant:regeneration",
    "xpReq": 6,
    "condition": {
      "type": "effect",
      "value": {
        "name": "regeneration"
      }
    },
    "msg": "I feel energized and healthier than before. I could get used to this...\n§aI have unlocked §d[Hesayic]§a!§r"
  }, // Regeneration Task
  {
    "tag": "incant:levitation",
    "xpReq": 2,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.fall
    },
    "msg": "It is a peculiar sensation, the feeling of falling. From high enough, I might as well be suspended in the air. Perhaps that can truly become the case.\n§aI have unlocked §d[Malbascor]§a!§r"
  }, // Levitation Task
  {
    "tag": "incant:slow_falling",
    "xpReq": 2,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.fall
    },
    "msg": "I have hit the ground and that feeling of floating has now disappeared. I am hurt, but I have understood what I must to prevent it in the future.\n§aI have unlocked §d[Malfievar]§a!§r"
  }, // Slow Falling Task
  {
    "tag": "incant:hunger",
    "xpReq": 5,
    "condition": {
      "type": "itemUse",
      "value": {
        "name": "minecraft:rotten_flesh"
      }
    },
    "msg": "Whatever gave me the idea to consume such an awful thing needs to be banned from giving ideas. However, underneath the hot, tangy taste, a strange hunger lies waiting...\n§aI have unlocked §d[Malvaryiq]§a!§r"
  }, // Hunger Task
  {
    "tag": "incant:poison",
    "xpReq": 8,
    "condition": {
      "type": "itemUse",
      "value": {
        "name": "minecraft:spider_eye"
      }
    },
    "msg": "I'm truly getting tired of consuming these grotesque items. I'm sure this will get me poisoned in some way... but perhaps that is what I want.\n§aI have unlocked §d[Semayiq]§a!§r"
  }, // Poison Task
  {
    "tag": "incant:nausea",
    "xpReq": 8,
    "condition": {
      "type": "itemUse",
      "value": {
        "name": "minecraft:suspicious_stew"
      }
    },
    "msg": "A suspicious stew with an even more suspicious taste. Perhaps I could learn from this.\n§aI have unlocked §d[Abracadabra]§a!§r"
  }, // Nausea Task
  {
    "tag": "incant:invisibility",
    "xpReq": 4,
    "condition": {
      "type": "effect",
      "value": {
        "name": "invisibility"
      }
    },
    "msg": "This is such a strange and wonderous effect. I am glad I was able to see it, or rather, §onot§r see it.\n§aI have unlocked §d[Xabesi]§a!§r"
  }, // Invisibility Task
  {
    "tag": "incant:wither",
    "xpReq": 15,
    "condition": {
      "type": "killEntity",
      "value": "minecraft:wither_skeleton"
    },
    "msg": "I feel enlightened after defeating this withered pile of bones. Their power shall now become a necessary addition to my power.\n§aI have unlocked §d[Yixyiq]§a!§r"
  }, // Wither Task
  
  {
    "tag": "incant:burn",
    "xpReq": 5,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.fire
    },
    "msg": "I am like wood under the influence of fire, but although I burn, I also learn.\n§aI have unlocked §d[Bis]§a!§r"
  }, // Fire Task
  {
    "tag": "incant:ballOfFire",
    "xpReq": 4,
    "condition": {
      "type": "killEntity",
      "value": "minecraft:blaze"
    },
    "msg": "I cast FIRE CHARGE! Gods Above, I've always wanted to say that-\n§aI have unlocked §d[Malbizon]§a!§r"
  }, // Fire Charge Task
  {
    "tag": "incant:wet",
    "xpReq": 5,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.drowning
    },
    "msg": "I am submerged below water, and as I drown and drift to a space where it calls to me, I come to understand the essence of its conjuration.\n§aI have unlocked §d[Qar]§a!§r"
  }, // Water Task
  {
    "tag": "incant:frost",
    "xpReq": 5,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.freezing
    },
    "msg": "I am beneath yet another power; frost. It creeps against my form, freezing me slowly, §okilling§r me slowly...\n§aI have unlocked §d[Qarilic]§a!§r"
  }, // Frost Task
  {
    "tag": "incant:lightning",
    "xpReq": 9,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.lightning
    },
    "msg": "The storm rages above, and below, I glean the power of lightning.\n§aI have unlocked §d[Sinbashus]§a!§r"
  }, // Lightning Task
  {
    "tag": "incant:explode",
    "xpReq": 20,
    "condition": {
      "type": "getDamage",
      "value": EntityDamageCause.blockExplosion
    },
    "msg": "I have been shaken by the force of this blast, but like all my escapades with powerful forces, I learn.\n§aI have unlocked §d[Bishuscor]§a!§r"
  }, // Explode Task
];