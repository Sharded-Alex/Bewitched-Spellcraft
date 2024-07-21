import {world, system, EntityDamageCause} from "@minecraft/server";
import {spellNull, parseProperty, processSpell} from "./spellCreation";

system.runInterval(() => {
  world.getAllPlayers().forEach(player => {
    if (player.hasTag('bs:magus')) {
      let armorSet = [player.getComponent("equippable").getEquipment("Head"), player.getComponent("equippable").getEquipment("Chest"), player.getComponent("equippable").getEquipment("Legs"), player.getComponent("equippable").getEquipment("Feet")];
      for (let piece of armorSet) {
        let spell = piece?.getDynamicProperty("bs:psuedoEnchant");
        if (spell != undefined) {
          let spl = JSON.parse(spell);
          if (spl.trigger == "On Interval") {
            let array = parseProperty(spl.spell);
            processSpell(array, player, spellNull, {"bool": false});
          }
        }
      }
    }
  });
}, 10);

world.afterEvents.entityHitEntity.subscribe(e => {
  let hurtEntity = e.hitEntity;
  let damageSource = e.damagingEntity;
  
  if (hurtEntity.typeId == "minecraft:player" && hurtEntity.hasTag('bs:magus')) {
    let armorSet = [hurtEntity.getComponent("equippable").getEquipment("Head"), hurtEntity.getComponent("equippable").getEquipment("Chest"), hurtEntity.getComponent("equippable").getEquipment("Legs"), hurtEntity.getComponent("equippable").getEquipment("Feet")];
    for (let piece of armorSet) {
      let spell = piece?.getDynamicProperty("bs:psuedoEnchant");
      if (spell != undefined) {
        let spl = JSON.parse(spell);
        if (spl.trigger == "When Attacked") {
          let array = parseProperty(spl.spell);
          processSpell(array, hurtEntity, spellNull, {"bool": false});
        }
      }
    }
  }
  
  if (damageSource.typeId == "minecraft:player" && damageSource.hasTag('bs:magus')) {
    let armorSet = [damageSource.getComponent("equippable").getEquipment("Head"), damageSource.getComponent("equippable").getEquipment("Chest"), damageSource.getComponent("equippable").getEquipment("Legs"), damageSource.getComponent("equippable").getEquipment("Feet")];
    for (let piece of armorSet) {
      let spell = piece?.getDynamicProperty("bs:psuedoEnchant");
      if (spell != undefined) {
        let spl = JSON.parse(spell);
        if (spl.trigger == "On Attack") {
          let array = parseProperty(spl.spell);
          processSpell(array, damageSource, spellNull, {"bool": false});
        }
      }
    }
  }
});