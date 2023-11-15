/* jshint maxerr: 10000 */
import {world, Vector, EntityHealthComponent} from "@minecraft/server";
import {ModalFormData} from "@minecraft/server-ui";
import {checkPlayerTags} from "./Main.js";
import {typeWord, effectWord, modifierWord} from "./spellPiece.js";
import {getParticle, getProjParticle, spawnParticle, getFace, getDirection, calc_OE, reduceDurability, checkValidity, checkItems, getDuration, castSelf, castTouch, castTouchBlock, castPulse, castProj, processSpell, addSpellName} from "./spellFunctions.js";

// Converts a number into the corresponding Xp Level
function getXp(cost) {
  let experience = 0;
  if (cost < 352) {
    experience = Math.round(Math.sqrt(cost + 9) - 3);
  }
  if (cost > 352 && cost < 1508) {
    experience = Math.round((81/10) + Math.sqrt(2/5 * (cost - 7839/40)));
  }
  if (cost > 1507) {
    experience = Math.round((325/18) + Math.sqrt(2/9 * (cost - 54215/72)));
  }
  if (experience <= 0) {
    experience = 1;
  }
  return experience;
}

// Imbue Spell on Runes/Journal
world.afterEvents.chatSend.subscribe(e => {
  let player = e.sender;
  let msg = e.message;

  // Get the item the player is holding
  const inv = player.getComponent("inventory").container;
  const wand = inv.getItem(player.selectedSlot);
  
  const prefix = ":";
  // Spell Imbuement
  if (msg.startsWith(prefix) && (wand.typeId == "bw:empty_spell_journal" || wand.typeId == "bw:baked_rune")) {
    // seperate the prefix from the msg
    // and puts all the words into lower case
    let fullSpell = msg.slice(1, msg.length + 1).toUpperCase();

    //Turn rest of msg into an array of words and loop it
    let wordArray = fullSpell.split(' ');
    
    /* Add new spell lore to the foci */

    // Filter out the ET word
    let runeArray = wordArray.filter((e)=> e != "ET");
    // Turn each incant into numbers and calculate to get spell cost
    let runeCost = calc_OE(runeArray);
    // Convert the spell cost into experience
    let oE = getXp(runeCost);
    if (wand.typeId == "bw:baked_rune") {
      oE * wand.amount;
    }

    // Succeed if level is higher than spell cost
    if (player.level >= oE) {
      if (wand.typeId == "bw:baked_rune") {
        oE = Math.ceil(oE/5);
        player.addLevels(-oE);
        }
      if (wand.typeId == "bw:empty_spell_journal") {
        player.addLevels(-oE);
      }
  
      let spellList = fullSpell.replaceAll(' ET ', '-').split('-', 9);
      for (let i = 0; i < spellList.length; i++){
        let spell = spellList[i].split(' ');
        if (spell.length > 4) {
          spell.slice(0, 4);
        }
        processSpell(spell, player.name);
      }
    } else {
      // Runs if the above check fails
      if (wand.typeId == "bw:baked_rune") {
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§aInsufficient Xp. You need ${Math.ceil(oE/5) - player.level} more level(s).§r\"}]}`);
      }
      if (wand.typeId == "bw:empty_spell_journal") {
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§aInsufficient Xp. You need ${oE - player.level} more level(s).§r\"}]}`);
      }
    }
  }
  
  // Verbal Casting Mechanic
  if (msg.startsWith(selfCastPrefix)) {
    let spokenSpell = msg.slice(1, msg.length + 1).toUpperCase();
    //Turn msg into an array of words and loop through it
    let wordArray = spokenSpell.replaceAll(" ET ", "-").split('-');
    let spell = wordArray[0].split(' ', 4);
    for (let type of typeWord) {
      if (type.word == spell[0] && !checkPlayerTags(type.tag, player)) {
        spell[0] = '???';
      }
    }
    for (let effect of effectWord) {
      if (effect.word == spell[1] && !checkPlayerTags(effect.tag, player)) {
        spell[1] = '???';
      }
    }
    for (let modifier of modifierWord) {
      for (let v = 0; v < [spell[2], spell[3]].length; v++) {
        if (modifier.word == [spell[2], spell[3]][v]) {
          // Check for necessary items and remove them when found
          if (checkItems(player, modifier.required.item)) {
            if (modifier.required.consumed == true) {
              let reqItem = modifier.required.item.replace("minecraft:", "");
              player.runCommandAsync(`clear @s ${reqItem} 0 1`);
            }
          } else {
            [spell[2], spell[3]][v] = '???';
          }
        }
      }
    }
    if (checkValidity(spell) && player.level > 0) {
      switch (spell[0]) {
        case "ETE":
          castSelf(spell[1], [spell[2] != undefined ? spell[2] : "HET", spell[3] != undefined ? spell[3] : "HET"], player);
          player.addLevels(-1);
          break;
        case "WIX":
          castPulse(spell[1], [spell[2] != undefined ? spell[2] : "HET", spell[3] != undefined ? spell[3] : "HET"], player);
          player.addLevels(-1);
          break;
      }
    } else
    if (!checkValidity(spell)) {
      player.runCommandAsync("tellraw @s {\"rawtext\": [{\"text\": \"§cYour spoken spell is invalid. The words steal your vitality as they fade into obscurity.§r\"}]}");
      player.runCommandAsync("damage @s 2 entity_attack");
    } else
    if (player.level <= 0) {
      player.runCommandAsync("tellraw @s {\"rawtext\": [{\"text\": \"§cInsufficient XP Levels.§r\"}]}");
    }
  }
});

