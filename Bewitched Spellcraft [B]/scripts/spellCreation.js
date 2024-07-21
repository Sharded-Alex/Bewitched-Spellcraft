/* jshint maxerr: 10000 */
import {world, system, ItemStack, EntityHealthComponent, BlockVolume, BlockVolumeBase, BlockPermutation, MolangVariableMap, MoonPhase} from "@minecraft/server";
import {ActionFormData, ModalFormData} from "@minecraft/server-ui";
import {incantBook} from "./dictionary.js";
import {arcaneLvl} from "./arcanaInfo.js";
import {Vector3} from "./VectorMath/index.js";
import {baseParticles, triggerCustomParticle} from "./particleGen.js";
import {localizePos} from "./localize.js";

export function confirmIncant (incant, caster) {
  let found = false;
  let known = false;
  if (Number(incant) || incant == "0") {
    return [true, true];
  }
  for (const [key, value] of Object.entries(incantBook)) {
    if (incant == key) {
      found = true;
      if (caster.hasTag(value.tag)) {
        known = true;
      }
    }
  }
  return [found, known];
}

function sleep(time) {
  return new Promise((resolve) => {
    system.runTimeout(resolve, time);
  });
}

export let spellNull = {
  "type": "Null"
};

class IncantationStack {
  constructor() {
    this.spellData = [];
    this.spellMemory = spellNull;
    this.nestedLists = 0;
  }
  
  // Adds 1 piece of data to the top of
  // the stack
  push(data) {
    this.spellData.push(data);
  }
  
  // Adds 2 pieces of data to the top of
  // the stack
  shove(data, data2) {
    this.spellData.push(data);
    this.spellData.push(data2);
  }
  
  // Adds 3 pieces of data to the top of
  // the stack
  force(data, data2, data3) {
    this.spellData.push(data);
    this.spellData.push(data2);
    this.spellData.push(data3);
  }
  
  // Gets the top of the stack and then
  // removes it
  pop() {
    if (this.spellData.length == 0) {
      return {"type": "Null"};
    }
    return this.spellData.pop();
  }
  
  // Gets the 2 values at the top of the
  // stack and removes them
  explode() {
    if (this.spellData.length <= 1) {
      return {"type": "Null"};
    }
    let values = [];
    for (let i = 1; i < 3; i++) {
      values.push(this.spellData.pop());
    }
    return values;
  }
  
  // Gets the 3 values at the top of the
  // stack and removes them
  rupture() {
    if (this.spellData.length <= 2) {
      return {"type": "Null"};
    }
    let values = [];
    for (let i = 1; i < 4; i++) {
      values.push(this.spellData.pop());
    }
    return values;
  }
  
  // Gets the top of the stack without
  // removing it
  peek() {
    return this.spellData[this.spellData.length - 1];
  }
  
  // Gets the 2 values at the top of the
  // stack without removing them
  look() {
    let values = [];
    for (let i = 1; i < 3; i++) {
      values.push(this.spellData[this.spellData.length - i]);
    }
    return values;
  }
  
  // Gets the 3 values at the top of the
  // stack without removing them
  observe() {
    let values = [];
    for (let i = 1; i < 4; i++) {
      values.push(this.spellData[this.spellData.length - i]);
    }
    return values;
  }
  
  // Gets the 4 values at the top of the
  // stack without removing them
  percieve() {
    let values = [];
    for (let i = 1; i < 5; i++) {
      values.push(this.spellData[this.spellData.length - i]);
    }
    return values;
  }
  
  akashicLength() {
    return this.spellData.length;
  }
  
  isNotEmpty() {
    if (this.spellData.length == 0) {
      return false;
    }
    return true;
  }
  
  giveStack() {
    return this.spellData;
  }
  
  giveMemory() {
    return this.spellMemory;
  }
  
  setMemory(cluster) {
    this.spellMemory = cluster;
  }
  
  clearMemory() {
    this.spellMemory = spellNull;
  }
  
  debugStack() {
    let str = "\n§lThe Akashic§r\n";
    for (let i = 0; i < this.spellData.length; i++) {
      if (this.spellData[i].type == "Null") {
        str += "NULL §8§kI SEE... NOTHONG!§r,\n";
      } else 
      if (this.spellData[i].type == "Vector") {
        str += `§aVector§r: [${this.spellData[i].value.x.toFixed(2)}, ${this.spellData[i].value.y.toFixed(2)}, ${this.spellData[i].value.z.toFixed(2)}],\n`;
      } else
      if (this.spellData[i].type == "Number") {
        if (this.spellData[i].subtype == undefined) {
          str += `§aNumber§r: ${this.spellData[i].value},\n`;
        }
        if (this.spellData[i].subtype == "Health") {
          str += `§aHealth§r: ${this.spellData[i].value},\n`;
        }
      } else
      if (this.spellData[i].type == "Boolean") {
        str += `§aBoolean§r: ${this.spellData[i].value},\n`;
      } else
      if (this.spellData[i].type == "Entity") {
        str += `§aEntity§r: ${this.spellData[i].value.typeId},\n`;
      } else
      if (this.spellData[i].type == "Block") {
        str += `§aBlock§r: ${this.spellData[i].value.typeId},\n`;
      } else
      if (this.spellData[i].type == "Item") {
        str += `§aItem§r: ${this.spellData[i].value.typeId} (${this.spellData[i].value.amount}),\n`;
      } else
      if (this.spellData[i].type == "Particle") {
        str += `§aParticle§r: ${this.spellData[i].value.typeId} (${this.spellData[i].value.amount}),\n`;
      } else
      if (this.spellData[i].type == "List") {
        let list = this.spellData[i].value;
        let closed = this.spellData[i].closed;
        if (closed == undefined) {
          let listStr = "";
          for (let item of list) {
            if (item.type == "Null") {
              listStr += "NULL, ";
            } else 
            if (item.type == "Vector") {
              listStr += `§gVector§r: [${item.value.x.toFixed(2)}, ${item.value.y.toFixed(2)}, ${item.value.z.toFixed(2)}], `;
            } else
            if (item.type == "Health") {
              listStr += `§gHealth§r: ${item.value}, `;
            } else
            if (item.type == "Number") {
              listStr += `§gNumber§r: ${item.value}, `;
            } else
            if (item.type == "Boolean") {
              listStr += `§gBoolean§r: ${item.value}, `;
            } else
            if (item.type == "Entity") {
              listStr += `§gEntity§r: ${item.value.typeId}, `;
            } else
            if (item.type == "Block") {
              listStr += `§gBlock§r: ${item.value.typeId}, `;
            } else
            if (item.type == "Item") {
              listStr += `§gItem§r: ${item.value.typeId} (${item.value.amount}), `;
            } else {
              listStr += `${item}, `;
            }
          }
          str += `§aList§r: [${JSON.stringify(listStr.slice(0, listStr.length - 2)).replaceAll("\"", "")}],\n`;
        } else {
          if (!closed) {
            str += `§aList§r: Unclosed List`;
          } else {
            str += `§aList§r: ${JSON.stringify(list).replaceAll("\"", "").replaceAll("ABI,", "§d[§r").replaceAll(",VIR", "§d]§r").replaceAll(",", " ")},\n`;
          }
        }
      } else {
        str += `§aUntyped Value§r: ${this.spellData[i]},\n`;
      }
    }
    return str.slice(0, str.length - 2);
  }
}

function turnAngle(dotProduct, mag1, mag2) {
  let rad = Math.acos(dotProduct/mag1*mag2);
  return Math.round(rad * 180/Math.PI);
}

function dotProduct(a, b) {
  return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
}

function readSpell(player, item) {
  let spellForm = new ActionFormData();
  spellForm.title(item.nameTag);
  spellForm.body(`Incantation: ${item.getDynamicProperty("bs:spell")}\nMagus: ${item.getDynamicProperty("bs:magus")}\n\n${item.getDynamicProperty("bs:spellnotes")}\n\n`);
  spellForm.button("Close");
  spellForm.show(player).then(res => {
    if (res.canceled || res.selection == 0) {
      return;
    }
  });
}

