/* jshint maxerr: 10000 */
import {world, system, ItemStack, MolangVariableMap, EntityHealthComponent} from "@minecraft/server";
import {ActionFormData, ModalFormData} from "@minecraft/server-ui";
import {incantBook} from "./dictionary.js";
import {confirmIncant, processSpell} from "./spellCreation.js";

let armor = [];
let tools = [];

function randomSpellName() {
  let alphabet = ["a", "a", "a", "b", "c", "d", "e", "e", "e", "f", "g", "h", "i", "i", "j", "k", "l", "m", "n", "o", "o", "o", "p", "q", "r", "s", "t", "u", "u", "u", "v", "w", "x", "y", "z"];
  let numOfLetters = Math.round(Math.random() * 10) + 3;
  let word = "";
  for (let i = 0; i < numOfLetters; i++) {
    if (i == 0) {
      word += alphabet[Math.round(Math.random() * (alphabet.length-1))].toUpperCase();
    } else {
      word += alphabet[Math.round(Math.random() * (alphabet.length-1))];
    }
  }
  return word;
}
function defineIncantment(player, item) {
  let options = ["When Attacked", "On Attack", "On Use", "On Interval"];
  let spellForm = new ModalFormData();
  spellForm.title("Scribe Incantment");
  spellForm.textField("Incantment Name", "Name...", randomSpellName());
  spellForm.dropdown("Incantment Trigger", options, 0);
  spellForm.show(player).then(res => {
    if (res.canceled) {
      return;
    }
    
    let newItem = new ItemStack("bs:empty_enchanted_book", 1);
    newItem.nameTag = res.formValues[0];
    let inchant = {
      "trigger": options[res.formValues[1]],
      "spell": ""
    };
    newItem.setDynamicProperty("bs:psuedoEnchant", JSON.stringify(inchant));
    
    if (item.amount > 1) {
      item.amount = item.amount - 1;
    } else {
      item = undefined;
    }
    
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    world.getDimension(player.dimension.id).spawnItem(newItem, player.location);
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
  });
}
function defineSpell(player, item) {
  let spellForm = new ModalFormData();
  spellForm.title("Inscribe Incantation");
  spellForm.textField("Incantation Name", "Name...", randomSpellName());
  spellForm.textField("Incantation", "Incants...");
  spellForm.textField("Incantation Notes", "This incantation does...");
  spellForm.show(player).then(res => {
    if (res.canceled) {
      return;
    }
    let incantation = res.formValues[1].replaceAll("  ", " ").replaceAll("  ", " ").replaceAll("\"", "").toUpperCase();
    let inc = incantation.split(" ");
    for (let word of inc) {
      let check = confirmIncant(word, player);
      if (!check[0]) {
        incantation = incantation.replaceAll(` ${word}`, ` §c${word}§r`).replaceAll(`${word} `, `§k${word}§r `);
      }
      if (!check[1]) {
        incantation = incantation.replaceAll(` ${word}`, ` §k${word}§r`).replaceAll(`${word} `, `§k${word}§r `);
      }
    }
    
    let newItem = new ItemStack("bs:spell_page", 1);
    newItem.nameTag = res.formValues[0];
    newItem.setDynamicProperty("bs:spell", incantation);
    newItem.setDynamicProperty("bs:spellnotes", res.formValues[2]);
    newItem.setDynamicProperty("bs:magus", player.name);
    
    if (item.amount > 1) {
      item.amount = item.amount - 1;
    } else {
      item = undefined;
    }
    
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    world.getDimension(player.dimension.id).spawnItem(newItem, player.location);
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
  });
}
function editSpell(player, item) {
  let spellForm = new ModalFormData();
  spellForm.title("Inscribe Incantation");
  spellForm.textField("Incantation Name", "Name...", item.nameTag);
  spellForm.textField("Incantation", "Incants...", item.getDynamicProperty('bs:spell').replaceAll('§r', '').replaceAll('§k', '').replaceAll('§c', ''));
  spellForm.textField("Incantation Notes", "This incantation does...", item.getDynamicProperty('bs:spellnotes') != undefined ? item.getDynamicProperty('bs:spellnotes') : "");
  spellForm.show(player).then(res => {
    if (res.canceled) {
      return;
    }
    
    let incantation = res.formValues[1].replaceAll("  ", " ").replaceAll("  ", " ").replaceAll("\"", "").toUpperCase();
    let inc = incantation.split(" ");
    for (let word of inc) {
      let check = confirmIncant(word, player);
      if (!check[0]) {
        incantation = incantation.replaceAll(` ${word}`, ` §c${word}§r`).replaceAll(`${word} `, `§k${word}§r `);
      }
      if (!check[1]) {
        incantation = incantation.replaceAll(` ${word}`, ` §k${word}§r`).replaceAll(`${word} `, `§k${word}§r `);
      }
    }
    
    item.nameTag = res.formValues[0];
    item.setDynamicProperty("bs:spell", incantation);
    item.setDynamicProperty("bs:spellnotes", res.formValues[2]);
    
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    player.runCommandAsync(`playsound block.cartography_table.use @a[r=6] ~~~ 1`);
  });
}

