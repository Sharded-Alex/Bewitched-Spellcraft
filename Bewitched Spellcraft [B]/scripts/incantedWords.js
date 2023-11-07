/* jshint maxerr: 10000 */
import {world, system, ItemStack, MolangVariableMap, Vector, BlockPermutation, BlockTypes, Entity, EntityHealthComponent, ItemDurabilityComponent, EquipmentSlot, Direction} from "@minecraft/server";
import {ModalFormData} from "@minecraft/server-ui";
import {typeWord, effectWord, modifierWord} from "./spellPiece.js";
import {checkPlayerTags} from "./Main.js";
import {spellTagList} from "./tagReqs";
import {checkReq} from "./tagAddition";

// My Functions
function getParticle(player) {
  const inventory = player.getComponent("inventory").container;
  const item = inventory.getItem(player.selectedSlot);
  
  const equipment = player.getComponent("equippable");
  const offhandItem = equipment.getEquipment("Offhand");
  
  let colorLore;
  if (item.hasTag("bw:occult_focus") && offhandItem.typeId == "bw:spell_journal") {
    colorLore = offhandItem.getLore();
  }
  if (item.typeId == "bw:inscribed_rune") {
    colorLore = item.getLore();
  }
  
  let returnedParticle = "bw:wispy_particle_";
  let returnedColor = [Math.random(), Math.random(), Math.random()];
  
  let colorArray = colorLore[0].split(" + ");
  if (colorArray[0] == "YIS") {
    for (let partcl of effectWord) {
      if (colorArray[1] == partcl.word) {
        returnedParticle = partcl.value.particleName;
      }
    }
    
    for (let clr of modifierWord) {
      if (colorArray[2] == clr.word && clr.modifierType == "color") {
        returnedColor = clr.value;
      }
    }
  }
  
  return [returnedParticle, returnedColor];
}
export function spawnParticle(particle, xLoc, yLoc, zLoc, dimension, r, g, b) {
  const customColor = new MolangVariableMap();
  customColor.setColorRGB('variable.color', {red: r, green: g, blue: b, alpha: 1});
  
  world.getDimension(dimension).spawnParticle(`${particle}`, {x: xLoc, y: yLoc, z: zLoc}, customColor);
}

function getFace(blockFace) {
  let vector;
  switch (blockFace) {
    case Direction.East:
      vector = { x: 1, y: 0, z: 0 };
      break;
    case Direction.West:
      vector = { x: -1, y: 0, z: 0 };
      break;
    case Direction.Up:
      vector = { x: 0, y: 1, z: 0 };
      break;
    case Direction.Down:
      vector = { x: 0, y: -1, z: 0 };
      break;
    case Direction.North:
      vector = { x: 0, y: 0, z: 1 };
      break;
    case Direction.South:
      vector = { x: 0, y: 0, z: -1 };
      break;
    default: 
      vector = { x: 0, y: 0, z: 0 };
      break;
  }
  return vector;
}
function getDirection(rotation) {
  let direction;
  let type;
  if (rotation >= -45 && rotation <= 44) {
    direction = "North";
  }
  if (rotation >= -135 && rotation <= -44) {
    direction = "East";
  }
  if (rotation >= 45 && rotation <= 134) {
    direction = "West";
  }
  if (direction == undefined) {
    direction = "South";
  }
  
  if (direction == "North" || direction == "South") {
    type = "longitude";
  }
  if (direction == "East" || direction == "West") {
    type = "latitude";
  }
  return [direction, type];
}
function calc_OE(spellArray) {
  let numList = [];
  let oppList = [];
  for (let word of spellArray) {
    for (let type of typeWord) {
      if (word == type.word) {
        numList.push(type.OE_cost.number);
        oppList.push(type.OE_cost.operation);
      }
    }
    for (let effect of effectWord) {
      if (word == effect.word) {
        numList.push(effect.OE_cost.number);
        oppList.push(effect.OE_cost.operation);
      }
    }
    for (let modifier of modifierWord) {
      if (word == modifier.word) {
        numList.push(modifier.OE_cost.number);
        oppList.push(modifier.OE_cost.operation);
      }
    }
  }
  
  if (toString.call(numList) !== "[object Array]") {
    return;
  }
  let total = 0;
  for (let i = 0; i < numList.length; i++) {
    if (isNaN(numList[i])) {
      continue;
    }
    switch (oppList[i]) {
      case "multiply":
        total *= numList[i]*1;
        break;
      case "divide":
        total /= numList[i]*1;
        break;
      case "add":
        total += numList[i]*1;
        break;
    }
  }
  return Math.ceil(total);
}
function reduceDurability(player, inventory, item, currentDurability, amount) {
  if (item.getComponent("durability").maxDurability > currentDurability) {
    let newItem = new ItemStack(item.typeId, 1);
    newItem.nameTag = item.nameTag;
    newItem.setLore(item.getLore());
    newItem.getComponent("durability").damage = item.getComponent("durability").damage + amount;
    
    inventory.setItem(player.selectedSlot, newItem);
  }
}
function checkValidity(spellArray) {
  for (let word of spellArray) {
    if (!([...typeWord, ...effectWord, ...modifierWord].map((e) => e.word).includes(word))) {
      return false;
    }
  }
  return true;
}
function checkItems(player, item) {
  let inventory = player.getComponent("inventory").container;
  if (item == "none") {
    return true;
  }
  for (let x = 0; x < 9; x++) {
    if (inventory.getItem(x) != undefined && inventory.getItem(x).typeId == item) {
      return true;
    }
  }
  return false;
}
function getDuration(effect) {
  let value = 0;
  for (let eft of effectWord) {
    if (eft.value != undefined && eft.word == effect) {
      value = eft.value.duration;
    }
  }
  return value;
}