function readTome(player, spellInfo) {
  let info = JSON.parse(spellInfo);
  let spellForm = new ActionFormData();
  
  let arcanic = info.incantation;
  if (info.obfuscated && info.owner != player.name) {
    arcanic = `§k${info.incantation}§r`
  }
  
  if (!info.blank) {
    spellForm.title(info.spell);
    spellForm.body(`Incantation: ${arcanic}\nMagus: ${info.owner}\n\n${info.notes}\n\n`);
    spellForm.button("Close");
  } else {
    spellForm.title("Empty Page");
    spellForm.body(`\n\n\n\n\n\n\n\n`);
    spellForm.button("Close");
  }
  spellForm.show(player).then(res => {
    if (res.canceled || res.selection == 0) {
      return;
    }
  });
}

function getPercentage(num, max) {
  return (num/max) * 100;
}
function parseString(spellString) {
  let str = spellString.replaceAll("  ", " ").replaceAll("  ", " ").replaceAll("\"", "");
  return str;
}

export function parseProperty(spellString) {
  let str = spellString.replaceAll("  ", " ").replaceAll("  ", " ").split(" ");
  return str;
}

function inRange(block, player, range) {
  const xDiff = block.x - player.x;
  const yDiff = block.y - player.y;
  const zDiff = block.z - player.z;
  if (xDiff < -range && xDiff < range) {
    return false;
  }
  if (yDiff < -range && yDiff < range) {
    return false;
  }
  if (zDiff < -range && zDiff < range) {
    return false;
  }
  
  return true;
}

// Checks if an entity is warded, then switches the cluster accordingly.
function checkWards(caster, entity) {
  let target = entity;
  if (entity.getDynamicProperty("bs:wardMagick") != undefined) {
    let wardObj = JSON.parse(entity.getDynamicProperty("bs:wardMagick"));
    if (caster == entity) {
      return target;
    }
    
    if (wardObj.form == "mirror") {
      target = caster;
      if (wardObj.power > 1) {
        wardObj.power--;
        console.warn(entity, JSON.parse(wardObj));
        entity.setDynamicProperty("bs:wardMagick", wardObj);
      } else {
        entity.setDynamicProperty("bs:wardMagick", undefined);
      }
    }
  }
  return target;
}

export function worldPowerLaw(inputValue, casterLevel, riseValue, steleSpell) {
  if (steleSpell.bool) {
    let steleLevel = Math.abs(steleSpell.lvl * riseValue)
    if (Math.abs(inputValue) <= steleLevel) {
      return inputValue;
    } else {
      return steleLevel;
    }
  }
  
  let spellLevel = Math.abs(casterLevel * riseValue)
  if (Math.abs(inputValue) <= spellLevel) {
    return inputValue;
  } else {
    return spellLevel;
  }
}

