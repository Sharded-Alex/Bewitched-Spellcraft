import {ActionFormData, ActionFormResponse, MessageFormData, ModalFormData} from "@minecraft/server-ui";
import {world, system} from "@minecraft/server";
import { information } from "./info.js";

function doAction(action, player) {
  let playerName = player.nameTag;
  let formID = action.value;
  switch (action.open_form) {
    case true:
      createForm(formID, player);
      break;
    case false:
      break;
  }
}

export function checkPlayerTags(tags, player) {
  if (tags == undefined) { return true; }
  for (let i of tags) {
    if (!player.hasTag(i)) { return false; }
  }
  return true;
}

export function createForm(formInfo, player) {
    let bookPage = information[formInfo];
    //Gets JSON from FormInfo ^^^
    const witchForm = new ActionFormData();
    witchForm.title(bookPage.title);
    witchForm.body(bookPage.body);
    //Pull form title and body from FormInfo

    let buttons = bookPage.buttons;
    for (let x of buttons) {
        /** Does this button have an icon? */
        let hasIcon = ![undefined, ""].includes(x.buttonIcon);
        /** Add the corresponding button depending on whether the player has necessary tags */
        if (checkPlayerTags(x.buttonTagRequirements, player)) {
            witchForm.button(x.buttonName, hasIcon ? x.buttonIcon : null);
        } else {
            witchForm.button("§kUnknown Knowledge§r");
        }
    }

    witchForm.show(player).then(display => {
        if (display.selection != undefined) {
            if (checkPlayerTags(buttons[display.selection].buttonTagRequirements, player)) {
                doAction(buttons[display.selection].onClick, player);
            } else {
                doAction({ "open_form": true, "value": "unknown" }, player);
            }
        }
    });
}