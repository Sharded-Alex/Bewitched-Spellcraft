export const information = {
  "unknown": {
    "title": "Esi Xabesi",
    "body": "§4Ete mal fil AS bis. Rerezil tev yic bie & fie. Ete coläs leni. Lenum coläs leni. Leni tev rerezil. Leni tev FAN!§r\n\n§oYou cannot discern the contents of this page just yet.§r\n\n",
    "buttons": [
      {
        "buttonName": "Cancel",
        "buttonIcon": "",
        "onClick": {
          "open_form": false
        }
      }
    ]
  },
  "spell_guide": {
    "title": "Bewitched Spellcraft",
    "body": "The world of Minecraft is already filled with mystical and arcane things. Bewitched Spellcraft is simply one of them.\n\nWithin this book, you'll learn the basics of spellcrafting and then, it is up to you to piece together the Incants you've discovered into your own spells!\n\n",
    "buttons": [
      {
        "buttonName": "Arcane Basics",
        "buttonIcon": "textures/items/spell_tools/clay_spellrune",
        "onClick": {
          "open_form": true,
          "value": "spell_fundamentals"
        }
      },
      {
        "buttonName": "Known Incants",
        "buttonIcon": "textures/items/book_enchanted",
        "onClick": {
          "open_form": true,
          "value": "incant_general"
        }
      }
    ]
  },
  
  "spell_fundamentals": {
    "title": "Arcane Basics",
    "body": "Spellcraft is not meant to be an easy path to follow. Knowledge is power, but only the most curious can excel. That aside, there are a few things to keep in mind when formulating spells. This chapter's aim is to give insight into these things.\n\n",
    "buttons": [
      {
        "buttonName": "Spell Tools",
        "buttonIcon": "textures/items/spell_tools/clay_spellrune",
        "onClick": {
          "open_form": true,
          "value": "basics.spell_tools"
        }
      },
      {
        "buttonName": "About Incants",
        "buttonIcon": "textures/items/paper",
        "onClick": {
          "open_form": true,
          "value": "basics.creation"
        }
      },
      {
        "buttonName": "Arcane Costs",
        "buttonIcon": "textures/items/experience_bottle",
        "onClick": {
          "open_form": true,
          "value": "basics.cost"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "spell_guide"
        }
      }
    ]
  },
  
  "basics.spell_tools": {
    "title": "Spell Tools",
    "body": "These are the tools used to actually perform spells. Thankfully, they aren't difficult to craft or make use of. Most are expirable though, so keep that in mind.\n\nPS: Any tool (spellrune and spell journal alike) that actually holds a spell §lMUST§r be named for it to work.\n\n",
    "buttons": [
      {
        "buttonName": "Spell Runes",
        "buttonIcon": "textures/items/spell_tools/baked_spellrune",
        "onClick": {
          "open_form": true,
          "value": "tools.rune"
        }
      },
      {
        "buttonName": "Wands",
        "buttonIcon": "textures/items/spell_tools/emerald_wand",
        "onClick": {
          "open_form": true,
          "value": "tools.wand"
        }
      },
      {
        "buttonName": "Spell Journals",
        "buttonIcon": "textures/items/spell_tools/empty_spellbook",
        "onClick": {
          "open_form": true,
          "value": "tools.spellbook"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "spell_fundamentals"
        }
      }
    ]
  },
  "basics.creation": {
    "title": "About Incants",
    "body": "The making of spells is a simple process, as it is mostly a combination of words called §dIncants§r. These words are apart of a magical language (quite obvious at this point to be honest) and represent concepts. It is rumoured that the ancient inhabitants were true masters of magic, and with the existence of Incants, it is not hard to believe it could be true.\n\nIncants are not discovered within books, however. They are gleaned through experiences. Falling off a cliff, drowning beneath the depths, drinking milk; these are all experiences that could give birth to the discovery of an Incant. The one thing they have in common though, is that they each require unknown amounts of §axp§r to let themselves be known.\n\nWhy are the §axp requirements§r for each Incant unknown, you might ask? It is because sorcerers have traditionally been known for being secretive. This is a journey within itself, and it is simply your turn to walk it.\n\nA list of the Incants you have discovered is in this book under the Incants chapter. After all, this §ois§r a magical book.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "spell_fundamentals"
        }
      }
    ]
  },
  "basics.syntax_runes": {
    "title": "Arcane Syntax",
    "body": "Spellcraft is simple, if you understand its syntax. There are three types of Incants.\n\n§lForms§r\nThese refer to the shape the spell will take, and by extension defines who/what the targets of a spell are.\n\n§lActions§r\nThese refer to the effect that takes place after the correct target is acquired.\n\n§lModifiers§r\nThese refer to the words that modify Actions (and sometimes Forms). These incants are listed in this book and §lalways§r need an item component.\n\nMoving along, we will look at the actual syntax and imbuement of a spell. A simple spell is §dwritten as shown below in the chat, while holding either an §gempty spell journal§d, or §gbaked runestones§d.§r\n\n§2:FORM ACTION MODIFIER MODIFIER§r\nThe ':' is necessary and ensure that there are no extra spaces between words.\n\nWhen a Form or Action Incant is discovered, it will also tell what Modifier Incant affects it.\n\nComplex spells are seperated by an 'et'. This can be done multiple times up to a point.\n\n§2:FORM ACTION MODIFIER MODIFIER §gET§2 FORM ACTION MODIFIER MODIFIER§r\n\nIt should be noted that most Modifiers require items to be a valid addition to a spell. Simply keep the required item in the hotbar and the Incant will recognize it.\n\nAnother tip to keep in mind is that Modifiers can make spells expensive in terms of cost.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "tools.rune"
        }
      }
    ]
  },
  "basics.syntax_spellbook": {
    "title": "Arcane Syntax",
    "body": "Spellcraft is simple, if you understand its syntax. There are three types of Incants.\n\n§lForms§r\nThese refer to the shape the spell will take, and by extension defines who/what the targets of a spell are.\n\n§lActions§r\nThese refer to the effect that takes place after the correct target is acquired.\n\n§lModifiers§r\nThese refer to the words that modify Actions (and sometimes Forms). These incants are listed in this book and §lalways§r need an item component.\n\nMoving along, we will look at the actual syntax and imbuement of a spell. A simple spell is §dwritten as shown below in the chat, while holding either an §gempty spell journal§d, or §gbaked runestones§d.§r\n\n§2:FORM ACTION MODIFIER MODIFIER§r\nThe ':' is necessary and ensure that there are no extra spaces between words.\n\nWhen a Form or Action Incant is discovered, it will also tell what Modifier Incant affects it.\n\nComplex spells are seperated by an 'et'. This can be done multiple times up to a point.\n\n§2:FORM ACTION MODIFIER MODIFIER §gET§2 FORM ACTION MODIFIER MODIFIER§r\n\nIt should be noted that most Modifiers require items to be a valid addition to a spell. Simply keep the required item in the hotbar and the Incant will recognize it.\n\nAnother tip to keep in mind is that Modifiers can make spells expensive in terms of cost.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "tools.spellbook"
        }
      }
    ]
  },
  "basics.cost": {
    "title": "Arcane Costs",
    "body": "There are a few costs that come with spellcraft. Firstly, there is the imbuement cost. This is a calculation of how much §axp points§r (not levels) are required to imbue a valid spell tool with a spell. All the Incants in the spell contribute to this calculation; Forms and Actions add while Modifiers multiply. The writer's current §axp level§r is also taken into account, as well as the amount of items being imbued (in the case of spellrunes).\n\nLastly, there is spell cost, which is generally only found in spell journals. This is a calculation of all Incants to discern how much durability the spell consumes from a wand.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "spell_fundamentals"
        }
      }
    ]
  },
  
  "tools.rune": {
    "title": "Spell Runes",
    "body": "Runestones are small rock like items crafted from §dclay§r. In their clay form, they are useless, but this can be fixed by cooking them. This will create a §dBaked Runestone§r.\n\nBaked Runestones can be inscribed with any spell (within the spell writer's ability) to be released at a later time. This destroys the runestone, but they are stackable and can be inscribed in bulk. The §axp§r required to create them is multiplied by the amount of spellrunes being inscribed however, so keep that in mind.\n\n",
    "buttons": [
      {
        "buttonName": "Arcane Syntax",
        "buttonIcon": "textures/items/book_written",
        "onClick": {
          "open_form": true,
          "value": "basics.syntax_runes"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "basics.spell_tools"
        }
      }
    ]
  },
  "tools.wand": {
    "title": "Wands",
    "body": "These are the true symbols of a spellcaster. Wands are craftable items made from leather, gold and some precious gem. They are used as a power source for spells, and allow for the casting of spell journals.\n\nWands are not indestructible and they will break over time. However, a useful thing to note is that §otheir durability goes down based on a spell journal's spell cost§r. So different tiers of wands can be used to perform different levels of spells efficiently.\n\nIn order from the weakest to the strongest, there are the Emerald, Diamond, and Amethyst Wands. Each is a bit more powerful than its predecessor.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "basics.spell_tools"
        }
      }
    ]
  },
  "tools.spellbook": {
    "title": "Spell Journals",
    "body": "Spell Journals are the most common method of documenting spells. They are imbued with spells and are similar to spell runes, but they require a wand to be performed. This is done by having the journal in the offhand with the wand in the mainhand. Like spell runes, spell journals are named on creation, after which they can be cast normally.\n\nEvery spell journal has a spell cost, even if the spell bound to it is syntactically incorrect. This can be seen by using the spellbook itself. It is wise to use this feature to classify the power of your own spells after looking at their effects.\n\n",
    "buttons": [
      {
        "buttonName": "Arcane Syntax",
        "buttonIcon": "textures/items/book_written",
        "onClick": {
          "open_form": true,
          "value": "basics.syntax_spellbook"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "basics.spell_tools"
        }
      }
    ]
  },
  
  "incant_general": {
    "title": "Known Incants",
    "body": "Incants can be difficult to keep track of, so here is a self updating list of the incants you've discovered! Modifiers are automatically added, as they are not unlocked like the rest.\n\n",
    "buttons": [
      {
        "buttonName": "Forms",
        "buttonIcon": "textures/items/experience_bottle",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      },
      {
        "buttonName": "Actions",
        "buttonIcon": "textures/items/experience_bottle",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      },
      {
        "buttonName": "Modifiers",
        "buttonIcon": "textures/items/experience_bottle",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "spell_guide"
        }
      }
    ]
  },
  
  "inc.forms": {
    "title": "Form Incants",
    "body": "\n\n",
    "buttons": [
      {
        "buttonName": "Ete",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:self"],
        "onClick": {
          "open_form": true,
          "value": "form.self"
        }
      },
      {
        "buttonName": "Gel",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:touch"],
        "onClick": {
          "open_form": true,
          "value": "form.touch"
        }
      },
      {
        "buttonName": "Wix",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:pulse"],
        "onClick": {
          "open_form": true,
          "value": "form.pulse"
        }
      },
      {
        "buttonName": "Malis",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:projectile"],
        "onClick": {
          "open_form": true,
          "value": "form.projectile"
        }
      },
      {
        "buttonName": "Yis",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:self"],
        "onClick": {
          "open_form": true,
          "value": "form.customize"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "incant_general"
        }
      }
    ]
  },
  "inc.actions": {
    "title": "Action Incants",
    "body": "\n\n",
    "buttons": [
      {
        "buttonName": "Wispus",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:self"],
        "onClick": {
          "open_form": true,
          "value": "action.potion"
        }
      },
      {
        "buttonName": "Sparkis",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:self"],
        "onClick": {
          "open_form": true,
          "value": "action.firework"
        }
      },
      
      {
        "buttonName": "Hus",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:damage"],
        "onClick": {
          "open_form": true,
          "value": "action.damage"
        }
      },
      {
        "buttonName": "Huscor",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:break"],
        "onClick": {
          "open_form": true,
          "value": "action.break"
        }
      },
      {
        "buttonName": "Hes",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:heal"],
        "onClick": {
          "open_form": true,
          "value": "action.heal"
        }
      },
      {
        "buttonName": "Cul",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:absorption"],
        "onClick": {
          "open_form": true,
          "value": "action.absorption"
        }
      },
      {
        "buttonName": "Bis",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:burn"],
        "onClick": {
          "open_form": true,
          "value": "action.burn"
        }
      },
      {
        "buttonName": "Biscul",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:fire_resistance"],
        "onClick": {
          "open_form": true,
          "value": "action.resist_fire"
        }
      },
      {
        "buttonName": "Qar",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:douse"],
        "onClick": {
          "open_form": true,
          "value": "action.douse"
        }
      },
      {
        "buttonName": "Qarcul",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:water_breathing"],
        "onClick": {
          "open_form": true,
          "value": "action.water_breath"
        }
      },
      {
        "buttonName": "Qarïlic",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:frost"],
        "onClick": {
          "open_form": true,
          "value": "action.frost"
        }
      },
      {
        "buttonName": "Sinbashus",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:lightning"],
        "onClick": {
          "open_form": true,
          "value": "action.lightning"
        }
      },
      {
        "buttonName": "Bishuscor",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:explode"],
        "onClick": {
          "open_form": true,
          "value": "action.explode"
        }
      },
      {
        "buttonName": "Malbiever",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:launch"],
        "onClick": {
          "open_form": true,
          "value": "action.launch"
        }
      },
      
      {
        "buttonName": "Hesayic",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:regeneration"],
        "onClick": {
          "open_form": true,
          "value": "action.regeneration"
        }
      },
      {
        "buttonName": "Semayic",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:poison"],
        "onClick": {
          "open_form": true,
          "value": "action.poison"
        }
      },
      {
        "buttonName": "Malvaryiq",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:hunger"],
        "onClick": {
          "open_form": true,
          "value": "action.hunger"
        }
      },
      {
        "buttonName": "Yinïlic",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:haste"],
        "onClick": {
          "open_form": true,
          "value": "action.haste"
        }
      },
      {
        "buttonName": "Malver",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:speed"],
        "onClick": {
          "open_form": true,
          "value": "action.speed"
        }
      },
      {
        "buttonName": "Malbie",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:leaping"],
        "onClick": {
          "open_form": true,
          "value": "action.jump_boost"
        }
      },
      {
        "buttonName": "Malfievar",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:slow_fall"],
        "onClick": {
          "open_form": true,
          "value": "action.slow_falling"
        }
      },
      {
        "buttonName": "Redesi",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:blind"],
        "onClick": {
          "open_form": true,
          "value": "action.blindness"
        }
      },
      {
        "buttonName": "Xabesi",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:invisible"],
        "onClick": {
          "open_form": true,
          "value": "action.invisibility"
        }
      },
      {
        "buttonName": "Esieme",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:night_sight"],
        "onClick": {
          "open_form": true,
          "value": "action.night_vision"
        }
      },
      {
        "buttonName": "Yicyiq",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:wither"],
        "onClick": {
          "open_form": true,
          "value": "action.wither"
        }
      },
      {
        "buttonName": "Malvar",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:slowness"],
        "onClick": {
          "open_form": true,
          "value": "action.slowness"
        }
      },
      {
        "buttonName": "Fanhus",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:inst_damage"],
        "onClick": {
          "open_form": true,
          "value": "action.instant_damage"
        }
      },
      {
        "buttonName": "Fanhus",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:inst_health"],
        "onClick": {
          "open_form": true,
          "value": "action.instant_heal"
        }
      },
      {
        "buttonName": "Yinfan",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:clear_effect"],
        "onClick": {
          "open_form": true,
          "value": "action.clear_effects"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "incant_general"
        }
      }
    ]
  },
  "inc.modifiers": {
    "title": "Modifiers Incants",
    "body": "\n\n",
    "buttons": [
      {
        "buttonName": "Null Modifier",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.null"
        }
      },
      {
        "buttonName": "Power Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.power"
        }
      },
      {
        "buttonName": "Duration Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.duration"
        }
      },
      {
        "buttonName": "Radius Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.radius"
        }
      },
      {
        "buttonName": "Axis Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.axis"
        }
      },
      {
        "buttonName": "Explosion Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:explode"],
        "onClick": {
          "open_form": true,
          "value": "modifier.explosion"
        }
      },
      {
        "buttonName": "Reverse Modifier",
        "buttonIcon": "textures/items/book_normal",
        "buttonTagRequirements": ["incant:launch"],
        "onClick": {
          "open_form": true,
          "value": "modifier.reverse"
        }
      },
      {
        "buttonName": "Color Modifiers",
        "buttonIcon": "textures/items/book_normal",
        "onClick": {
          "open_form": true,
          "value": "modifier.colors"
        }
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "incant_general"
        }
      }
    ]
  },
  
  "form.self": {
    "title": "Ete",
    "body": "Concept: Self\n\nEffect: This incant applies the Action to the caster.\n\nModifiers: None",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      }
    ]
  },
  "form.touch": {
    "title": "Gel",
    "body": "Concept: Touch\n\nEffect: This incant tries to apply the Action to the entity/block hit by the caster.\n\nModifiers: None",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      }
    ]
  },
  "form.pulse": {
    "title": "Wix",
    "body": "Concept: Wave/Ripple\n\nEffect: This incant applies the Action to the mobs around the caster in a range. It does not affect the caster themselves.\n\nModifiers: Pal, Palver, Palvereme",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      }
    ]
  },
  "form.projectile": {
    "title": "Malis",
    "body": "Concept: Projectile\n\nEffect: This incant applies the Action to a Projectile and fires it at the target.\n\nModifiers: None",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      }
    ]
  },
  "form.customize": {
    "title": "Yis",
    "body": "Concept: Customize*\n\nEffect: This incant applies a particle based Action to the spell of the caster. It does not work with projectiles though sadly.\n\nModifiers: Color Based Incants\n\n* This Form has a specific syntax => :YIS [ACTION] [MODIFIER] HET\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.forms"
        }
      }
    ]
  },
  
  "action.damage": {
    "title": "Hus",
    "body": "Concept: Damage\n\nEffect: This incant applies a default of 4 damage to the target specified by the Form.\n\nModifiers: Tul\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.break": {
    "title": "Huscor",
    "body": "Concept: Break Block\n\nEffect: This incant ONLY works with Gel and Malis. It breaks the targeted block as if broken with an unenchanted pickaxe, hoe, shovel, etc.\n\nModifiers: Pal, Filfie, Filcie\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.heal": {
    "title": "Hes",
    "body": "Concept: Heal\n\nEffect: This incant heals a default of 4 health for the target specified by the Form.\n\nModifiers: Tul\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.burn": {
    "title": "Bis",
    "body": "Concept: Fire/Burn\n\nEffect: This incant does 4 fire damage to the target specified by the Form, as well as set them on fire. It has been known to clash with Qar and Qarïfic.\n\nModifiers: Tul, Tulver, Pal, Palver, Palvereme, Filfie, Filcie\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.douse": {
    "title": "Qar",
    "body": "Concept: Water/Douse\n\nEffect: This incant does 2 drowning damage to the target specified by the Form, as well as extinguishes any fire on them. It has been known to clash with Bis.\n\nModifiers: Tul, Tulver, Pal, Palver, Palvereme, Filfie, Filcie\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.frost": {
    "title": "Qarïlic",
    "body": "Concept: Frost\n\nEffect: This incant applies a default of 4 freezing damage to the target specified by the Form. It also has special interactions with Touch and Projectile.\n\nModifiers: Tul, Tulver, Pal, Palver, Palvereme, Filfie, Filcie\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.lightning": {
    "title": "Sinbashus",
    "body": "Concept: Lightning\n\nEffect: This incant strikes the target/block specified by the Form with lightning.\n\nModifiers: None\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.explode": {
    "title": "Bishuscor",
    "body": "Concept: Explode\n\nEffect: This incant causes an explosion at the target/block specified by the Form.\n\nModifiers: Tul, Tulver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.launch": {
    "title": "Malbiever",
    "body": "Concept: Launch\n\nEffect: This incant blasts the target specified by the Form away.\n\nModifiers: Tul, Tulver, Xab\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  
  "action.regeneration": {
    "title": "Hesayic",
    "body": "Concept: Regeneration\n\nEffect: This incant applies the regeneration effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.night_vision": {
    "title": "Esieme",
    "body": "Concept: Night Vision\n\nEffect: This incant applies the night vision effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.poison": {
    "title": "Semayic",
    "body": "Concept: Poison\nEffect: This incant applies the poison effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.haste": {
    "title": "Yinïlic",
    "body": "Concept: Haste\n\nEffect: This incant applies the haste effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.speed": {
    "title": "Malver",
    "body": "Concept: Speed\n\nEffect: This incant applies the speed effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.jump_boost": {
    "title": "Malbie",
    "body": "Concept: Jump Boost\n\nEffect: This incant applies the jump boost effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.slow_falling": {
    "title": "Malfievar",
    "body": "Concept: Slow Falling\n\nEffect: This incant applies the slow falling effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.blindness": {
    "title": "Redesi",
    "body": "Concept: Blind\n\nEffect: This incant applies the blindness effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.invisibility": {
    "title": "Xabesi",
    "body": "Concept: Invisibility\n\nEffect: This incant applies the invisibility effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.wither": {
    "title": "Yicyiq",
    "body": "Concept: Wither\n\nEffect: This incant applies the wither effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.absorption": {
    "title": "Cul",
    "body": "Concept: Absorption\n\nEffect: This incant applies the absorption effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.water_breath": {
    "title": "Qarcul",
    "body": "Concept: Water Breathing\n\nEffect: This incant applies the water breathing effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.resist_fire": {
    "title": "Biscul",
    "body": "Concept: Fire Resistance\n\nEffect: This incant applies the fire resistance effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.slowness": {
    "title": "Malvar",
    "body": "Concept: Slow\n\nEffect: This incant applies the slowness effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.hunger": {
    "title": "Malvaryiq",
    "body": "Concept: Hunger/Starvation\n\nEffect: This incant applies the hunger effect to the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.instant_damage": {
    "title": "Fanhus",
    "body": "Concept: Magical Damage\n\nEffect: This incant inflicts magical harm onto the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.instant_heal": {
    "title": "Fanhes",
    "body": "Concept: Magical Health\n\nEffect: This incant inflicts magical healing onto the target specified by the Form.\n\nModifiers: Tul, Tulver, Tic, Ticver\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.clear_effects": {
    "title": "Yinfan",
    "body": "Concept: Dispel Effects\n\nEffect: This incant nullifies any potion effect applied the target specified by the Form.\n\nModifiers: None\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  
  "action.potion": {
    "title": "Wispus",
    "body": "Concept: Wispy Particle\n\nEffect: This incant changes the particles of a spell. It does not affect projectile spells.\n\nModifiers: Color Incants\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  "action.firework": {
    "title": "Sparkis",
    "body": "Concept: Sparkly Particle\n\nEffect: This incant changes the particles of a spell. It does not affect projectile spells.\n\nModifiers: Color Incants\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.actions"
        }
      }
    ]
  },
  
  "modifier.null": {
    "title": "Null Modifier (Het)",
    "body": "Het is a must know Incant, as it acts as a placeholder when a spellcaster either does not want to modify their Action incant, when they are trying to cheapen their spell's cost, or just simply when they have no Modifier Incants to add. It has no item requirements, and it is the only Modifier Incant of its kind.",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.power": {
    "title": "Power Modifiers",
    "body": "Power Modifiers directly increase the magical power of a valid Action incant. They are as follows:\n\n§lTul§r\nAdds 1 to a spell's power.\nRequired Item: Iron Ingot\n\n§lTulver§r\nAdds 2 to a spell's power.\nRequired Item: Diamond\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.duration": {
    "title": "Duration Modifiers",
    "body": "Duration Modifiers directly increase the durations of a valid Action incant. They mainly apply to potion effect Incants. They are as follows:\n\n§lTic§r\nMultiplies a spell's original spell time by 2.\nRequired Item: Sunflower\n\n§lTicver§r\nMultiplies a spell's original spell time by 3.\nRequired Item: Clock\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.radius": {
    "title": "Radius Modifiers",
    "body": "Radius Modifiers multiply or adds the radius of certain Action Incants. However, its most notable use is with Wix. They are as follows:\n\n§lPal§r\nMultiplies a spell's original radius by 2 or increases it by 2.\nRequired Item: String\n\n§lPalver§r\nMultiplies a spell's original radius by 3 or increases it by 3.\nRequired Item: Cobweb\n\n§lPalvereme§r\nMultiplies a spell's original radius by 4 or increases it by 4.\nRequired Item: Dragon Breath\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.axis": {
    "title": "Axis Modifiers",
    "body": "Axis Modifiers are specialized Modifiers designed for Action incants that place or break blocks. They are generally used in tandem with Radius Modifiers. They are as follows:\n\n§lFilfie§r\nForces the spell to cast its effect vertically.\nRequired Item: Copper Ingot\n\n§lFilcie§r\nForces the spell to cast its effect horizontally.\nRequired Item: Copper Ingot\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.explosion": {
    "title": "Explosion Modifiers",
    "body": "Explosion Modifiers are specialized Modifiers designed for Bishuscor. They are as follows:\n\n§lBishus§r\nAllows the explosion to destroy blocks.\nRequired Item: TNT\n\n§lQarhus§r\nAllows the explosion to be effective, even underwater.\nRequired Item: Prismarine Shard\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.reverse": {
    "title": "Reverse Modifier",
    "body": "This is a specialized Modifier that seems to be designed for Malbiever. It directly reverses its effect, allowing it to pull entities instead (items and projectile not included). It requires a Fermented Spider Eye.",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  },
  "modifier.colors": {
    "title": "Color Modifiers",
    "body": "Color Modifiers were specifically designed for Yis. Their required item is the dye that lines up with their color.\n\nWhite = White\nBlack = Black\nL_Gray = Light Gray\nGray = Gray\nBrown = Brown\nRed = Red\nOrange = Orange\nYellow = Yellow\nLime = Lime\nGreen = Green\nCyan = Cyan\nL_Blue = Light Blue\nBlue = Blue\nPurple = Purple\nMagenta = Magenta\nPink = Pink",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/arrow_dark_left_stretch",
        "onClick": {
          "open_form": true,
          "value": "inc.modifiers"
        }
      }
    ]
  }
};