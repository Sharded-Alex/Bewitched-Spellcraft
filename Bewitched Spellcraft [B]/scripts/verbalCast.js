import {world, system, ItemStack, MolangVariableMap} from "@minecraft/server";
import {Vector3} from "./VectorMath/index.js";
import {processSpell} from "./spellCreation.js";

world.beforeEvents.chatSend.subscribe(e => {
  let player = e.sender;
  let msg = e.message;
  let allCaps = msg.toUpperCase();
  if (player.hasTag("bs:magus") && (allCaps.endsWith("SINFAN") || allCaps.endsWith("SINFAN "))) {
    e.cancel = true;
    let spellWords = allCaps.split(" ");
    let refinedWords = [];
    for (let spl of spellWords) {
      if (spl != "0" && Number(spl) == 0) {
        continue;
      } else {
        refinedWords.push(spl);
      }
    }
    processSpell(refinedWords, player, {"bool": false}, true);
  }
});