world.afterEvents.playerInteractWithBlock.subscribe(scribe => {
  const item = scribe.itemStack;
  const magus = scribe.player;
  const magusQuill = magus.getComponent('equippable').getEquipment('Offhand');
  const scribeDesk = scribe.block;
  
  if (scribeDesk != undefined && scribeDesk.typeId == "minecraft:lectern" && item != undefined && item.typeId == "minecraft:paper" && magusQuill != undefined && magusQuill.typeId == "bs:ink_quill") {
    if (item.getDynamicProperty("bs:spell") == undefined) {
      defineSpell(magus, item);
    }
  }
  if (scribeDesk != undefined && scribeDesk.typeId == "minecraft:lectern" && item != undefined && item.typeId == "bs:spell_page" && magusQuill != undefined && magusQuill.typeId == "bs:ink_quill") {
      editSpell(magus, item);
    }
  
  // Incantments
  if (scribeDesk != undefined && scribeDesk.typeId == "minecraft:lectern" && item != undefined && item.typeId == "minecraft:book" && magusQuill != undefined && magusQuill.typeId == "bs:ink_quill") {
      if (item.getDynamicProperty("bs:psuedoEnchant") == undefined) {
        defineIncantment(magus, item);
      }
    }
    
    
    
    
    
    
    // Encapsulation
  if (scribeDesk != undefined && scribeDesk.typeId == "minecraft:lectern" && item != undefined && item.typeId == "bs:lapis_staff" && magusQuill != undefined && magusQuill.hasTag("bs:research_paper")) {
    let lapisBlock = scribeDesk.dimension.getBlock({x: scribeDesk.location.x, y: scribeDesk.location.y - 1, z: scribeDesk.location.z});
    let flowers = ["minecraft:poppy", "minecraft:blue_orchid", "minecraft:allium", "minecraft:azure_bluet", "minecraft:red_tulip", "minecraft:orange_tulip", "minecraft:white_tulip", "minecraft:pink_tulip", "minecraft:oxeye_daisy", "minecraft:cornflower", "minecraft:lily_of_the_valley", "minecraft:sunflower", "minecraft:lilac", "minecraft:rose_bush", "minecraft:peony", "minecraft:yellow_flower"]
    if (lapisBlock.typeId == "minecraft:lapis_block" && flowers.includes(scribeDesk.north().typeId) && flowers.includes(scribeDesk.west().typeId) && flowers.includes(scribeDesk.east().typeId) && flowers.includes(scribeDesk.south().typeId)) {
      if (!magus.hasTag("bs:magus")) {
        magus.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"You have not been initiated into the Arcanic Arts. §cThis rite does not concern you.§r\"}]}`);
        return;
      }
      let arcana = world.scoreboard.getObjective("bs:arcana")?.getScore(magus.scoreboardIdentity);
      if (arcana == undefined || arcana < 500) {
        magus.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§dA minimum of 500 arcana is required to initiate this rite.§r\"}]}`);
        magus.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§dA minimum of 500 arcana is required to initiate this rite.§r\"}]}`);
        return;
      } else {
        magus.runCommandAsync(`scoreboard players remove @s bs:arcana 500`);
      }
      let animals = scribeDesk.dimension.getEntities({location: scribeDesk.location, maxDistance: 6, type: "minecraft:pig"}).concat(scribeDesk.dimension.getEntities({location: scribeDesk.location, maxDistance: 6, type: "minecraft:chicken"}), scribeDesk.dimension.getEntities({location: scribeDesk.location, maxDistance: 6, type: "minecraft:cow"}), scribeDesk.dimension.getEntities({location: scribeDesk.location, maxDistance: 6, type: "minecraft:sheep"}));
      let steleAmount = magusQuill.getDynamicProperty("bs:spell").split(" ");
      let steleCost = steleAmount.length * 3;
      let lifeForceArcana = 0;
      let colors = JSON.parse(magus.getDynamicProperty("bs:trueColor"))
      let arcanaColor = new MolangVariableMap();
      magus.runCommandAsync(`playsound beacon.ambient @a[r=6] ~~~ 1`);
      if (colors != undefined) {
        arcanaColor.setColorRGB('variable.color', {red: colors.red, green: colors.green, blue: colors.blue, alpha: colors.alpha});
    
        world.getDimension(magus.dimension.id).spawnParticle("bs:encapsulation_particle", scribeDesk.location, arcanaColor);
      }
      system.runTimeout(t => {
        for (let ani of animals) {
          lifeForceArcana += Math.round(ani.getComponent(EntityHealthComponent.componentId).currentValue);
        }
        if (lifeForceArcana >= steleCost) {
          let sharedDamage = Math.ceil(steleCost/animals.length)
          for (let ani of animals) {
            ani.applyDamage(sharedDamage, {cause: "override"});
          }
          let stele = new ItemStack("bs:clay_stele", 1)
          stele.nameTag = magusQuill.nameTag;
          stele.setDynamicProperty("bs:charges", 30);
          stele.setDynamicProperty("bs:onCast", magusQuill.getDynamicProperty("bs:spell"));
          stele.setDynamicProperty("bs:trueColor", magus.getDynamicProperty("bs:trueColor"));
          stele.setDynamicProperty("bs:level", world.scoreboard.getObjective("bs:arcLevel")?.getScore(magus.scoreboardIdentity));
          magus.getComponent("equippable").setEquipment("Offhand", undefined);
          world.getDimension(magus.dimension.id).spawnItem(stele, magus.location);
          magus.runCommandAsync(`playsound beacon.activate @a[r=6] ~~~ 1`);
        } else {
          magus.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§cThere is not enough lifeforce arcana in the area. You only have ${lifeForceArcana} out of the necessary ${steleCost}.§r\"}]}`);
          magus.runCommandAsync(`playsound beacon.deactivate @a[r=6] ~~~ 1`);
        }
      }, 100)
    }
  }
});

world.beforeEvents.itemUse.subscribe(e => {
  let item = e.itemStack;
  let player = e.source;
  let offhand = player.getComponent("equippable").getEquipment("Offhand");
  
  if (offhand != undefined && offhand.typeId == "bs:enchanted_book" && item.typeId.endsWith("_helmet") || item.typeId.endsWith("_chestplate") || item.typeId.endsWith("_leggings") || item.typeId.endsWith("_boots")) {
    item.setDynamicProperty("bs:psuedoEnchant", offhand.getDynamicProperty("bs:psuedoEnchant"));
    player.getComponent("inventory").container.setItem(player.selectedSlotIndex, item);
    player.getComponent("equippable").setEquipment("Offhand", undefined);
  }
});