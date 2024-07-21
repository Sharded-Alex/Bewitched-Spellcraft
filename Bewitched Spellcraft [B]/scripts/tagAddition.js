import {world, system, EntityDamageCause} from "@minecraft/server";
import {spellTagList} from "./tagReqs";

export function checkReq(tagArray, player) {
  let xp = world.scoreboard.getObjective("bs:arcLevel").getScore(player.scoreboardIdentity);
  if (xp < tagArray) {
    return false;
  }
  return true;
}

system.runInterval(() => {
  world.getAllPlayers().forEach(player => {
    if (player.hasTag('bs:magus') && player.getEffects.length > 0) {
      for (let spellTag of spellTagList) {
        if (spellTag.condition.type == "effect") {
          if (!player.hasTag(spellTag.tag) && player.getEffect(spellTag.condition.value.name) && checkReq(spellTag.xpReq, player)) {
            player.addTag(spellTag.tag);
            player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
          }
        }
      }
    }
  });
}, 20);

world.afterEvents.entityHurt.subscribe(event => {
  const player = event.hurtEntity;
  const damageCause = event.damageSource.cause;
  
  if (!player.hasTag('bs:magus')) {
    return;
  }
  for (let spellTag of spellTagList) {
    let value = spellTag.condition.value;
    if (player.typeId == "minecraft:player" && spellTag.condition.type == "getDamage") {
      if (!player.hasTag(spellTag.tag) && damageCause == value && checkReq(spellTag.xpReq, player)) {
        player.addTag(spellTag.tag);
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
      }
    }
  }
});

world.afterEvents.entityDie.subscribe(event => {
  const player = event.damageSource.damagingEntity;
  const deceased = event.deadEntity;
  
  if (player == undefined) {
    return;
  }
  
  for (let spellTag of spellTagList) {
    let value = spellTag.condition.value;
    if (player.typeId == "minecraft:player" && player.hasTag('bs:magus') && spellTag.condition.type == "killEntity") {
      if (!player.hasTag(spellTag.tag) && deceased.typeId == value && checkReq(spellTag.xpReq, player)) {
        player.addTag(spellTag.tag);
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
      }
    }
  }
});

world.afterEvents.entityHitEntity.subscribe(e => {
  let entity = e.hitEntity;
  let player = e.damagingEntity;
  if (player.typeId == "minecraft:player" && player.hasTag('bs:magus')) {    
    for (let spellTag of spellTagList) {
      if (spellTag.condition.type == "doDamage") {
        if (!player.hasTag(spellTag.tag) && checkReq(spellTag.xpReq, player)) {
          player.addTag(spellTag.tag);
          player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
        }
      }
    }
  }
});

world.afterEvents.playerBreakBlock.subscribe(e => {
  let block = e.brokenBlockPermutation.type.id;
  let player = e.player;
  
  if (!player.hasTag('bs:magus')) {
    return;
  }
  
  for (let spellTag of spellTagList) {
    let value = spellTag.condition.value;
    if (spellTag.condition.type == "breakBlock") {
      if (!player.hasTag(spellTag.tag) && block == value && checkReq(spellTag.xpReq, player)) {
        player.addTag(spellTag.tag);
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
      }
    }
  }
});

world.afterEvents.weatherChange.subscribe(({lightning}) => {
  
  world.getAllPlayers().forEach(player => {
    if (!player.hasTag('bs:magus')) {
      return;
    }
    for (let spellTag of spellTagList) {
      if (player.dimension.id == "overworld" && spellTag.condition.type == "lightning") {
        if (!player.hasTag(spellTag.tag) && lightning && checkReq(spellTag.xpReq, player)) {
          player.addTag(spellTag.tag);
          player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
        }
      }
    }
  });
});

world.afterEvents.itemStopUse.subscribe(event => {
  let item = event.itemStack;
  let player = event.source;
  
  if (!player.hasTag("bs:magus")) {
    return;
  }
  for (let spellTag of spellTagList) {  
    if (spellTag.condition.type == "itemUse") {
      if (!player.hasTag(spellTag.tag) && item.typeId == spellTag.condition.value.name && checkReq(spellTag.xpReq, player)) {
        player.addTag(spellTag.tag);
        player.runCommandAsync(`tellraw @s {\"rawtext\": [{\"text\": \"${spellTag.msg}\"}]}`);
      }
    }
  }
});