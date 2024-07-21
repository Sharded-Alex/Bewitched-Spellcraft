import {world, system} from "@minecraft/server";
import "./spellCreation.js";
import "./spellScribe.js";
import "./incantment.js";
import "./dictionary.js";
import {triggerForm} from "./bookScript.js";
import "./bookInfo_improv.js";
import "./tagReqs.js";
import "./tagAddition.js";
import "./arcanaInfo.js";
import "./localize.js";
import "./particleGen.js";
import "./verbalCast.js";


world.beforeEvents.worldInitialize.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("bs:useBehavior", {
    onUse() {}
  });
});

world.afterEvents.itemUse.subscribe(read => {
  let player = read.source;
  let item = read.itemStack;
  
  if (item != undefined && item.typeId == "bs:guide_book") {
    if (!player.hasTag("bs:magus")) {
      player.addTag("bs:magus");
      player.runCommandAsync("function magus_initiate");
      player.runCommandAsync("scoreboard players set @s bs:arcLevel 1");
    }
    if (player.getDynamicProperty("bs:trueColor") == undefined) {
      let color = {
        "red": Math.random(),
        "green": Math.random(),
        "blue": Math.random(),
        "alpha": 1
      }
      player.setDynamicProperty("bs:trueColor", JSON.stringify(color));
    }
    triggerForm("titlePage", player.name, player.dimension.id);
  }
  /* ### True Color Changing
  if (item != undefined && item.typeId == "minecraft:potion") {
    if (player.getDynamicProperty("bs:trueColor") != undefined) {
      player.setDynamicProperty("bs:trueColor", undefined);
    }
  }
  */
});