export async function processSpell(incantment, caster, memory, hasStele, usedPaper = false) {
  let worldMage = world.getDimension(caster.dimension.id);
  let casterLevel = world.scoreboard.getObjective("bs:arcLevel").getScore(caster.scoreboardIdentity);
  const iStack = new IncantationStack();
  iStack.spellMemory = memory;
  let arcanaCost = 0;
  let error = {
    "id": 0,
    "position": 1,
    "word": ""
  };
  
  for (let word of incantment) {
    let check = confirmIncant(word, caster);
    if (!check[0] && typeof word != "object") {
      error.id = 5; // Invalid Word
      error.position += incantment.indexOf(word);
      error.word = word;
      break;
    }
    
    if (typeof word == "object") {
      if (word !== null) {
        iStack.push(word)
      }
    }
    
    if (!caster.isValid()) {
      return caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"The World takes you as its price for your request...\"}]}`);
    }
    // Add to List stuff
    if (iStack.nestedLists > 0 && iStack.isNotEmpty() && iStack.peek().type == "List" && !iStack.peek().closed) {
      
      let list = iStack.pop();
        
      if (word == "ABI") {
        iStack.nestedLists += 1;
        list.value.push(word);
      } else
      if (word == "VIR") {
        iStack.nestedLists -= 1;
        if (iStack.nestedLists == 0) {
          list.closed = true;
        } else {
          list.value.push(word);
        }
      } else {
        list.value.push(word);
      }
      
      iStack.push(list);
      if (!list.closed) {
        continue;
      }
    }
    
    // Basic Incants
    // {
    if (word == "ETE") {
      iStack.push({
        "type": "Entity",
        "value": caster
      });
    }
    if (word == "WIX") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Vector"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let radius = iStack.pop().value;
        let location = iStack.pop().value;
        let circleEntities = worldMage.getEntities({location: location, maxDistance: radius});
        let listEntities = [];
        for (let ent of circleEntities) {
          listEntities.push({
            "type": "Entity",
            "value": ent
          })
        }
        
        if (listEntities.length > 0) {
          iStack.push({
            "type": "List",
            "value": listEntities
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "FIRUGEA") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Vector") {
          let cluster = iStack.pop();
          iStack.push({
            "type": "Block",
            "value": worldMage.getBlock(cluster.value)
          });
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESIZON") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        let info = iStack.peek();
        if (validTypes != info.type) {
          console.warn(validTypes, info.type)
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        let cluster = checkWards(caster, iStack.pop().value);
        if (!cluster.isValid()) {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        let forwardVec = new Vector3(cluster.getViewDirection().x, cluster.getViewDirection().y, cluster.getViewDirection().z);
        let circleEntities = worldMage.getEntities({location:cluster.location, maxDistance: 8, minDistance: 0});
        let entityVecs = [];
        let dotProducts = [];
        let detectedEntities = [];
        
        if (circleEntities.length != 0) {
          for (let entity of circleEntities) {
            let vec = Vector3.normalize(Vector3.subtract(entity.location, cluster.value.location));
            entityVecs.push(vec);
          }
          
          for (let vecs of entityVecs) {
            let vDot = dotProduct(forwardVec, vecs);
            dotProducts.push(vDot);
          }
          
          for (let i = 0; i < dotProducts.length; i++) {
            let length1 = Vector3.magnitude(forwardVec);
            let length2 = Vector3.magnitude(entityVecs[i]);
            if (turnAngle(dotProducts[i], length1, length2) < 60) {
              detectedEntities.push({
                "type": "Entity",
                "value": circleEntities[i]
              });
            }
          }
        }
        
        if (detectedEntities.length > 0) {
          iStack.push({
            "type": "List",
            "value": detectedEntities
          });
        } else {
          iStack.push(spellNull)
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESIJIT") {
      let validTypes = "Entity";
      let seenEntity = spellNull;
      if (iStack.akashicLength() >= 1) {
        if (validTypes == iStack.peek().type) {
          let viewer = checkWards(caster, iStack.pop().value);
          if (!viewer.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          seenEntity = viewer.getEntitiesFromViewDirection()[0];
        }
        
        if (seenEntity != undefined && seenEntity.type != "Null") {
          iStack.push({
            "type": "Entity",
            "value": seenEntity.entity
          });
        } else {
          iStack.push(spellNull); // The target was not found
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESIFIR") {
      let validTypes = "Entity";
      let seenBlock = spellNull;
      if (iStack.akashicLength() >= 1) {
        if (validTypes == iStack.peek().type) {
          let viewer = checkWards(caster, iStack.pop().value);
          if (!viewer.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          seenBlock = viewer.getBlockFromViewDirection();
          if (seenBlock == undefined) {
            seenBlock = spellNull;
          }
        }
        
        if (seenBlock.type != "Null") {
          iStack.push({
            "type": "Block",
            "value": seenBlock.block,
          });
        } else {
          iStack.push(spellNull); // The target was not found
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESIPAL") {
      let validTypes = "Entity";
      let seenBlock = spellNull;
      if (iStack.akashicLength() >= 1) {
        if (validTypes == iStack.peek().type) {
          let viewer = checkWards(caster, iStack.pop().value);
          if (!viewer.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          seenBlock = viewer.getBlockFromViewDirection();
          if (seenBlock == undefined) {
            seenBlock = spellNull;
          }
        }
        
        if (seenBlock != undefined && seenBlock.type != "Null") {
          iStack.push({
            "type": "Vector",
            "value": seenBlock.faceLocation,
          });
        } else {
          iStack.push(spellNull); // The target was not found
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESILIB") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Entity") {
          let cluster = checkWards(caster, iStack.pop().value);
          if (!cluster.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          iStack.push({
            "type": "Vector",
            "value": cluster.getViewDirection()
          });
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "GEA") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Entity" || typeCheck.type == "Block") {
          let cluster = checkWards(caster, iStack.pop().value);
          if (!cluster.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          iStack.push({
            "type": "Vector",
            "value": cluster.location
          });
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BIEGEA") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Entity") {
          let cluster = checkWards(caster, iStack.pop().value);
          if (!cluster.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          iStack.push({
            "type": "Vector",
            "value": cluster.getHeadLocation()
          });
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "IRAPAL") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Vector","Entity"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let oldVec = iStack.pop().value;
        let entity = checkWards(caster, iStack.pop().value);
        let newVec = spellNull;
        
        if (entity.isValid()) {
          newVec = localizePos(entity.location, entity.getViewDirection(), oldVec);
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        iStack.push({
          "type": "Vector",
          "value": newVec
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "DEBUG") {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${iStack.debugStack()}\"}]}`);
    }
    // }
    
    // Number Incants
    // {
    if (Number(word)) {
      iStack.push({
        "type": "Number",
        "value": word * 1
      });
    }
    if (word == "0") {
      iStack.push({
        "type": "Number",
        "value": 0
      });
    }
    if (word == "IRONIM") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Number";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        iStack.push({
          "type": "Number",
          "value": Math.round(iStack.pop().value)
        })
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Constant Incants
    // {
    if (word == "IRA") {
      iStack.push({
        "type": "Boolean",
        "value": true
      });
    }
    if (word == "IRO") {
      iStack.push({
        "type": "Boolean",
        "value": false
      });
    }
    if (word == "HET") {
      iStack.push(spellNull);
    }
    // # Constant Vectors
    if (word == "MALIBHET") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.zero()
      });
    }
    if (word == "MALIBIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.up()
      });
    }
    if (word == "MALIBFIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.down()
      });
    }
    if (word == "MALIBDIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.right()
      });
    }
    if (word == "MALIBCIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.left()
      });
    }
    if (word == "MALIBKIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.forward()
      });
    }
    if (word == "MALIBJIE") {
      iStack.push({
        "type": "Vector",
        "value": Vector3.back()
      });
    }
    // # PI
    if (word == "HAFOZON") {
      iStack.push({
        "type": "Number",
        "value": Math.PI
      });
    }
    // # Full Turn (cuz why not?)
    if (word == "HOLOZON") {
      iStack.push({
        "type": "Number",
        "value": 6.283185307179586476925287
      });
    }
    // }
    
    // Math Incants
    // # Operators
    // {
    if (word == "SINVERA") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 2) {
        let typeCheck = iStack.look();
        if ((typeCheck[0].type == "Number" || typeCheck[0].type == "Vector") && (typeCheck[1].type == "Number" || typeCheck[1].type == "Vector")) {
          let cluster = iStack.explode();
          if (cluster[0].type == "Number" && cluster[1].type == "Number") {
            iStack.push({
              "type": "Number",
              "value": cluster[0].value + cluster[1].value
            });
          } else 
          if (cluster[0].type == "Vector" && cluster[1].type == "Vector") {
            let vector = Vector3.add(cluster[0].value, cluster[1].value);
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else {
            error.id = 2; // Incompatible Values
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINVARA") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 2) {
        let typeCheck = iStack.look();
        if ((typeCheck[0].type == "Number" || typeCheck[0].type == "Vector") && (typeCheck[1].type == "Number" || typeCheck[1].type == "Vector")) {
          let cluster = iStack.explode();
          if (cluster[0].type == "Number" && cluster[1].type == "Number") {
            iStack.push({
              "type": "Number",
              "value": cluster[1].value - cluster[0].value
            });
          } else 
          if (cluster[0].type == "Vector" && cluster[1].type == "Vector") {
            let vector = Vector3.subtract(cluster[1].value, cluster[0].value);
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else {
            error.id = 2; // Incompatible Values
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "TOCOVER") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 2) {
        let typeCheck = iStack.look();
        if ((typeCheck[0].type == "Number" || typeCheck[0].type == "Vector") && (typeCheck[1].type == "Number" || typeCheck[1].type == "Vector")) {
          let cluster = iStack.explode();
          if (cluster[0].type == "Number" && cluster[1].type == "Number") {
            iStack.push({
              "type": "Number",
              "value": cluster[1].value * cluster[0].value
            });
          } else 
          if (cluster[0].type == "Vector" && cluster[1].type == "Vector") {
            let vector = Vector3.multiply(cluster[1].value, cluster[0].value);
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else
          if (cluster[0].type == "Number" && cluster[1].type == "Vector") {
            let vector = Vector3.scale(cluster[1].value, cluster[0].value);
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else {
            error.id = 2; // Incompatible Values
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "TOCOVAR") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 2) {
        let typeCheck = iStack.look();
        if ((typeCheck[0].type == "Number" || typeCheck[0].type == "Vector") && (typeCheck[1].type == "Number" || typeCheck[1].type == "Vector")) {
          let cluster = iStack.explode();
          if (cluster[0].type == "Number" && cluster[1].type == "Number") {
            iStack.push({
              "type": "Number",
              "value": cluster[1].value / cluster[0].value
            });
          } else 
          if (cluster[0].type == "Vector" && cluster[1].type == "Vector") {
            let vector = Vector3.divide(cluster[1].value, cluster[0].value);
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else
          if (cluster[0].type == "Number" && cluster[1].type == "Vector") {
            let vector = Vector3.divide(cluster[1].value, new Vector3(cluster[0].value, cluster[0].value, cluster[0].value));
            iStack.push({
              "type": "Vector",
              "value": {"x": vector.x, "y": vector.y, "z": vector.z}
            });
          } else {
            error.id = 2; // Incorrect Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Akashic Incants
    // {
    if (word == "XABAS") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 2) {
        let clusters = iStack.explode();
        iStack.shove(clusters[0], clusters[1]);
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINJIT") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        iStack.push(iStack.peek());
      }
    }
    if (word == "HUSGIM") {
      break;
    }
    if (word == "YINGIM") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        iStack.pop();
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "XIBFAN") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Number") {
          let delay = Math.abs(iStack.pop().value) * 20;
          if (delay > 200) {
            delay = 200;
          }
          // Pause the code
          await sleep(delay);
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // List Manipulators
    // {
    if (word == "BURABI") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "List") {
          let cluster = iStack.pop();
          iStack.push(cluster.value[cluster.value.length - 1]);
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BURVIR") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "List") {
          let cluster = iStack.pop();
          iStack.push(cluster.value[0]);
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BURNIM") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","List"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let index = iStack.pop().value;
        let array = iStack.pop().value;
        
        if (array[index] != undefined) {
          iStack.push(array[index]);
        } else {
          iStack.push(spellNull)
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BURKALAGIM") {
      if (iStack.akashicLength() >= 3) {
        let validTypes = ["Number","Number","List"];
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let end = iStack.pop().value;
        let start = iStack.pop().value;
        let array = iStack.pop().value;
        
        iStack.push({
          "type": "List",
          "value": array.splice(start, end)
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINVERAKAL") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["List","List"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let secondList = iStack.pop().value;
        let firstList = iStack.pop().value;
        let result = firstList.concat(secondList);
        
        
        iStack.push({
          "type": "List",
          "value": result
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "XABAKAL") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "List";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes != validTypes) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let list = iStack.pop().value;
        let newList = [];
        for (let i = list.length-1; i >= 0; i--) {
          newList.push(list[i])
        }
        
        iStack.push({
          "type": "List",
          "value": newList
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINAKAL") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Number";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes != validTypes) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let iteration = iStack.pop().value;
        let akashicList = [];
        arrayLoop: for (let i = 0; i < iteration; i++) {
          if (i < iStack.akashicLength()) {
            akashicList.push(iStack.spellData[(iStack.akashicLength() - 1) - i])
          } else {
            break arrayLoop;
          }
        }
        
        iStack.push({
          "type": "List",
          "value": akashicList
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "LIBAKAL") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "List";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes != validTypes) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let list = iStack.pop().value;
        
        iStack.push({
          "type": "Number",
          "value": list.length
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "YUTSINFAN") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["List","List"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let secondList = iStack.pop().value;
        let firstList = iStack.pop().value;
        
        for (let value of firstList) {
          let newSpell = [value].concat(secondList);
          await processSpell(newSpell, caster, iStack.spellMemory, hasStele, usedPaper);
        }
        
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINFAN") {
      if (iStack.akashicLength() >= 1) {
        let option = 0;
        let validTypes = "List";
        let validTypes2 = "Null";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes == validTypes) {
          option = 1;
        } else 
        if (foundTypes == validTypes2) {
          option = 2;
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (option == 1) {
          let list = iStack.pop().value;
          let result = await processSpell(list, caster, iStack.spellMemory, hasStele, usedPaper);
          
          for (let cluster of result.spellData) {
            iStack.push(cluster);
          }
          iStack.setMemory(result.spellMemory);
        }
        if (option == 2) {
          continue;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // Essentially Parenthesis Incants
    if (word == "ABI") {
      iStack.push({
        "type": "List",
        "value": [],
        "closed": false
      });
      iStack.nestedLists += 1;
    }
    // }
    
    // Memory Incants
    // {
    if (word == "SINWIS") {
      if (iStack.akashicLength() >= 1) {
        iStack.setMemory(iStack.pop());
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BURWIS") {
      iStack.push(iStack.spellMemory);
    }
    if (word == "YINWIS") {
      iStack.clearMemory();
    }
    // }
    
    // Ward Incants
    // {
    if (word == "CULIFAN") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Entity"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let wards = Math.abs(iStack.pop().value);
        if (wards > 5) {
          wards = 5;
        }
        let entity = checkWards(caster, iStack.pop().value);
        if (!entity.isValid()) {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        let ward = {
          "form": "mirror",
          "power": wards
        }
        
        entity.setDynamicProperty("bs:wardMagick", JSON.stringify(ward));
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Item Manipulators
    /* {
    if (word == "ITEYIC") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Entity") {
          let cluster = iStack.pop();
          if (cluster.value.typeId == "minecraft:item") {
            iStack.push({
              "type": "Item"
              "value": cluster.value.getComponent("item").itemStack
            })
          } else {
            error.id = 7; // Cannot be purified into an Item
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BURITE") {
      if (iStack.akashicLength() >= 3) {
        let validTypes = ["Entity","Number"];
        let validTypes2 = ["Block","Number"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) == JSON.stringify(validTypes)) {
          option = 1;
        } else 
        if (JSON.stringify(foundTypes) == JSON.stringify(validTypes2)) {
          option = 2;
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.z = iStack.pop().value;
        values.y = iStack.pop().value;
        values.x = iStack.pop().value;
        
        iStack.push({
          "type": "Vector",
          "value": new Vector3(values.x, values.y, values.z)
        });
        if (!hasStele.bool) {
          arcanaCost += 15;
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${15}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    } */
    
    // Logical Operator
    // {
    if (word == "OR") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Boolean","Boolean"];
        let values = {
          "valOne": null,
          "valTwo": null
        };
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.valTwo = iStack.pop().value;
        values.valOne = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.valOne || values.valTwo
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "AND") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Boolean","Boolean"];
        let values = {
          "valOne": null,
          "valTwo": null
        };
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          if (info == undefined) {
            return;
          }
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.valTwo = iStack.pop().value;
        values.valOne = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.valOne && values.valTwo
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "NOT") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Boolean";
        let value = null;
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        value = !iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": value
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "JIT") {
      if (iStack.akashicLength() >= 2) {
        let info = iStack.explode();
        let bool = false;
        if (JSON.stringify(info[0].value) == JSON.stringify(info[1].value)) {
          bool = true;
        }
        iStack.push({
          "type": "Boolean",
          "value": bool
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "IRAJIT") {
      if (iStack.akashicLength() >= 2) {
        let info = iStack.explode();
        let bool = false;
        if (JSON.stringify(info[0]) == JSON.stringify(info[1])) {
          bool = true;
        }
        iStack.push({
          "type": "Boolean",
          "value": bool
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "JIRVAR") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Number"];
        let values = {
          "number1": null,
          "number2": null
        };
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.number2 = iStack.pop().value;
        values.number1 = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.number1 < values.number2
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "JIRVARJIT") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Number"];
        let values = {
          "number1": null,
          "number2": null
        };
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.number2 = iStack.pop().value;
        values.number1 = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.number1 <= values.number2
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "JIRVER") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Number"];
        let values = {
          "number1": null,
          "number2": null
        };
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.number2 = iStack.pop().value;
        values.number1 = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.number1 > values.number2
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "JIRVERJIT") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number","Number"];
        let values = {
          "number1": null,
          "number2": null
        };
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.number2 = iStack.pop().value;
        values.number1 = iStack.pop().value;
        
        iStack.push({
          "type": "Boolean",
          "value": values.number1 >= values.number2
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "IF") {
      if (iStack.akashicLength() >= 3) {
        let validTypes = ["List","List","Boolean"];
        let values = {
          "bool": false,
          "onTrue": spellNull,
          "onFalse": spellNull
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.onFalse = iStack.pop().value;
        values.onTrue = iStack.pop().value;
        values.bool = iStack.pop().value;
        if (values.bool) {
          iStack.push({
            "type": "List",
            "value": values.onTrue
          });
        } else {
          iStack.push({
            "type": "List",
            "value": values.onFalse
          });
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "WHEN") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["List","Boolean"];
        let values = {
          "bool": false,
          "onTrue": spellNull
        };
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.onTrue = iStack.pop().value;
        values.bool = iStack.pop().value;
        
        if (values.bool) {
          iStack.push({
            "type": "List",
            "value": values.onTrue
          });
        } else {
          iStack.push(spellNull);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Vectorials
    // {
    if (word == "SINAFIL") {
      if (iStack.akashicLength() >= 3) {
        let validTypes = ["Number","Number","Number"];
        let values = {
          "x": spellNull,
          "y": spellNull,
          "z": spellNull
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        values.z = iStack.pop().value;
        values.y = iStack.pop().value;
        values.x = iStack.pop().value;
        
        iStack.push({
          "type": "Vector",
          "value": new Vector3(values.x, values.y, values.z)
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "YINAFIL") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Vector";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let arr = Object.values(iStack.pop().value);
        
        for (let i = 0; i < arr.length; i++) {
          iStack.push({
            "type": "Number",
            "value": arr[i]
          })
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "LIBAFIL") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Vector";
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        iStack.push({
          "type": "Number",
          "value": Vector3.magnitude(iStack.pop().value)
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "LIBAS") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Vector","Vector"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        iStack.push({
          "type": "Number",
          "value": Vector3.distance(iStack.pop().value, iStack.pop().value)
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "IROKIE") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Vector";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let vec = iStack.pop().value
        
        iStack.push({
          "type": "Vector",
          "value": new Vector3(Math.round(vec.x), Math.round(vec.y), Math.round(vec.z))
        })
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Queries
    // {
    if (word == "MALEME?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isSprinting
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "XIBFIE?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isSneaking
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "GELAQAR?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isInWater
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "GELACOR?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isOnGround
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALBIE?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isJumping
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALFIE?") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let entity = iStack.pop().value
        if (entity.isValid) {
          iStack.push({
            "type": "Boolean",
            "value": entity.isFalling
          });
        } else {
          error.id = 4; // Null Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "YIC?") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Entity") {
          let cluster = checkWards(caster, iStack.pop().value);
          if (!cluster.isValid()) {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
          let health = 0;
          if (cluster != undefined) {
            health = cluster.getComponent(EntityHealthComponent.componentId).currentValue;
          }
          iStack.push({
            "type": "Number",
            "subtype": "Health",
            // Get Entity's health
            "value": health
          });
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // Tasks
    // The first value is the top of the Akashic
    // # Alchemical Incants
    // {
    if (word == "HESAYIC") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 10, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("regeneration", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("regeneration", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALBIE") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 15, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 4 ? 4 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("jump_boost", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("jump_boost", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 5) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 5) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALVER") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 10, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("speed", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("speed", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALFIEVAR") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 20, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("slow_falling", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("slow_falling", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ESIEME") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 15, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("night_vision", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("night_vision", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "XABESI") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 20, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("invisibility", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("invisibility", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 5) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 5) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "YINILIC") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 15, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("haste", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("haste", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "QARCUL") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 20, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("water_breathing", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("water_breathing", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BISCUL") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 20, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("fire_resistance", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("fire_resistance", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    
    if (word == "SEMAYIQ") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 5, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("poison", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("poison", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALVAR") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 5, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("slowness", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("slowness", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALBASCOR") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 5, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("levitation", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("levitation", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 10) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 10) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "REDESI") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 8, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 0 ? 0 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("blindness", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("blindness", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 8) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 8) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALVARYIQ") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 15, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("hunger", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("hunger", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "ABRACADABRA") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 10, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("nausea", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("nausea", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 15) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 15) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "YIXYIQ") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Number","Number","Boolean"];
        let values = {
          "duration": null,
          "amplifier": null,
          "showParticles": null
        };
        
        let info = iStack.observe();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Number") {
          values.duration = Math.floor(Math.abs(worldPowerLaw(iStack.pop().value, casterLevel, 5, hasStele)))
        }
        if (iStack.peek().type == "Number") {
          let amp = Math.abs(iStack.pop().value);
          values.amplifier = Math.floor(amp > 2 ? 2 : amp);
        }
        if (iStack.peek().type == "Boolean") {
          values.showParticles = iStack.pop().value;
        }
        if (iStack.peek() != undefined && iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (values.amplifier == 0) {
            target.addEffect("wither", values.duration * 20, {showParticles: values.showParticles});
          } else {
            target.addEffect("wither", values.duration * 20, {amplifier: values.amplifier, showParticles: values.showParticles});
          }
          if (!hasStele.bool) {
            arcanaCost += Math.abs((values.duration + 20) * (values.amplifier + 1));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.abs((values.duration + 20) * (values.amplifier + 1))}`);
          }
        } else {
          error.id = 4; // Detected Null Clusters
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // # Elemental Incants
    // {
    if (word == "BIS") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let option = 0;
        let validTypes = "Vector";
        let validTypes2 = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes == validTypes) {
          option = 1;
        } else 
        if (foundTypes == validTypes2) {
          option = 2;
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (option == 1) {
          let pos = iStack.pop().value;
          let fire = BlockPermutation.resolve("minecraft:fire");
          let air = BlockPermutation.resolve("minecraft:air");
          let ice = BlockPermutation.resolve("minecraft:ice");
          let lava = BlockPermutation.resolve("minecraft:flowing_lava");
          let stone = BlockPermutation.resolve("minecraft:stone");
          
          worldMage.fillBlocks(new BlockVolume(pos, pos), fire, {blockFilter: {includeTypes: ["minecraft:air"]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), air, {blockFilter: {includeTypes: ["minecraft:ice"]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), lava, {blockFilter: {includeTypes: ["minecraft:stone"]}});
          if (!hasStele.bool) {
            arcanaCost += 5;
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
          }
        }
        if (option == 2) {
          let entity = checkWards(caster, iStack.pop().value);
          if (entity.isValid()) {
            entity.setOnFire(6, true);
            if (!hasStele.bool) {
              arcanaCost += 5;
              caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
            }
          } else {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "QAR") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let option = 0;
        let validTypes = "Vector";
        let validTypes2 = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes == validTypes) {
          option = 1;
        } else 
        if (foundTypes == validTypes2) {
          option = 2;
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (option == 1) {
          let pos = iStack.pop().value;
          let water = BlockPermutation.resolve("minecraft:flowing_water", {"liquid_depth": 15});
          let fire = BlockPermutation.resolve("minecraft:fire");
          let air = BlockPermutation.resolve("minecraft:air");
          let lava = BlockPermutation.resolve("minecraft:flowing_lava");
          let stone = BlockPermutation.resolve("minecraft:stone");
          
          worldMage.fillBlocks(new BlockVolume(pos, pos), water, {blockFilter: {includeTypes: ["minecraft:air"]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), air, {blockFilter: {includeTypes: ["minecraft:fire"]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), stone, {blockFilter: {includeTypes: ["minecraft:flowing_lava"]}});
          if (!hasStele.bool) {
            arcanaCost += 5;
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
          }
        }
        if (option == 2) {
          let entity = checkWards(caster, iStack.pop().value);
          if (entity.isValid()) {
            entity.extinguishFire(true);
            if (!hasStele.bool) {
              arcanaCost += 5;
              caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
            }
          } else {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "QARILIC") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let option = 0;
        let validTypes = "Vector";
        let validTypes2 = "Entity";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes == validTypes) {
          option = 1;
        } else 
        if (foundTypes == validTypes2) {
          option = 2;
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (option == 1) {
          let pos = iStack.pop().value;
          let frost = BlockPermutation.resolve("minecraft:powder_snow");
          let ice = BlockPermutation.resolve("minecraft:ice");
          let flowingWater = BlockPermutation.resolve("minecraft:flowing_water", {"liquid_depth": 15});
          let water = BlockPermutation.resolve("minecraft:water");
          let air = BlockPermutation.resolve("minecraft:air");
          
          worldMage.fillBlocks(new BlockVolume(pos, pos), frost, {blockFilter: {includeTypes: ["minecraft:air"]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), ice, {blockFilter: {includePermutations: [water]}});
          worldMage.fillBlocks(new BlockVolume(pos, pos), ice, {blockFilter: {includePermutations: [flowingWater]}});
          if (!hasStele.bool) {
            arcanaCost += 5;
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
          }
        }
        if (option == 2) {
          let entity = checkWards(caster, iStack.pop().value);
          if (entity.isValid()) {
            entity.applyDamage(4, {cause: "freezing"});
            if (!hasStele.bool) {
              arcanaCost += 5;
              caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${5}`);
            }
          } else {
            error.id = 4; // Null Cluster Type
            error.position += incantment.indexOf(word);
            error.word = word;
            break;
          }
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "FUS") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Vector") {
          let loc = iStack.pop().value;
          
          // Replace with water if air
          if (worldMage.getBlock(loc).typeId == "bs:fus_light") {
            worldMage.runCommandAsync(`fill ${loc.x} ${loc.y} ${loc.z} ${loc.x} ${loc.y} ${loc.z} air [] replace bs:fus_light []`);
          } else {
            worldMage.runCommandAsync(`setblock ${loc.x} ${loc.y} ${loc.z} bs:fus_light keep`);
          }
          if (!hasStele.bool) {
            arcanaCost += 10;
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${10}`);
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SINBASHUS") {
      // Check if the Akashic is empty
      if (iStack.akashicLength() >= 1) {
        let typeCheck = iStack.peek();
        if (typeCheck.type == "Vector") {
          let loc = iStack.pop().value;
          
          // Replace with water if air
          worldMage.runCommandAsync(`summon lightning_bolt ${loc.x} ${loc.y} ${loc.z}`);
          if (!hasStele.bool) {
            arcanaCost += 35;
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${35}`);
          }
        } else {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "BISHUSCOR") {
      if (iStack.akashicLength() >= 4) {
        let validTypes = ["Boolean","Boolean", "Number", "Vector"];
        let parameter = {
          "location": null,
          "radius": null,
          "breakBlocks": null,
          "causesFire": null
        };
        
        let info = iStack.percieve();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Boolean") {
          parameter.causesFire = iStack.pop().value;
        }
        if (iStack.peek().type == "Boolean") {
          parameter.breakBlocks = iStack.pop().value;
        }
        if (iStack.peek().type == "Number") {
          parameter.radius = worldPowerLaw(iStack.pop().value, casterLevel, 0.25, hasStele);
        }
        if (iStack.peek().type == "Vector") {
          parameter.location = iStack.pop().value;
        }
        
        worldMage.createExplosion(parameter.location, parameter.radius, {causesFire: parameter.causesFire, breaksBlocks: parameter.breakBlocks});
        
        if (!hasStele.bool) {
          arcanaCost += 15 * Math.pow(Math.abs(parameter.radius), 3);
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${15 * Math.pow(Math.abs(parameter.radius), 2)}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MAL") {
      if (iStack.akashicLength() >= 2) {
        let target = spellNull;
        let validTypes = ["Vector", "Entity"];
        let vector = spellNull;
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Vector") {
          let value = iStack.pop().value;
          vector = new Vector3(value.x, value.y, value.z);
        }
        if (iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          if (target.getComponent("projectile")) {
            target.clearVelocity();
            target.applyImpulse(vector);
          } else {
            target.applyImpulse(vector);
          }
        } else {
          error.id = 4; // Cluster Null Detected
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (!hasStele.bool) {
          arcanaCost += Math.round(4 * Math.abs(Vector3.magnitude(vector)));
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.round(4 * Math.abs(Vector3.magnitude(vector)))}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALJIE") {
      if (iStack.akashicLength() >= 4) {
        let target = spellNull;
        let validTypes = ["Vector","Number","Number","Entity"];
        let params = {
          "x": null,
          "y": null,
          "z": null,
          "horizontalStr": null,
          "verticalStr": null,
        };
        
        let info = iStack.percieve();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        if (iStack.peek().type == "Vector") {
          let value = iStack.pop().value;
          params.x = value.x;
          params.y = value.y;
          params.z = value.z;
        }
        if (iStack.peek().type == "Number") {
          params.horizontalStr = worldPowerLaw(iStack.pop().value, casterLevel, 0.5, hasStele);
        }
        if (iStack.peek().type == "Number") {
          params.verticalStr = worldPowerLaw(iStack.pop().value, casterLevel, 0.25, hasStele);
        }
        if (iStack.peek().type == "Entity") {
          target = checkWards(caster, iStack.pop().value);
          if (!target.isValid()) {
            target = spellNull;
          }
        }
        
        if (target.type != "Null") {
          target.applyKnockback(params.x, params.z, params.horizontalStr, params.verticalStr*params.y);
          
          if (!hasStele.bool) {
            arcanaCost += (Math.round(10 * Math.abs(params.horizontalStr) + Math.abs(params.verticalStr)));
            caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.round(10 * (Math.abs(params.horizontalStr) + Math.abs(params.verticalStr)))}`);
          }
        } else {
          error.id = 4; // Cluster Null
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALBIZON") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Vector","Vector"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let velocity = iStack.pop().value;
        let location = iStack.pop().value;
        
        let fireBall = worldMage.spawnEntity("bs:firecharge", location);
        fireBall.applyImpulse(velocity);
        iStack.push({
          "type": "Entity",
          "value": fireBall
        });
        
        if (!hasStele.bool) {
          arcanaCost += 15;
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${15}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // # Esoteric Incants
    // {
    if (word == "MALFAN") {
      if (iStack.akashicLength() >= 2) {
        let target = spellNull;
        let validTypes = ["Number", "Entity"];
        let multiplier = 0;
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        multiplier = worldPowerLaw(iStack.pop().value, casterLevel, 20, hasStele);
        target = checkWards(caster, iStack.pop().value);
        if (!target.isValid()) {
          error.id = 4; // Cluster Null
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let destination = Vector3.add(target.location, Vector3.scale(target.getViewDirection(), multiplier));
        let tp = target.teleport(destination);
        
        if (!hasStele.bool) {
          arcanaCost += Math.round(5 * Math.abs(multiplier));
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.round(5 * Math.abs(multiplier))}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "MALFANEME") {
      if (iStack.akashicLength() >= 2) {
        let target = spellNull;
        let validTypes = ["Vector", "Entity"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        let location = spellNull;
        location = iStack.pop().value;
        target = checkWards(caster, iStack.pop().value);
        if (!target.isValid()) {
          error.id = 4; // Cluster Null
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        let ogLoc = target.location;
        if (target.typeId == "minecraft:player") {
          let color = JSON.parse(caster.getDynamicProperty("bs:trueColor"));
          if (color != undefined) {
            target.runCommandAsync(`camera @s[type=player] fade time 0 0.5 0.5 color ${Math.round(color.red * 255)} ${Math.round(color.green * 255)} ${Math.round(color.blue * 255)}`);
          }
        }
        let tp = target.tryTeleport(location, {checkForBlocks: true});
        iStack.push({
          "type": "Boolean",
          "value": tp
        });
        
        if (!hasStele.bool) {
          arcanaCost += Math.round(Vector3.distance(ogLoc, location) * 2);
          caster.runCommandAsync(`scoreboard players remove @s bs:arcana ${Math.round(Vector3.distance(ogLoc, location) * 2)}`);
        }
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
    // # Illusion Incants
    // Emitter Incants
    // {
    if (word == "SPHERE") {
      let particle = JSON.parse(JSON.stringify(baseParticles));
      particle.particleType = "sphere";
      iStack.push({
        "type": "Particle",
        "value": particle
      });
    }
    // }
    
    // Modifier Incants
    // {
    if (word == "ACCELERATE") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Vector", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let vec = iStack.pop().value;
        let particle = iStack.pop().value;
        particle.acceleration = vec;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SPEED") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let spd = iStack.pop().value;
        let particle = iStack.pop().value;
        particle.speed = spd;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "RUNTIME") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let amount = 1;
        if (Math.abs(iStack.peek().value) <= 15) {
          amount = Math.abs(iStack.pop().value);
        } else {
          amount = 15;
        }
        let particle = iStack.pop().value;
        particle.runtime = amount;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "P_AMOUNT") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let amount = 3;
        if (Math.abs(iStack.peek().value) <= 1000) {
          amount = Math.abs(iStack.pop().value);
        } else {
          amount = 1000;
        }
        let particle = iStack.pop().value;
        particle.particle_density = amount;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "RADIUS") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let amount = 0.5;
        if (Math.abs(iStack.peek().value) <= 20) {
          amount = Math.abs(iStack.pop().value);
        } else {
          amount = 20;
        }
        let particle = iStack.pop().value;
        particle.radius = amount;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "SIZE") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let amount = Math.abs(iStack.pop().value);
        let particle = iStack.pop().value;
        particle.size = amount;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "LIFETIME") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Number", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let amount = 0;
        if (Math.abs(iStack.peek().value) <= 10) {
          amount = Math.abs(iStack.pop().value);
        } else {
          amount = 10;
        }
        let particle = iStack.pop().value;
        particle.lifeTime = amount;
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "COLOR") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["List", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let deciArray = iStack.pop().value;
        let particle = iStack.pop().value;
        particle.color = {
          "red": Number(deciArray[0]),
          "green": Number(deciArray[1]),
          "blue": Number(deciArray[2]),
          "alpha": 1,
        };
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "COLORIZE") {
      if (iStack.akashicLength() >= 1) {
        let validTypes = "Particle";
        
        let info = iStack.peek();
        let foundTypes = info.type;
        
        if (foundTypes != validTypes) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let particle = iStack.pop().value;
        if (caster.typeId == "minecraft:player" && caster.hasTag("bs:magus")) {
          particle.color = JSON.parse(caster.getDynamicProperty("bs:trueColor"))
        }
        iStack.push({
          "type": "Particle",
          "value": particle
        });
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    if (word == "DECORATE") {
      if (iStack.akashicLength() >= 2) {
        let validTypes = ["Vector", "Particle"];
        
        let info = iStack.look();
        let foundTypes = [];
        for (let i of info) {
          foundTypes.push(i.type);
        }
        
        if (JSON.stringify(foundTypes) != JSON.stringify(validTypes)) {
          error.id = 1; // Incorrect Cluster Type
          error.position += incantment.indexOf(word);
          error.word = word;
          break;
        }
        
        let location = iStack.pop().value;
        let particle = iStack.pop().value;
        triggerCustomParticle(location, worldMage, particle)
      } else {
        error.id = 3; // Not Enough Clusters
        error.position += incantment.indexOf(word);
        error.word = word;
        break;
      }
    }
    // }
    
  }
  
  if (error.id == 0) {
    let limit = world.scoreboard.getObjective("bs:arcanaL").getScore(caster.scoreboardIdentity);
    let percent = getPercentage(arcanaCost, limit);
    let triggered = false;
    if (!triggered && percent < 15) {
      triggered = true;
    }
    if (!triggered && percent < 35) {
      caster.runCommandAsync(`scoreboard players add @s bs:arcaneXP 1`);
      triggered = true;
    }
    if (!triggered && percent < 50) {
      caster.runCommandAsync(`scoreboard players add @s bs:arcaneXP 2`);
      triggered = true;
    }
    if (!triggered && percent < 75) {
      caster.runCommandAsync(`scoreboard players add @s bs:arcaneXP 3`);
      triggered = true;
    }
    if (!triggered && percent < 100) {
      caster.runCommandAsync(`scoreboard players add @s bs:arcaneXP 4`);
      triggered = true;
    }
    caster.runCommandAsync("scriptevent bs:levelUp");
  }
  
  if (error.id > 0 && usedPaper) {
    caster.runCommandAsync(`playsound random.anvil_land @a[r=6] ~~~ 1`);
    if (error.id == 1) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Cluster Confusion]§r:The World pauses at Incant §d${error.position}§r, §d${error.word}§r. It is confused by the Clusters used to describe this Task.§r\"}]}`);
    }
    if (error.id == 2) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Calculation Issue]§r:The World pauses at the Operator Incant at §d${error.position}§r, §d${error.word}§r. These values cannot be combined in this order. Perhaps I should swap their places?§r\"}]}`);
    }
    if (error.id == 3) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Not Enough Clusters]§r:The World pauses at Incant §d${error.position}§r, §d${error.word}§r. The Akashic doesn't have enough Clusters to attempt this magical operation.§r\"}]}`);
    }
    if (error.id == 4) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Valid Cluster Null]§r:The World pauses at Incant §d${error.position}§r, §d${error.word}§r. A strange Null Cluster was detected. It seems a subject of my Incantation is no longer valid.§r\"}]}`);
    }
    if (error.id == 5) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Invalid Incant]§r:The World pauses at Incant §d${error.position}§r, ${error.word}§r. It does not recognize it from any Lore. I may need to check if it exists. If it does, there is likely an extra space in this spell.§r\"}]}`);
    }
    if (error.id == 6) {
      caster.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§c[Irrational Error]§r: This incantation topples before it even begins. It is likely that I've included 1 or more spaces too many.§r\"}]}`);
    }
  }
  
  return iStack;
}

world.afterEvents.itemUse.subscribe(e => {
  let item = e.itemStack;
  let player = e.source;
  let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
  if (item != undefined && item.hasTag("bs:research_paper") && (offhand == undefined || !offhand.hasTag("bs:research_paper") || offhand.typeId != "bs:spell_journal")) {
    if (!player.isSneaking) {
      if (item.getDynamicProperty("bs:spell") != undefined) {
        let spellSentence = item.getDynamicProperty("bs:spell");
        let parsedSpell = parseProperty(spellSentence);
        
        if (parsedSpell != undefined) {
          let colors = JSON.parse(player.getDynamicProperty("bs:trueColor"))
          let arcanaColor = new MolangVariableMap();
          if (colors != undefined) {
            arcanaColor.setColorRGB('variable.color', {red: colors.red, green: colors.green, blue: colors.blue, alpha: colors.alpha});
        
            world.getDimension(player.dimension.id).spawnParticle("bs:cast_incantation_particle", player.location, arcanaColor);
          }
          player.runCommandAsync(`playsound mob.evocation_illager.cast_spell @a[r=6] ~~~ 1`);
          processSpell(parsedSpell, player, spellNull, {"bool": false}, true);
        }
      }
    } else {
      if (item.getDynamicProperty("bs:spell") != undefined && (offhand == undefined || offhand.typeId != "bs:spell_journal")) {
        player.runCommandAsync(`playsound item.book.page_turn @a[r=6] ~~~ 1`);
        readSpell(player, item);
      }
    }
  }
  
  if (item != undefined && item.hasTag("bs:research_paper") && offhand != undefined && offhand.typeId == "bs:spell_journal") {
    if (!player.isSneaking) {
      return;
    }
    
    let page = offhand.getDynamicProperty("grimoire:pageNumber");
    if (page == undefined) {
        let obj = {
          "blank": true,
          "obfuscated": false,
          "owner": undefined,
          "spell": "",
          "incantation": "",
          "notes": ""
        };
        offhand.setDynamicProperty("grimoire:pageNumber", 1);
        for (let i = 1; i < 11; i++) {
          offhand.setDynamicProperty(`grimoire:page${i}`, JSON.stringify(obj));
        }
        player.getComponent("equippable").setEquipment("Offhand", offhand);
      }
    let spellList = new ActionFormData()
    spellList.title = item.nameTag;
    spellList.body = "";
    for (let i = 1; i < 11; i++) {
      let page = JSON.parse(offhand.getDynamicProperty(`grimoire:page${i}`));
      spellList.button(page.spell == "" ? "Empty Page" : page.spell, page.incantation == "" ? "textures/items/paper" : "textures/items/tools/research");
    }
    spellList.show(player).then(res => {
      if (res.canceled) {
        return;
      }
      let spellPage = JSON.parse(offhand.getDynamicProperty(`grimoire:page${page}`));
      
      spellPage.blank = false;
      spellPage.spell = item.nameTag;
      spellPage.owner = item.getDynamicProperty("bs:magus");
      spellPage.incantation = item.getDynamicProperty("bs:spell");
      spellPage.notes = item.getDynamicProperty("bs:spellnotes");
      if (item.getDynamicProperty("bs:state") != undefined) {
        spellPage.obfuscated = true;
      }
    
      offhand.setDynamicProperty(`grimoire:page${res.selection + 1}`, JSON.stringify(spellPage));
      player.getComponent("equippable").setEquipment("Offhand", offhand);
      player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
      
      if (item.amount > 1) {
        item.amount -= 1;
      } else {
        item = undefined;
      }
      player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    });
  }
  
  if (item != undefined && ["minecraft:glow_ink_sac", "minecraft:ink_sac"].includes(item.typeId) && offhand != undefined && offhand.hasTag("bs:research_paper")) {
    
    if (item.typeId == "minecraft:ink_sac") {
      offhand.setDynamicProperty(`bs:state`, 'obfuscated');
      player.getComponent("equippable").setEquipment("Offhand", offhand);
      player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
    }
    if (item.typeId == "minecraft:glow_ink_sac") {
      if (offhand.getDynamicProperty("bs:state") == "obfuscated") {
        offhand.setDynamicProperty(`bs:state`, undefined);
        player.getComponent("equippable").setEquipment("Offhand", offhand);
        player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
      }
    }
    if (item.amount > 1) {
      item.amount -= 1;
    } else {
      item = undefined;
    }
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
  }
  
  if (item != undefined && item.typeId == "minecraft:paper" && offhand != undefined && offhand.typeId == "bs:spell_page") {
    
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
    world.getDimension(player.dimension.id).spawnItem(offhand, player.location);
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    if (item.amount > 1) {
      item.amount -= 1;
    } else {
      item = undefined;
    }
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
  }
  
  if (item != undefined && item.hasTag("bs:research_paper") && offhand != undefined && offhand.hasTag("bs:research_paper")) {
    if (item.getDynamicProperty("bs:spell") == undefined || offhand.getDynamicProperty("bs:spell") == undefined) {
      return;
    }
    
    let magus = item.getDynamicProperty("bs:magus");
    let newSpell = parseString(`${offhand.getDynamicProperty("bs:spell")} ${item.getDynamicProperty("bs:spell")}`);
    let newLore = parseString(`${offhand.getDynamicProperty("bs:spellnotes")} ${item.getDynamicProperty("bs:spellnotes")}`);
    
    let compoundResearch = new ItemStack("bs:compound_spell_page", 1);
    compoundResearch.nameTag = offhand.nameTag;
    compoundResearch.setDynamicProperty(`bs:magus`, magus);
    compoundResearch.setDynamicProperty(`bs:spell`, newSpell);
    compoundResearch.setDynamicProperty(`bs:spellnotes`, newLore);
    player.getComponent("equippable").setEquipment("Offhand", compoundResearch);
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
    
    item = undefined;
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
  }
  
  if (item != undefined && item.typeId == "bs:spell_journal") {
    let page = item.getDynamicProperty("grimoire:pageNumber");
    if (page == undefined) {
      let obj = {
        "blank": true,
        "obfuscated": false,
        "owner": undefined,
        "spell": "",
        "incantation": "",
        "notes": ""
      };
      item.setDynamicProperty("grimoire:pageNumber", 1);
      for (let i = 1; i < 11; i++) {
        item.setDynamicProperty(`grimoire:page${i}`, JSON.stringify(obj));
      }
      player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    }
    player.runCommandAsync(`playsound item.book.page_turn @a[r=6] ~~~ 1`);
    let spellList = new ActionFormData()
    spellList.title = item.nameTag;
    spellList.body = "";
    for (let i = 1; i < 11; i++) {
      let page = JSON.parse(item.getDynamicProperty(`grimoire:page${i}`));
      spellList.button(page.spell == "" ? "Empty Page" : page.spell, page.incantation == "" ? "textures/items/paper" : "textures/items/tools/research");
    }
    spellList.show(player).then(res => {
      if (res.canceled) {
        return;
      }
      player.runCommandAsync(`playsound item.book.page_turn @a[r=6] ~~~ 1`);
      return readTome(player, item.getDynamicProperty(`grimoire:page${res.selection + 1}`))
    });
  }
  
  if (item != undefined && item.hasTag("bs:stele")) {
    if (item.typeId == "bs:clay_stele") {
      let uses = item.getDynamicProperty("bs:charges");
      if (uses > 0) {
        let spellSentence = item.getDynamicProperty("bs:onCast");
        let parsedSpell = parseProperty(spellSentence);
        
        if (parsedSpell != undefined) {
          let colors = JSON.parse(item.getDynamicProperty("bs:trueColor"))
          let arcanaColor = new MolangVariableMap();
          if (colors != undefined) {
            arcanaColor.setColorRGB('variable.color', {red: colors.red, green: colors.green, blue: colors.blue, alpha: colors.alpha});
        
            world.getDimension(player.dimension.id).spawnParticle("bs:cast_incantation_particle", player.location, arcanaColor);
          }
          player.runCommandAsync(`playsound mob.evocation_illager.cast_spell @a[r=6] ~~~ 1`);
          processSpell(parsedSpell, player, spellNull, {"bool": true, "lvl": item.getDynamicProperty("bs:level")});
        }
        let newUse = uses - 1;
        if (newUse > 0) {
          item.setDynamicProperty("bs:charges", newUse);
          let lore = `Spell Charges: ${newUse}/30`;
          item.setLore([lore]);
          player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
        } else {
          item = undefined;
          player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
        }
      }
    }
  }
  
  if (item != undefined && item.typeId == "bs:lapis_staff" && offhand != undefined && offhand.typeId == "bs:spell_journal") {
    let page = offhand.getDynamicProperty("grimoire:pageNumber");
      
    if (!player.isSneaking) {
      if (page == undefined) {
        return;
      }
      let pageInfo = JSON.parse(offhand.getDynamicProperty(`grimoire:page${page}`));
      
      let parsedSpell = parseProperty(pageInfo.incantation);
      let colors = JSON.parse(player.getDynamicProperty("bs:trueColor"));
      let arcanaColor = new MolangVariableMap();
      if (colors != undefined) {
        arcanaColor.setColorRGB('variable.color', {red: colors.red, green: colors.green, blue: colors.blue, alpha: colors.alpha});
    
        world.getDimension(player.dimension.id).spawnParticle("bs:cast_incantation_particle", player.location, arcanaColor);
      }
      player.runCommandAsync(`playsound mob.evocation_illager.cast_spell @a[r=6] ~~~ 1`);
      processSpell(parsedSpell, player, spellNull, {"bool": false});
    } else {
      if (page == undefined) {
        let obj = {
          "blank": true,
          "obfuscated": false,
          "owner": undefined,
          "spell": "",
          "incantation": "",
          "notes": ""
        };
        offhand.setDynamicProperty("grimoire:pageNumber", 1);
        for (let i = 1; i < 11; i++) {
          offhand.setDynamicProperty(`grimoire:page${i}`, JSON.stringify(obj));
        }
      }
      player.runCommandAsync(`playsound item.book.page_turn @a[r=6] ~~~ 1`);
      let spellList = new ActionFormData()
      spellList.title = item.nameTag;
      spellList.body = "";
      for (let i = 1; i < 11; i++) {
        let page = JSON.parse(offhand.getDynamicProperty(`grimoire:page${i}`));
        spellList.button(page.spell == "" ? "Empty Page" : page.spell, page.incantation == "" ? "textures/items/paper" : "textures/items/tools/research");
      }
      spellList.show(player).then(res => {
        if (res.canceled) {
          return;
        }
        player.runCommandAsync(`playsound item.book.page_turn @a[r=6] ~~~ 1`);
        offhand.setDynamicProperty(`grimoire:pageNumber`, res.selection + 1);
        player.getComponent("equippable").setEquipment("Offhand", offhand);
      });
    }
  }
  
  if (item != undefined && item.hasTag("bs:research_paper") && offhand != undefined && offhand.typeId == "bs:empty_enchanted_book") {
    let inchant = JSON.parse(offhand.getDynamicProperty("bs:psuedoEnchant"));
    inchant.spell = item.getDynamicProperty("bs:spell");
    
    let newItem = new ItemStack("bs:enchanted_book", 1);
    newItem.setDynamicProperty("bs:psuedoEnchant", JSON.stringify(inchant));
    player.getComponent("equippable").setEquipment("Offhand", newItem);
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
      
    if (item.amount > 1) {
      item.amount -= 1;
    } else {
      item = undefined;
    }
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
  }
});