function castSelf(effect, modifier, player) {
  let isSpell = false;
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
        case "douse":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
        case "frost":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
      }
    }
  }
  
  for (let mdfr of modifierWord) {
    for (let mod of modifier) {
      if (mod == mdfr.word && mdfr.valid.includes(`${effect}`)) {
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
  
  spawnParticle(`${getParticle(player)[0] + "self"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
  
  if (spellType == "potion_effect") {
    if (spellEffect.effect != "clear") {
      player.runCommandAsync(`effect @s ${spellEffect.effect} ${spellModifier[1]} ${spellModifier[0]} true`);
    } else {
      player.runCommandAsync(`effect @s ${spellEffect.effect}`);
    }
  }
  
  if (spellType == "damage") {
    player.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "heal") {
    let playerHealth = player.getComponent(EntityHealthComponent.componentId).currentValue;
    let heal = playerHealth + (spellEffect.healValue * spellModifier[2]);
    player.getComponent(EntityHealthComponent.componentId).setCurrentValue(heal);
  }
  
  if (spellType == "lightning") {
    player.runCommandAsync('summon lightning_bolt ~~~');
  }
  
  if (spellType == "burn") {
    player.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
    player.setOnFire(5 * spellModifier[2], true);
  }
  
  if (spellType == "douse") {
    player.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
    player.extinguishFire(true);
  }
  
  if (spellType == "frost") {
    player.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "explosion") {
    player.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[4][0] ? true : spellEffect.destructive, causesFire: spellModifier[4][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[4][1] ? true : spellEffect.underWater});
  }
  
  if (spellType == "launch") {
    player.applyKnockback(player.getViewDirection().x * spellModifier[3], player.getViewDirection().z * spellModifier[3], spellEffect.horizontal + spellModifier[0], spellEffect.vertical + spellModifier[0]);
  }
}
function castTouch(effect, modifier, player, target) {
  let isSpell = false;
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
        case "douse":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
        case "frost":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
      }
    }
  }
  
  for (let mdfr of modifierWord) {
    for (let mod of modifier) {
      if (mod == mdfr.word && mdfr.valid.includes(`${effect}`)) {
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
  
  spawnParticle(`${getParticle(player)[0] + "hit"}`, target.location.x, target.location.y, target.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
  
  if (spellType == "potion_effect") {
    if (spellEffect.effect != "clear") {
      target.runCommandAsync(`effect @s ${spellEffect.effect} ${spellModifier[1]} ${spellModifier[0]} false`);
    } else {
      target.runCommandAsync(`effect @s ${spellEffect.effect}`);
    }
  }
  
  if (spellType == "damage") {
    target.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "burn") {
    target.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
    target.setOnFire(5 * spellModifier[2], true);
  }
  
  if (spellType == "douse") {
    target.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
    target.extinguishFire(true);
  }
  
  if (spellType == "frost") {
    target.runCommandAsync(`damage @s ${spellEffect.damageValue * spellModifier[2]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "heal") {
    let targetHealth = target.getComponent(EntityHealthComponent.componentId).currentValue;
    let heal = targetHealth + (spellEffect.healValue * spellModifier[2]);
    target.getComponent(EntityHealthComponent.componentId).setCurrentValue(heal);
  }
  
  if (spellType == "lightning") {
    target.runCommandAsync('summon lightning_bolt ~~~');
  }
  
  if (spellType == "explosion") {
    target.dimension.createExplosion({x: player.location.x, y: player.location.y,  z: player.location.z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[4][0] ? true : spellEffect.destructive, causesFire: spellModifier[4][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[4][1] ? true : spellEffect.underWater});
  }
  
  if (spellType == "launch") {
    if (target.typeId != "minecraft:item") {
      target.applyKnockback(player.getViewDirection().x * spellModifier[3], player.getViewDirection().z * spellModifier[3], spellEffect.horizontal + spellModifier[0], spellEffect.vertical + spellModifier[0]);
    }
  }
}
function castTouchBlock(effect, modifier, player, block, blockFace) {
  let x = block.location.x;
  let y = block.location.y;
  let z = block.location.z;
  
  let isSpell = false;
  let spellType;
  let spellEffect;
  let modifierType;
  var spellModifier = [0, 0, "null", [false, false]];
  
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
  
  for (let mdfr of modifierWord) {
    for (let mod of modifier) {
      if (mod == mdfr.word && mdfr.valid.includes(`${effect}`)) {
        modifierType = mdfr.modifierType;
        switch (modifierType) {
          case "null":
            break;
          case "power":
            spellModifier[0] = spellModifier[0] + mdfr.value;
            break;
          case "radius":
            spellModifier[1] = spellModifier[1] + mdfr.value;
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
  
  spawnParticle(`${getParticle(player)[0] + "hit"}`, x, y, z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
  
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
    block.dimension.runCommandAsync(`summon lightning_bolt ${x} ${y + 1} ${z}`);
  }
  
  if (spellType == "explosion") {
    block.dimension.createExplosion({x: x, y: y,  z: z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[3][0] ? true : spellEffect.destructive, causesFire: spellModifier[3][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[3][1] ? true : spellEffect.underWater});
  }
}
function castPulse(effect, modifier, player) {
  let isSpell = false;
  let spellType;
  let spellEffect;
  let modifierType;
  var spellModifier = [0, getDuration(effect), 3, 1, 1, [false, false]];
  
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
        case "douse":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
        case "frost":
          spellType = efct.effectType;
          spellEffect = efct.value;
          break;
      }
    }
  }
  
  for (let mdfr of modifierWord) {
    for (let mod of modifier) {
      if (mod == mdfr.word && mdfr.valid.includes(`${effect}`)) {
        modifierType = mdfr.modifierType;
        switch (modifierType) {
          case "null":
            break;
          case "power":
            spellModifier[0] = spellModifier[0] + mdfr.value;
            spellModifier[3] = spellModifier[0] + mdfr.value;
            break;
          case "duration":
            spellModifier[1] = spellModifier[1] * mdfr.value;
            break;
          case "radius":
            spellModifier[2] = spellModifier[2] * mdfr.value;
            break;
          case "reverse":
            spellModifier[4] = -1;
            break;
          case "explosion":
            if (mdfr.value == "fireDamage") {
              spellModifier[5][0] = true;
            }
            if (mdfr.value == "waterDamage") {
              spellModifier[5][1] = true;
            }
            break;
        }
      }
    }
  }
  
  spawnParticle(`${getParticle(player)[0] + "pulse"}`, player.location.x, player.location.y, player.location.z, player.dimension.id, getParticle(player)[1][0], getParticle(player)[1][1], getParticle(player)[1][2]);
  
  if (spellType == "potion_effect") {
    if (spellEffect.effect != "clear") {
      player.runCommandAsync(`effect @e[rm=1, r=${spellModifier[2]}] ${spellEffect.effect} ${spellModifier[1]} ${spellModifier[0]} false`);
    } else {
      player.runCommandAsync(`effect @e[rm=1, r=${spellModifier[2]}] ${spellEffect.effect}`);
    }
  }
  
  if (spellType == "damage") {
    player.runCommandAsync(`damage @e[rm=1, r=${spellModifier[2]}] ${spellEffect.damageValue * spellModifier[3]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "burn") {
    player.runCommandAsync(`damage @e[rm=1, r=${spellModifier[2]}] ${spellEffect.damageValue * spellModifier[3]} ${spellEffect.damageType} entity ${player.name}`);
    
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      entity.setOnFire(5 * spellModifier[2], true);
    }
  }
  
  if (spellType == "douse") {
    player.runCommandAsync(`damage @e[rm=1, r=${spellModifier[2]}] ${spellEffect.damageValue * spellModifier[3]} ${spellEffect.damageType} entity ${player.name}`);
    
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      entity.extinguishFire(true);
    }
  }
  
  if (spellType == "frost") {
    player.runCommandAsync(`damage @e[rm=1, r=${spellModifier[2]}] ${spellEffect.damageValue * spellModifier[3]} ${spellEffect.damageType} entity ${player.name}`);
  }
  
  if (spellType == "heal") {
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      let entityHealth = entity.getComponent(EntityHealthComponent.componentId).currentValue;
      let heal = entityHealth + (spellEffect.healValue * spellModifier[3]);
      
      entity.getComponent(EntityHealthComponent.componentId).setCurrentValue(heal);
    }
  }
  
  if (spellType == "lightning") {
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      entity.runCommandAsync('summon lightning_bolt ~~~');
    }
  }
  
  if (spellType == "explosion") {
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      entity.dimension.createExplosion({x: entity.location.x, y: entity.location.y,  z: entity.location.z}, 3 + (spellModifier[0] + 1), {breaksBlocks: spellModifier[5][0] ? true : spellEffect.destructive, causesFire: spellModifier[5][0] ? true : spellEffect.spawnFire, allowUnderwater: spellModifier[5][1] ? true : spellEffect.underWater});
    }
  }
  
  if (spellType == "launch") {
    let entities = player.dimension.getEntities({maxDistance: spellModifier[2], excludeNames: [`${player.name}`], location: {x: player.location.x, y: player.location.y, z: player.location.z}});
    for (let entity of entities) {
      if (entity.typeId != "minecraft:item") {
        entity.applyKnockback(player.getViewDirection().x * spellModifier[4], player.getViewDirection().z * spellModifier[4], spellEffect.horizontal + spellModifier[0], spellEffect.vertical + spellModifier[0]);
      }
    }
  }
}

function castProj(effectArrays, player) {
  const proj = world.getDimension(`${player.dimension.id}`).spawnEntity("bw:projectile", {x: player.location.x + player.getViewDirection().x * 2, y: player.location.y + 0.5 * 2, z: player.location.z + player.getViewDirection().z * 2});
  
  proj.clearVelocity;
  proj.applyImpulse({x: player.getViewDirection().x * 2, y: player.getViewDirection().y * 2, z: player.getViewDirection().z * 2});
  
  let fullSpell = '';
  for (let i = 0; i < effectArrays.length; i++) {
    if (i == 0) {
      fullSpell += `[${effectArrays[i][0]},${effectArrays[i][1]},${effectArrays[i][2]}]`;
    } else {
      fullSpell += ` + [${effectArrays[i][0]},${effectArrays[i][1]},${effectArrays[i][2]}]`;
    }
  }
  
  proj.runCommandAsync(`tag @s add "projSpells:${fullSpell}"`);
}

function processSpell(array, playerName) {
  const plr = world.getPlayers({name: playerName})[0];
  const inv = plr.getComponent("inventory").container;
  const items = inv.getItem(plr.selectedSlot);
  
  let effectName = array[0];
  let typeName = array [1];
  let modifierName = [array[2], array[3]];
  for (let type of typeWord) {
    if (type.word == effectName && !checkPlayerTags(type.tag, plr)) {
      effectName = '???';
    }
  }
  for (let effect of effectWord) {
    if (effect.word == typeName && !checkPlayerTags(effect.tag, plr)) {
      typeName = '???';
    }
  }
  for (let modifier of modifierWord) {
    if (modifier.word == modifierName[0]) {
      if (checkItems(plr, modifier.required.item)) {
        if (modifier.required.consumed == true) {
          let reqItem = modifier.required.item.replace("minecraft:", "");
          plr.runCommandAsync(`clear @s ${reqItem} 0 1`);
        }
      } else {
        modifierName[0] = '???';
      }
    }
    if (modifier.word == modifierName[1]) {
      if (checkItems(plr, modifier.required.item)) {
        if (modifier.required.consumed == true) {
          let reqItem = modifier.required.item.replace("minecraft:", "");
          plr.runCommandAsync(`clear @s ${reqItem} 0 1`);
        }
      } else {
        modifierName[1] = '???';
      }
    }
  }
  
  let testLore = items.getLore();
  let testDouble = `${effectName} + ${typeName}`;
  
  for (let test of testLore) {
    let spell = test.split(' + ');
    let spellFragment = `${spell[0]} + ${spell[1]}`;
    
    if (typeName != "SINBASHUS" && testDouble == spellFragment) {
      return;
    }
  }
  
  let lore = items.getLore();
  if (effectName != "YIS") {
    lore.push(`${effectName} + ${typeName} + ${modifierName[0]} + ${modifierName[1]}`);
  }
  if (effectName == "YIS") {
    lore.unshift(`${effectName} + ${typeName} + ${modifierName[0]} + ${modifierName[1]}`);
  }
  
  let newWand;
  if (items.typeId == "bw:empty_spell_journal" || items.typeId == "bw:spell_journal") {
    newWand = new ItemStack("bw:spell_journal", 1);
    newWand.setLore(lore);
  } else {
    newWand = new ItemStack("bw:inscribed_rune", items.amount);
    newWand.setLore(lore);
  }
  
  inv.setItem(plr.selectedSlot, newWand);
  return;
}
function addSpellName(name, player) {
  let inventory = player.getComponent("inventory").container;
  let item = inventory.getItem(player.selectedSlot);
  item.nameTag = `${name}`; 
  
  inventory.setItem(player.selectedSlot, item);
}


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
        castProj(projectileArray, player);
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
          castProj(projectileArray, player, item.getLore()[0]);
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