import {world, system} from "@minecraft/server";
import "./incantedWords.js";
import "./spellPiece.js";
import "./tagAddition.js";
import "./tagReqs.js";
import "./spellFunctions.js";
import {createForm} from "./formCreate.js";

export function checkPlayerTags(tags, player) {
  if (tags == undefined) { return true; }
  for (let i of tags) {
    if (!player.hasTag(i)) { return false; }
  }
  return true;
}

world.afterEvents.itemUse.subscribe(e => {
  const item = e.itemStack;
  const itemLore = item.getLore();
  const player = e.source;
  const inv = player.getComponent('inventory').container;
  const heldItem = inv.getItem(player.selectedSlot);
  if (item != undefined && item.typeId == "bw:bewitched_book") {
    if (itemLore.length == 0) {
      let lore = `§3Owner: ${player.name}§r`;
      heldItem.keepOnDeath = true;
      heldItem.setLore([lore]);
      player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"§3${player.name}, this book has bound itself to you. You cannot lose it on death.§r\"}]}`);
      inv.setItem(player.selectedSlot, heldItem);
    }
    let ownerName = player.name;
    let bookOwner = itemLore[0].slice(9, item.getLore()[0].length - 2);
    
    if (ownerName == bookOwner) {
      createForm("spell_guide", player);
    }
  }
});