// Spell Activations
world.afterEvents.itemUse.subscribe(cast => {
  let player = cast.source;
  // Use itemUse to get the item in the mainhand
  let item = cast.itemStack;
  // Get the item in the offhand
  let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
  // Get Item Lores (mainH.)
  let selfSpell;
  if (item.typeId == "bw:inscribed_rune") {
    selfSpell = item.getLore();
  }
  if (item.typeId == "bw:spell_journal") {
    selfSpell = item.getLore();
  }
  
  // Get Item Lores (offH.)
  let wandSelfSpell;
  if (item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
    wandSelfSpell = offhand.getLore();
  }
  
  // Say Spell Journal SpellCost
  if (item.typeId == "bw:spell_journal" && item.nameTag != undefined) {
    player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"Spell Name: ${item.nameTag}\nSpell Cost: ${calc_OE(selfSpell.join(" + ").split(' + '))}\"}]}`);
  }
  
  // Naming the Spells
  if (item.typeId == "bw:spell_journal" && item.nameTag == undefined && selfSpell.length > 0) {
    let form = new ModalFormData();
    form.title('Spell Name Input');
    form.textField('Spell Name', 'Name your spell...', 'A Spell');
    
    form.show(player).then(res => {
      if (res.canceled) {
        return;
      }
      addSpellName(res.formValues[0], player, item);
    });
  }
  
  if (item.typeId == "bw:inscribed_rune" && item.nameTag == undefined && selfSpell.length > 0) {
    let form = new ModalFormData();
    form.title('Spell Name Input');
    form.textField('Spell Name', 'Name your spell...', 'A Spell');
    
    form.show(player).then(res => {
      if (res.canceled) {
        return;
      }
      addSpellName(res.formValues[0], player, item);
    });
  }
  
  // Make sure it DOES NOT have Touch
  if (item.nameTag != undefined) {
    if (selfSpell != undefined) {
      for (let spell of selfSpell) {
        let selfArray = spell.split(" + ");
        if (selfArray.includes("GEL")) {
          return;
        }
      }
    }
    if (wandSelfSpell != undefined) {
      for (let spell of wandSelfSpell) {
        let wandSelfArray = spell.split(" + ");
        if (wandSelfArray.includes("GEL")) {
          return;
        }
      }
    }
  }
  
  // Casting the Spells
  if (item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
    // Checks if spell is valid
    if (checkValidity(selfSpell.join(" + ").split(' + ')) && !selfSpell.includes("GEL ")) {
      // Destroy Spellrune
      player.runCommandAsync(`clear @s ${item.typeId} 0 1`);

      // Wait for proj values 
      let projectileArray = [];

      // Test if particle is run
      let runCast = [0, 0];
      // Process spells on item
      for (let i = 0; i < 10; i++) {
        let spells = selfSpell;
        let spellString = "" + spells[0];
        let spellWords = spellString.split(' + ', 4);
        
        // Assign each incant to their respective variables
        let type = spellWords[0];
        let effect = spellWords[1];
        let modifier = [spellWords[2], spellWords[3]];
        if (type == "MALIS") {
          projectileArray.push([effect, modifier[0], modifier[1]]);
        }
        
        switch (type) {
          case "ETE":
            castSelf(effect, modifier, player);
            if (runCast[0] == 0) {
              spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
              runCast[0] = 1;
            }
            break;
          case "WIX":
            castPulse(effect, modifier, player);
            if (runCast[1] == 0) {
              spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
              runCast[1] = 1;
            }
            break;
        }
        spells.shift();
      }
      if (projectileArray.length > 0) {
        let particle = "default";
        let color = "default";
        let yisRuneCheck = item.getLore()[0].split(' + ');
        if (yisRuneCheck[0] == "YIS") {
          particle = yisRuneCheck[1];
          color = yisRuneCheck[2]; 
        }

        castProj(projectileArray, player, [particle, color]);
      }
    }
  }
  
  if (item.hasTag('bw:occult_focus') && offhand.typeId == "bw:spell_journal" && offhand.nameTag != undefined) {
    // Checks if spell is valid
    if (checkValidity(wandSelfSpell.join(" + ").split(' + ')) && !wandSelfSpell.includes("GEL ")) {
      
      // Calculates spellcosts
      let focusOE = item.getComponent("durability").maxDurability - item.getComponent("durability").damage;
      
      let spellCost = calc_OE(wandSelfSpell.join(" + ").split(' + '));
      
      if (focusOE >= spellCost) {
        // Decrease focus durability
        let inventory = player.getComponent("inventory").container;
        let heldItem = inventory.getItem(player.selectedSlot);
        
        reduceDurability(player, inventory, heldItem, heldItem.getComponent("durability").damage, spellCost);
        
        let runCast = [0, 0];
        let projectileArray = [];
        for (let i = 0; i < 10; i++) {
          let spells = wandSelfSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);

          // Assign each incant to their respective variables
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          if (type == "MALIS") {
            projectileArray.push([effect, modifier[0], modifier[1]]);
          }
          
          // Trigger effects based on form 
          switch (type) {
            case "ETE":
              castSelf(effect, modifier, player);
              if (runCast[0] == 0) {
                spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                runCast[0] = 1;
              }
              break;
            case "WIX":
              castPulse(effect, modifier, player);
              if (runCast[1] == 0) {
                spawnParticle(`${getParticle(player)[0] + "pulse"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                runCast[1] == 1;
              }
              break;
          }
          spells.shift();
        }
        if (projectileArray.length > 0) {
          let particle = "default";
          let color = "default";
          let yisBookCheck = offhand.getLore()[0].split(' + ');
          if (yisBookCheck[0] == "YIS") {
            particle = yisBookCheck[1];
            color = yisBookCheck[2];
          }
          castProj(projectileArray, player, [particle, color]);
        }
      } else {
        player.runCommandAsync('replaceitem entity @s slot.weapon.mainhand 0 air 1 0');
        player.runCommandAsync('playsound random.break @a[r=5]');
      }
    }
  }
});

// Comments are similar to the above function
world.afterEvents.entityHitEntity.subscribe(e => {
  let entity = e.hitEntity;
  let player = e.damagingEntity;
  
  if (player.typeId == "minecraft:player") {
    // Get items
    const inv = player.getComponent("inventory").container;
    const item = inv.getItem(player.selectedSlot);
    let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
    // Get Lore from runes
    let touchSpell;
    if (item != undefined && item.typeId == "bw:inscribed_rune") {
      touchSpell = item.getLore();
    }
    
    // Get Lore from focus casters (wands)
    let wandTouchSpell;
    if (item != undefined && item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
      wandTouchSpell = offhand.getLore();
    }
    
    // Ensure that this is Touch
    if (item.nameTag != undefined) {
      if (touchSpell != undefined) {
        for (let spell of touchSpell) {
          let touchArray = spell.split(" + ");
          if (touchArray.includes("GEL")) {
            return;
          }
        }
      }
      if (wandTouchSpell != undefined) {
        for (let spell of wandTouchSpell) {
          let wandTouchArray = spell.split(" + ");
          if (wandTouchArray.includes("GEL")) {
            return;
          }
        }
      }
    }
    
    // Casting the Spells
    if (item != undefined && item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(touchSpell.join(" + ").split(' + '))) {
        // Destroy rune
        player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
        
        // Test if particle is run
        let runCast = false;
        for (let i = 0; i < 10; i++) {
          let spells = touchSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);
          
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          
          switch (type) {
            case "GEL":
              castTouch(effect, modifier, player, entity);
              if (runCast == false) {
                spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                runCast = true;
              }
              break;
          }
          spells.shift();
        }
      } else {
        player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 1, {breaksBlocks: false, causesFire: false, allowUnderwater: true});
      }
    }

    // Pretty identical to the above code
    if (item != undefined && offhand != undefined && item.hasTag('bw:occult_focus') && offhand.typeId == "bw:spell_journal" && offhand.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(wandTouchSpell.join(" + ").split(' + '))) {
        
        // Get wand durability
        let focusOE = item.getComponent("durability").maxDurability - item.getComponent("durability").damage;
        // Get the cost of the spell
        let spellCost = calc_OE(wandTouchSpell.join(" + ").split(' + '));
        
        // Compare the durability and spellcost
        if (focusOE >= spellCost) {
          // Decrease focus durability
          let inventory = player.getComponent("inventory").container;
          let heldItem = inventory.getItem(player.selectedSlot);
          
          reduceDurability(player, inventory, heldItem, heldItem.getComponent("durability").damage, spellCost);
          
          let runCast = false;
          for (let i = 0; i < 10; i++) {
            let spells = wandTouchSpell;
            let spellString = "" + spells[0];
            let spellWords = spellString.split(' + ', 4);
            
            let type = spellWords[0];
            let effect = spellWords[1];
            let modifier = [spellWords[2], spellWords[3]];
            
            switch (type) {
              case "GEL":
                castTouch(effect, modifier, player, entity);
                if (runCast == false) {
                  spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                  runCast = true;
                }
                break;
            }
            spells.shift();
          }
        } else {
          player.runCommandAsync('replaceitem entity @s slot.weapon.mainhand 0 air 1 0');
          player.runCommandAsync('playsound random.break @a[r=5]');
        }
      } else {
        player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 1, {breaksBlocks: false, causesFire: false, allowUnderwater: true});
      }
    }
  }
});

// Same as above function
world.afterEvents.entityHitBlock.subscribe(e => {
  let block = e.hitBlock;
  let blockFace = e.blockFace;
  let player = e.damagingEntity;
  
  if (player.typeId == "minecraft:player") {
    // Get items
    const inv = player.getComponent("inventory").container;
    const item = inv.getItem(player.selectedSlot);
    let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
    // Get Lore from runes
    let touchSpell;
    if (item != undefined && item.typeId == "bw:inscribed_rune") {
      touchSpell = item.getLore();
    }
    if (item != undefined && item.typeId == "bw:spell_journal") {
      touchSpell = item.getLore();
    }
    
    // Get Lore from focus casters (wands)
    let wandTouchSpell;
    if (item != undefined && item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
      wandTouchSpell = offhand.getLore();
    }
    
    // Ensure that this is Touch
    if (item.nameTag != undefined) {
      if (touchSpell != undefined) {
        for (let spell of touchSpell) {
          let touchArray = spell.split(" + ");
          if (touchArray.includes("GEL")) {
            return;
          }
        }
      }
      if (wandTouchSpell != undefined) {
        for (let spell of wandTouchSpell) {
          let wandTouchArray = spell.split(" + ");
          if (wandTouchArray.includes("GEL")) {
            return;
          }
        }
      }
    }
    
  // Casting the Spells
    if (item != undefined && item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(touchSpell.join(" + ").split(' + '))) {
        
        // Clear rune
        player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
        
        // Check if the particle was run
        let runCast = false;
        for (let i = 0; i < 10; i++) {
          let spells = touchSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);
          
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          
          switch (type) {
            case "GEL":
              castTouchBlock(effect, modifier, player, block, blockFace);
              if (runCast == false) {
                spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                runCast = true;
              }
              break;
          }
          spells.shift();
        }
      } else {
        player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 1, {breaksBlocks: false, causesFire: false, allowUnderwater: true});
      }
    }
    
    if (item != undefined && item.hasTag('bw:occult_focus') && offhand.typeId == "bw:spell_journal" && offhand.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(wandTouchSpell.join(" + ").split(' + '))) {
        
        // Calculates spellcosts
        let focusOE = item.getComponent("durability").maxDurability - item.getComponent("durability").damage;
        
        let spellCost = calc_OE(wandTouchSpell.join(" + ").split(' + '));
        
        if (focusOE >= spellCost) {
          // Decrease focus durability
          let inventory = player.getComponent("inventory").container;
          let heldItem = inventory.getItem(player.selectedSlot);
          
          reduceDurability(player, inventory, heldItem, heldItem.getComponent("durability").damage, spellCost);
          
          let runCast = false;
          for (let i = 0; i < 10; i++) {
            let spells = wandTouchSpell;
            let spellString = "" + spells[0];
            let spellWords = spellString.split(' + ', 4);
            
            let type = spellWords[0];
            let effect = spellWords[1];
            let modifier = [spellWords[2], spellWords[3]];
            
            switch (type) {
              case "GEL":
                castTouchBlock(effect, modifier, player, block, blockFace);
                if (runCast == false) {
                  spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
                  runCast = true;
                }
                break;
            }
            spells.shift();
          }
        } else {
          player.runCommandAsync('replaceitem entity @s slot.weapon.mainhand 0 air 1 0');
          player.runCommandAsync('playsound random.break @a[r=5]');
        }
      } else {
        player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 1, {breaksBlocks: false, causesFire: false, allowUnderwater: true});
      }
    }
  }
});

// Projectile Hit Effects
world.afterEvents.entityHurt.subscribe(data => {
  const
    victim = data.hurtEntity,
    damaging = data.damageSource.damagingProjectile;
  if (damaging?.typeId == "bw:projectile") {
    
    let findTags = damaging.getTags().find(tag => tag.includes("projSpells:"));
    
    let magicSpell = findTags.slice(11).split(' + ');
    
    for (let t = 0; t < magicSpell.length; t++) {
      let magic = "";
      magic += magicSpell[t];
      let Spell = magic.slice(1, magic.length - 1).split(',');
      let effect = `${Spell[0]}`;
      let modifier = [`${Spell[1].slice(0, Spell[1].length)}`, `${Spell[2]}`];
      
      let spellType;
      let spellEffect;
      let modifierType;
      
      let spellModifier = [0, getDuration(effect), 1, 1, [false, false]];
      
      for (let efct of effectWord) {
        if (effect === efct.word) {
          switch (efct.effectType) {
            case "potion_effect":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
            case "damage":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
            case "heal":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
            case "lightning":
              spellType = efct.effectType;
              break;
            case "explosion":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
            case "launch":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
            case "burn":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
          }
        }
      }
      
      for (let mod in modifier) {
        for (let mdfr of modifierWord) {
          damaging.runCommandAsync(`say ${mod}`);
          if (modifier[mod] == mdfr.word) {
            damaging.runCommandAsync(`say ${modifier[mod]}`);
            modifierType = mdfr.modifierType;
            switch (modifierType) {
              case "null":
                break;
              case "power":
                spellModifier[0] += mdfr.value;
                spellModifier[2] += spellModifier[0] + mdfr.value;
                break;
              case "duration":
                spellModifier[1] *= mdfr.value;
                break;
              case "reverse":
                spellModifier[3] *= -1;
                break;
              case "explosion":
                if (mdfr.value == "fireDamage") {
                  spellModifier[4][0] = true;
                }
                if (mdfr.value == "waterDamage") {
                  spellModifier[4][1] = true;
                }
                break;
            }
          }
        }
      }
      
      if (spellType == "potion_effect") {
        let bool = spellModifier[3] == -1 ? true : false;
        console.warn(bool, spellModifier)
        if (spellEffect.effect != "clear") {
          if (bool) {
            victim.runCommandAsync(`effect @s ${spellEffect.reverseEffect == undefined ? spellEffect.effect : spellEffect.reverseEffect} ${spellModifier[1]} ${spellModifier[0]} false`);
          }
          if (!bool) {
            victim.runCommandAsync(`effect @s ${spellEffect.effect} ${spellModifier[1]} ${spellModifier[0]} false`);
          }
        } else {
          victim.runCommandAsync(`effect @s ${spellEffect.effect}`);
        }
      }
      
      if (spellType == "damage") {
        victim.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType}`);
      }
      
      if (spellType == "burn") {
        victim.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType}`);
        victim.setOnFire(5 * spellModifier[2], true);
      }
      
      if (spellType == "heal") {
        let victimHealth = victim.getComponent(EntityHealthComponent.componentId).currentValue;
        let heal = victimHealth + (spellEffect.healValue * spellModifier[2]);
        
        victim.getComponent(EntityHealthComponent.componentId).setCurrentValue(heal);
      }
      
      if (spellType == "lightning") {
        victim.runCommandAsync('summon lightning_bolt ~~~');
      }
      
      if (spellType == "explosion") {
        victim.dimension.createExplosion({x: victim.location.x, y: victim.location.y,  z: victim.location.z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[4][0] ? true : spellEffect.destructive, causesFire: spellModifier[4][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[4][1] ? true : spellEffect.underWater});
      }
      
      if (spellType == "launch") {
        if (victim.typeId != "minecraft:item") {
          victim.applyKnockback(damaging.getViewDirection().x * spellModifier[3], damaging.getViewDirection().z * spellModifier[3], spellEffect.horizontal + spellModifier[0], spellEffect.vertical + spellModifier[0]);
        }
      }
    }
  }
});

world.afterEvents.projectileHitBlock.subscribe(e => {
  let block = e.getBlockHit().block;
  let blockFace = e.getBlockHit().face;
  let projectile = e.projectile;
  let shooter = e.source;

  let x = block.location.x;
  let y = block.location.y;
  let z = block.location.z;
  
  if (projectile.typeId == "bw:projectile") {
    let findTags = projectile.getTags().find(tag => tag.includes("projSpells:"));
    
    let magicSpell = findTags.slice(11).split(' + ');
    for (let t = 0; t < magicSpell.length; t++) {
      let magic = "";
      magic += magicSpell[t];
      let Spell = magic.slice(1, magic.length - 1).split(',');
      
      let effect = Spell[0];
      let modifiers = Spell.slice(1, Spell.length);
      
      let spellType;
      let spellEffect;
      let modifierType;
      const spellModifier = [0, 0, "null", [false, false]];
      
      for (let efct of effectWord) {
        if (effect === efct.word) {
          switch (efct.effectType) {
            case "break":
              spellType = efct.effectType;
              break;
            case "burn":
              spellType = efct.effectType;
              break;
            case "douse":
              spellType = efct.effectType;
              break;
            case "frost":
              spellType = efct.effectType;
              break;
            case "lightning":
              spellType = efct.effectType;
              break;
            case "explosion":
              spellType = efct.effectType;
              spellEffect = efct.value;
              break;
          }
        }
      }
      
      for (let mod of modifiers) {
        for (let mdfr of modifierWord) {
          if (mod == mdfr.word) {
            modifierType = mdfr.modifierType;
            switch (modifierType) {
              case "null":
                break;
              case "power":
                spellModifier[0] += spellModifier[0] + mdfr.value;
                break;
              case "radius":
                spellModifier[1] += spellModifier[1] + mdfr.value;
                break;
              case "axis":
                spellModifier[2] = mdfr.value;
                break;
              case "explosion":
                if (mdfr.value == "fireDamage") {
                  spellModifier[3][0] = true;
                }
                if (mdfr.value == "waterDamage") {
                  spellModifier[3][1] = true;
                }
                break;
            }
          }
        }
      }
     
      if (spellType == "break") {
        let coords = [
          `${x + 1} ${y + 1} ${z + 1}`,
          `${x - 1} ${y + 1} ${z + 1}`,
          `${x + 1} ${y + 1} ${z - 1}`,
          `${x - 1} ${y + 1} ${z - 1}`,
          `${x + 1} ${y + 1} ${z}`,
          `${x - 1} ${y + 1} ${z}`,
          `${x} ${y + 1} ${z + 1}`,
          `${x} ${y + 1} ${z - 1}`,
          `${x} ${y + 1} ${z}`,
          `${x + 1} ${y} ${z + 1}`,
          `${x - 1} ${y} ${z + 1}`,
          `${x + 1} ${y} ${z - 1}`,
          `${x - 1} ${y} ${z - 1}`,
          `${x + 1} ${y} ${z}`,
          `${x - 1} ${y} ${z}`,
          `${x} ${y} ${z + 1}`,
          `${x} ${y} ${z - 1}`,
          `${x + 1} ${y - 1} ${z + 1}`,
          `${x - 1} ${y - 1} ${z + 1}`,
          `${x + 1} ${y - 1} ${z - 1}`,
          `${x - 1} ${y - 1} ${z - 1}`,
          `${x + 1} ${y - 1} ${z}`,
          `${x - 1} ${y - 1} ${z}`,
          `${x} ${y - 1} ${z + 1}`,
          `${x} ${y - 1} ${z - 1}`,
          `${x} ${y - 1} ${z}`,
          `${x} ${y} ${z}`
        ];
        switch (spellModifier[2]) {
          case "null":
            if (spellModifier[1] > 0) {
              for (let c = 0; c < coords.length; c++) {
                block.dimension.runCommandAsync(`execute positioned ${coords[c]} unless block ${coords[c]} bedrock unless block ${coords[c]} deny unless block ${coords[c]} allow unless block ${coords[c]} barrier unless block ${coords[c]} command_block unless block ${coords[c]} structure_block unless block ${coords[c]} end_portal_frame unless block ${coords[c]} reinforced_deepslate run setblock ${coords[c]} air [] destroy`);
              }
            } else {
                block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} unless block ${x} ${y} ${z} bedrock unless block ${x} ${y} ${z} deny unless block ${x} ${y} ${z} allow unless block ${x} ${y} ${z} barrier unless block ${x} ${y} ${z} command_block unless block ${x} ${y} ${z} structure_block unless block ${x} ${y} ${z} end_portal_frame unless block ${x} ${y} ${z} reinforced_deepslate run setblock ${x} ${y} ${z} air [] destroy`);
            }
            break;
          case "vertical":
            let direction = getDirection(Math.round(player.getRotation().y));
            let longMine = [coords[4], coords[5], coords[8], coords[13], coords[14], coords[21], coords[22], coords[25], coords[26]];
            let latMine = [coords[6], coords[7], coords[8], coords[15], coords[16], coords[23], coords[24], coords[25], coords[26]];
            
            switch (direction[1]) {
              case ("latitude"):
                if (spellModifier[1] > 0) {
                  for (let c = 0; c < latMine.length; c++) {
                    block.dimension.runCommandAsync(`execute positioned ${latMine[c]} unless block ${latMine[c]} bedrock unless block ${latMine[c]} deny unless block ${latMine[c]} allow unless block ${latMine[c]} barrier unless block ${latMine[c]} command_block unless block ${latMine[c]} structure_block unless block ${latMine[c]} end_portal_frame unless block ${latMine[c]} reinforced_deepslate run setblock ${latMine[c]} air [] destroy`);
                  }
                } else {
                  block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} unless block ${x} ${y} ${z} bedrock unless block ${x} ${y} ${z} deny unless block ${x} ${y} ${z} allow unless block ${x} ${y} ${z} barrier unless block ${x} ${y} ${z} command_block unless block ${x} ${y} ${z} structure_block unless block ${x} ${y} ${z} end_portal_frame unless block ${x} ${y} ${z} reinforced_deepslate run setblock ${x} ${y} ${z} air [] destroy`);
                }
                break;
              case ("longitude"):
                if (spellModifier[1] > 0) {
                  for (let c = 0; c < longMine.length; c++) {
                    block.dimension.runCommandAsync(`execute positioned ${longMine[c]} unless block ${longMine[c]} bedrock unless block ${longMine[c]} deny unless block ${longMine[c]} allow unless block ${longMine[c]} barrier unless block ${longMine[c]} command_block unless block ${longMine[c]} structure_block unless block ${longMine[c]} end_portal_frame unless block ${longMine[c]} reinforced_deepslate run setblock ${longMine[c]} air [] destroy`);
                  }
                } else {
                  block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} unless block ${x} ${y} ${z} bedrock unless block ${x} ${y} ${z} deny unless block ${x} ${y} ${z} allow unless block ${x} ${y} ${z} barrier unless block ${x} ${y} ${z} command_block unless block ${x} ${y} ${z} structure_block unless block ${x} ${y} ${z} end_portal_frame unless block ${x} ${y} ${z} reinforced_deepslate run setblock ${x} ${y} ${z} air [] destroy`);
                }
                break;
            }
            
            break;
          case "horizontal":
            let acrossBreak = [coords[9], coords[10], coords[11], coords[12], coords[13], coords[14], coords[15], coords[16], coords[26]];
            if (spellModifier[1] > 0) {
              for (let c = 0; c < acrossBreak.length; c++) {
                block.dimension.runCommandAsync(`execute positioned ${acrossBreak[c]} unless block ${acrossBreak[c]} bedrock unless block ${acrossBreak[c]} deny unless block ${acrossBreak[c]} allow unless block ${acrossBreak[c]} barrier unless block ${acrossBreak[c]} command_block unless block ${acrossBreak[c]} structure_block unless block ${acrossBreak[c]} end_portal_frame unless block ${acrossBreak[c]} reinforced_deepslate run setblock ${acrossBreak[c]} air [] destroy`);
              }
            } else {
              block.dimension.runCommandAsync(`execute positioned ${x} ${y} ${z} unless block ${x} ${y} ${z} bedrock unless block ${x} ${y} ${z} deny unless block ${x} ${y} ${z} allow unless block ${x} ${y} ${z} barrier unless block ${x} ${y} ${z} command_block unless block ${x} ${y} ${z} structure_block unless block ${x} ${y} ${z} end_portal_frame unless block ${x} ${y} ${z} reinforced_deepslate run setblock ${x} ${y} ${z} air [] destroy`);
            }
            break;
        }
      }
          
      if (spellType == "burn") {
        let location = Vector.add(block.location, getFace(blockFace));
        
        switch (spellModifier[2]) {
          case "null":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} fire [] keep`);
            break;
          case "vertical":
            let direction = getDirection(Math.round(player.getRotation().y));
            
            switch (direction[1]) {
              case ("latitude"):
                block.dimension.runCommandAsync(`fill ${location.x} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} fire [] keep`);
                break;
              case ("longitude"):
                block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z} fire [] keep`);
                break;
            }
            
            break;
          case "horizontal":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y} ${location.z - spellModifier[1]} fire [] keep`);
            break;
        }
        
      }
      
      if (spellType == "douse") {
        let location = Vector.add(block.location, getFace(blockFace));
        
        switch (spellModifier[2]) {
          case "null":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} flowing_water ["liquid_depth"= 14] keep`);
            break;
          case "vertical":
            let direction = getDirection(Math.round(player.getRotation().y));
            
            switch (direction[1]) {
              case ("latitude"):
                block.dimension.runCommandAsync(`fill ${location.x} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} flowing_water ["liquid_depth"= 14] keep`);
                break;
              case ("longitude"):
                block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z} flowing_water ["liquid_depth"= 14] keep`);
                break;
            }
            
            break;
          case "horizontal":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y} ${location.z - spellModifier[1]} flowing_water ["liquid_depth"= 14] keep`);
            break;
        }
      }
      
      if (spellType == "frost") {
        let location = Vector.add(block.location, getFace(blockFace));
        
        switch (spellModifier[2]) {
          case "null":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} powder_snow [] keep`);
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} packed_ice [] replace flowing_water []`);
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} packed_ice [] replace water []`);
            break;
          case "vertical":
            let direction = getDirection(Math.round(player.getRotation().y));
            
            switch (direction[1]) {
              case ("latitude"):
                block.dimension.runCommandAsync(`fill ${location.x} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} powder_snow [] keep`);
                block.dimension.runCommandAsync(`fill ${location.x} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} packed_ice [] replace flowing_water []`);
                block.dimension.runCommandAsync(`fill ${location.x} ${location.y - spellModifier[1]} ${location.z + spellModifier[1]} ${location.x} ${location.y + spellModifier[1]} ${location.z - spellModifier[1]} packed_ice [] replace water []`);
                break;
              case ("longitude"):
                block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z} powder_snow [] keep`);
                block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z} packed_ice [] replace flowing_water []`);
                block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y - spellModifier[1]} ${location.z} ${location.x - spellModifier[1]} ${location.y + spellModifier[1]} ${location.z} packed_ice [] replace water []`);
                break;
            }
            
            break;
          case "horizontal":
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y} ${location.z - spellModifier[1]} powder_snow [] keep`);
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y} ${location.z - spellModifier[1]} packed_ice [] replace flowing_water []`);
            block.dimension.runCommandAsync(`fill ${location.x + spellModifier[1]} ${location.y} ${location.z + spellModifier[1]} ${location.x - spellModifier[1]} ${location.y} ${location.z - spellModifier[1]} packed_ice [] replace water []`);
            break;
        }
      }
      
      if (spellType == "lightning") {
        block.dimension.runCommandAsync(`summon lightning_bolt ${block.location.x} ${block.location.y + 1} ${block.location.z}`);
      }
      
      if (spellType == "explosion") {
        block.dimension.createExplosion({x: block.location.x, y: block.location.y,  z: block.location.z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[3][0] ? true : spellEffect.destructive, causesFire: spellModifier[3][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[3][1] ? true : spellEffect.underWater});
      }
    }
  }
});