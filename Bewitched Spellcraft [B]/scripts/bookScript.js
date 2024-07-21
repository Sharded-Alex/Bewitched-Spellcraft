import {ActionFormData, ActionFormResponse, MessageFormData, ModalFormData} from "@minecraft/server-ui";
import {world, system} from "@minecraft/server";
import {information} from "./bookInfo_improv";

function doAction(action, player) {
  let playerName = player.nameTag;
  for (let i = 0; i < action.length; i++){
    switch (action[i].type) {
      case "sayInfo":
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${action[i].info}\"}]}`);
        break;
      case "addTag":
        player.runCommandAsync(`tag @s add ${action[i].tag}`);
        break;
      case "removeTag":
        player.runCommandAsync(`tag @s remove ${action[i].tag}`);
        break;
      case "giveXP":
        player.runCommandAsync(`xp ${action[i].amount} @s`);
        break;
      case "openForm":
        triggerForm(action[i].form, player.name, player.dimension.id);
        break;
    }
  }
}

export function checkPlayerTags(tags, player) {
  if (tags == undefined) { return true; }
  for (let i of tags) {
    if (!player.hasTag(i)) { return false; }
  }
  return true;
}

export function excludePlayerTags(tags, player) {
  if (tags == undefined) { return true; }
  for (let i of tags) {
    if (player.hasTag(i)) { return false; }
  }
  return true;
}

export function triggerForm(info, playerName, dimension) {
  let player = world.getDimension(dimension).getEntities({type: "minecraft:player", name: playerName})[0];
  let page = information[info];
  const truePage = new ActionFormData();
  let title = page.title;
  let body = page.body;
  if (page.obfuscated != undefined) {
    if (!checkPlayerTags(page.obfuscated.tagException, player)) {
      title = page.title.replaceAll('/_', '§r').replaceAll('/-', '§k');
      body = page.body.replaceAll('/_', '§r').replaceAll('/-', '§k');
    }
  }
  let titleUpdated = title.replaceAll('/-', '').replaceAll('/_', '');
  let bodyUpdated = body.replaceAll('/-', '').replaceAll('/_', '');
  truePage.title(titleUpdated);
  truePage.body(bodyUpdated);
  
  let buttons = page.buttons;
  let validButtons = [];
  for (let b of buttons) {
    if (checkPlayerTags(b.buttonTagRequirements, player) && excludePlayerTags(b.excludeTags, player)) {
      validButtons.push(b);
    }
  }
  for (let btn of validButtons) {
    let hasIcon = ![undefined, ""].includes(btn.buttonIcon);
    truePage.button(btn.buttonName, hasIcon ? btn.buttonIcon : null);
  }
  
  truePage.show(player).then(display => {
    if (display.selection != undefined) {
      if (validButtons[display.selection].onClick == undefined) { return }
      if (validButtons[display.selection].requiredItem == undefined) {
        doAction(validButtons[display.selection].onClick, player);
      } else
      if (validButtons[display.selection].requiredItem != undefined) {
        let found = false;
        let inv = player.getComponent("inventory").container;
        for (let i = 0; i < inv.size; i++) {
          if (inv.getItem(i) != undefined) {
            if (inv.getItem(i).typeId == validButtons[display.selection].requiredItem.item && inv.getItem(i).amount >= validButtons[display.selection].requiredItem.amount) {
              found = true;
            }
          }
        }
        if (found) {
          doAction(validButtons[display.selection].onClick, player);
        } else {
          player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"You do not have the required item in the required amounts.\"}]}`);
        }
      }
    }
  });
}