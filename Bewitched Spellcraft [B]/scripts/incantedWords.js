/* jshint maxerr: 10000 */
import {world, Vector, EntityHealthComponent} from "@minecraft/server";
import {ModalFormData} from "@minecraft/server-ui";
import {effectWord, modifierWord} from "./spellPiece.js";
import "./spellFunctions.js";


// Cast Spell
world.afterEvents.chatSend.subscribe(e => {
  let player = e.sender;
  let msg = e.message;
  const inv = player.getComponent("inventory").container;
  const wand = inv.getItem(player.selectedSlot);
  
  const prefix = ":";
  if (msg.startsWith(prefix) && (wand.typeId == "bw:empty_spell_journal" || wand.typeId == "bw:baked_rune")) {
    // seperate the prefix from the msg
    // and puts all the words into lower case
    let fullSpell = msg.slice(1, msg.length + 1).toUpperCase();
    //Turn msg into an array of words and loop through it
    let wordArray = fullSpell.split(' ');
    let counter = 0;
    
    // Add new spell lore to the foci
    if (wand.typeId == "bw:baked_rune") {
      let runeArray = wordArray.filter((e)=> e != "ET");
      let runeCost = calc_OE(runeArray);
      let oE;
      if (runeCost < 352) {
        oE = Math.round(Math.sqrt(runeCost + 9) - 3);
      }
      if (runeCost > 352 && runeCost < 1508) {
        oE = Math.round((81/10) + Math.sqrt(2/5 * (runeCost - 7839/40)));
      }
      if (runeCost > 1507) {
        oE = Math.round((325/18) + Math.sqrt(2/9 * (runeCost - 54215/72)));
      }
      if (oE == 0) {
        oE = 1;
      }
      
      if (player.level >= oE) {
        player.addLevels(-oE);
        
        for(let i = 0; i < 10; i++){
          processSpell(wordArray.slice(i+counter, i+counter+4), player.name);
          if(wordArray[i+counter+4] != "ET"){ break; }
          counter += 4;
        }
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§gYou've successfully inscribed ${wand.amount} Baked Rune(s).§r\"}]}`);
      } else {
        player.runCommandAsync("tellraw @s {\"rawtext\": [{\"text\": \"§aYou have insufficient XP. This may be due to attempting to inscribe too many Baked Runes at once.§r\"}]}");
      }
    }
    
    if (wand.typeId == "bw:empty_spell_journal") {
      let runeArray = wordArray.filter((e)=> e != "ET");
      let runeCost = calc_OE(runeArray);
      let oE;
      if (runeCost < 352) {
        oE = Math.round(Math.sqrt(runeCost + 9) - 3);
      }
      if (runeCost > 352 && runeCost < 1508) {
        oE = Math.round((81/10) + Math.sqrt(2/5 * (runeCost - 7839/40)));
      }
      if (runeCost > 1507) {
        oE = Math.round((325/18) + Math.sqrt(2/9 * (runeCost - 54215/72)));
      }
      if (oE == 0) {
        oE = 1;
      }
      
      if (player.level >= oE) {
        player.addLevels(-oE);
        
        for(let i = 0; i < 10; i++){
          processSpell(wordArray.slice(i+counter, i+counter+4), player.name);
          if(wordArray[i+counter+4] != "ET"){ break; }
          counter += 4;
        }
        player.runCommandAsync("tellraw @s {\"rawtext\": [{\"text\": \"§aYour spell was successfully inscribed.§r\"}]}");
      } else {
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§aYou have insufficient XP. You need ${oE - player.level} more levels.§r\"}]}`);
      }
    }
  }
});

// Spell Activations
world.afterEvents.itemUse.subscribe(cast => {
  let player = cast.source;
  let item = cast.itemStack;
  let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
  // Get Lore from source casters
  let selfSpell;
  if (item.typeId == "bw:inscribed_rune") {
    selfSpell = item.getLore();
  }
  if (item.typeId == "bw:spell_journal") {
    selfSpell = item.getLore();
  }
  
  // Get Lore from focus casters
  let wandSelfSpell;
  if (item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
    wandSelfSpell = offhand.getLore();
  }
  
  // Spell Cost
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
  if (selfSpell != undefined && item.nameTag != undefined) {
    for (let spell of selfSpell) {
      if (spell.includes("GEL")) {
        return;
      }
    }
  }
  
  if (wandSelfSpell != undefined && item.nameTag != undefined) {
    for (let spell of wandSelfSpell) {
      if (spell.includes("GEL")) {
        return;
      }
    }
  }
  
  // Casting the Spells
  if (item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
    // Checks if spell is valid
    if (checkValidity(selfSpell.join(" + ").split(' + ')) && !selfSpell.includes("GEL ")) {
      // Destroy Spellrune
      player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
        
      let projectileArray = [];
      for (let i = 0; i < 10; i++) {
        let spells = selfSpell;
        let spellString = "" + spells[0];
        let spellWords = spellString.split(' + ', 4);
        
        let type = spellWords[0];
        let effect = spellWords[1];
        let modifier = [spellWords[2], spellWords[3]];
        if (type == "MALIS") {
          projectileArray.push([effect, modifier[0], modifier[1]]);
        }
        
        switch (type) {
          case "ETE":
            castSelf(effect, modifier, player);
            break;
          case "WIX":
            castPulse(effect, modifier, player);
            break;
        }
        spells.shift();
      }
      if (projectileArray.length > 0) {
        let particle = "default";
        let color = "default";
        let yisRuneCheck = selfSpell[0].split(' + ');
        if (yisRuneCheck[0] == "YIS") {
          particle = yisRuneCheck[1];
          color = yisRuneCheck[2] 
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
        
        let projectileArray = [];
        for (let i = 0; i < 10; i++) {
          let spells = wandSelfSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);
          
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          if (type == "MALIS") {
            projectileArray.push([effect, modifier[0], modifier[1]]);
          }
          
          switch (type) {
            case "ETE":
              castSelf(effect, modifier, player);
              break;
            case "WIX":
              castPulse(effect, modifier, player);
              break;
          }
          spells.shift();
        }
        if (projectileArray.length > 0) {
          let particle = "default";
          let color = "default";
          let yisBookCheck = wandSelfSpell[0].split(' + ');
          if (yisBookCheck[0] == "YIS") {
            particle = yisBookCheck[1];
            color = yisBookCheck[2] 
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

world.afterEvents.entityHitEntity.subscribe(e => {
  let entity = e.hitEntity;
  let player = e.damagingEntity;
  
  if (player.typeId == "minecraft:player") {
    const inv = player.getComponent("inventory").container;
    const item = inv.getItem(player.selectedSlot);
    let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
    // Get Lore from source casters
    let touchSpell;
    if (item != undefined && item.typeId == "bw:inscribed_rune") {
      touchSpell = item.getLore();
    }
    if (item != undefined && item.typeId == "bw:spell_journal") {
      touchSpell = item.getLore();
    }
    
    // Get Lore from focus casters
    let wandTouchSpell;
    if (item != undefined && item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
      wandTouchSpell = offhand.getLore();
    }
    
    // Ensure that this is Touch
    if (touchSpell != undefined && item.nameTag != undefined) {
      let wholeArray = touchSpell.join(" + ").split(' + ');
      if (!wholeArray.includes('GEL')) {
        return;
      }
    }
    if (wandTouchSpell != undefined && item.nameTag != undefined) {
      let wholeArray = wandTouchSpell.join(" + ").split(' + ');
      if (!wholeArray.includes('GEL')) {
        return;
      }
    }
    
    // Casting the Spells
    if (item != undefined && item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(touchSpell.join(" + ").split(' + '))) {
        // Decrease player OE
        player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
        
        for (let i = 0; i < 10; i++) {
          let spells = touchSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);
          
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          
          switch (type) {
            case "ETE":
              castSelf(effect, modifier, player);
              break;
            case "GEL":
              castTouch(effect, modifier, player, entity);
              break;
            case "WIX":
              castPulse(effect, modifier, player);
              break;
          }
          spells.shift();
        }
      } else {
        player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 1, {breaksBlocks: false, causesFire: false, allowUnderwater: true});
      }
    }
    
    if (item != undefined && offhand != undefined && item.hasTag('bw:occult_focus') && offhand.typeId == "bw:spell_journal" && offhand.nameTag != undefined) {
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
          
          for (let i = 0; i < 10; i++) {
            let spells = wandTouchSpell;
            let spellString = "" + spells[0];
            let spellWords = spellString.split(' + ', 4);
            
            let type = spellWords[0];
            let effect = spellWords[1];
            let modifier = [spellWords[2], spellWords[3]];
            
            switch (type) {
              case "ETE":
                castSelf(effect, modifier, player);
                break;
              case "GEL":
                castTouch(effect, modifier, player, entity);
                break;
              case "WIX":
                castPulse(effect, modifier, player);
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

world.afterEvents.entityHitBlock.subscribe(e => {
  let block = e.hitBlock;
  let blockFace = e.blockFace;
  let player = e.damagingEntity;
  
  if (player.typeId == "minecraft:player") {
    const inv = player.getComponent("inventory").container;
    const item = inv.getItem(player.selectedSlot);
    let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
    // Get Lore from source casters
    let touchSpell;
    if (item != undefined && item.typeId == "bw:inscribed_rune") {
      touchSpell = item.getLore();
    }
    if (item != undefined && item.typeId == "bw:spell_journal") {
      touchSpell = item.getLore();
    }
    
    // Get Lore from focus casters
    let wandTouchSpell;
    if (item != undefined && item.hasTag("bw:occult_focus") && offhand.typeId == "bw:spell_journal") {
      wandTouchSpell = offhand.getLore();
    }
    
    // Ensure that this is Touch
    if (touchSpell != undefined && item.nameTag != undefined) {
      let wholeArray = touchSpell.join(" + ").split(' + ');
      if (!wholeArray.includes('GEL')) {
        return;
      }
    }
    if (wandTouchSpell != undefined && item.nameTag != undefined) {
      let wholeArray = wandTouchSpell.join(" + ").split(' + ');
      if (!wholeArray.includes('GEL')) {
        return;
      }
    }
    
  // Casting the Spells
    if (item != undefined && item.typeId == "bw:inscribed_rune" && item.nameTag != undefined) {
      // Checks if spell is valid
      if (checkValidity(touchSpell.join(" + ").split(' + '))) {
        
        // Decrease player OE
        player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
        
        for (let i = 0; i < 10; i++) {
          let spells = touchSpell;
          let spellString = "" + spells[0];
          let spellWords = spellString.split(' + ', 4);
          
          let type = spellWords[0];
          let effect = spellWords[1];
          let modifier = [spellWords[2], spellWords[3]];
          
          switch (type) {
            case "ETE":
              castSelf(effect, modifier, player);
              break;
            case "GEL":
              castTouchBlock(effect, modifier, player, block, blockFace);
              break;
            case "WIX":
              castPulse(effect, modifier, player);
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
          
          for (let i = 0; i < 10; i++) {
            let spells = wandTouchSpell;
            let spellString = "" + spells[0];
            let spellWords = spellString.split(' + ', 4);
            
            let type = spellWords[0];
            let effect = spellWords[1];
            let modifier = [spellWords[2], spellWords[3]];
            
            switch (type) {
              case "ETE":
                castSelf(effect, modifier, player);
                break;
              case "GEL":
                castTouchBlock(effect, modifier, player, block, blockFace);
                break;
              case "WIX":
                castPulse(effect, modifier, player);
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
      let modifier = [`${Spell[1].slice(1, Spell[1].length)}`, `${Spell[2]}`];
      
      let spellType;
      let spellEffect;
      let modifierType;
      var spellModifier = [0, getDuration(effect), 1, 1, [false, false]];
      
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
      
      for (let mdfr of modifierWord) {
        for (let mod in modifier) {
          if (modifier[mod] === mdfr.word) {
            modifierType = mdfr.modifierType;
            switch (modifierType) {
              case "null":
                break;
              case "power":
                spellModifier[0] = spellModifier[0] + mdfr.value;
                spellModifier[2] = spellModifier[0] + mdfr.value;
                break;
              case "duration":
                spellModifier[1] = spellModifier[1] * mdfr.value;
                break;
              case "reverse":
                spellModifier[3] = -1;
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
        if (spellEffect.effect != "clear") {
          victim.runCommandAsync(`effect @s ${spellEffect.effect} ${spellModifier[1]} ${spellModifier[0]} false`);
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