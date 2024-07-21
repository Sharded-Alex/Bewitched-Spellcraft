import {world, system, EntityHealthComponent} from "@minecraft/server";

function arcanaDetection(dim, location) {
  if (dim == "the_end") {
    return 0;
  }
  let area = {"x": 3, "y": 3, "z": 3};
  let dimension = world.getDimension(dim);
  
  let nature = {
    "plants": 0,
    "grass": 0,
    "woods": 0,
    "fungus": 0
  };
  let plants = [
    "minecraft:poppy",
    "minecraft:blue_orchid",
    "minecraft:allium",
    "minecraft:azure_bluet",
    "minecraft:red_tulip",
    "minecraft:orange_tulip",
    "minecraft:white_tulip",
    "minecraft:pink_tulip",
    "minecraft:oxeye_daisy",
    "minecraft:cornflower",
    "minecraft:lily_of_the_valley",
    "minecraft:yellow_flower",
    "minecraft:sunflower",
    "minecraft:lilac",
    "minecraft:rose_bush",
    "minecraft:peony",
    "minecraft:wither_rose",
    "minecraft:flowering_azalea",
    "minecraft:azalea_leaves_flowered",
    "minecraft:mangrove_propugale",
  ];
  let grass = [
    "minecraft:grass_block",
    "minecraft:podzol",
    "minecraft:seagrass",
    "minecraft:short_grass",
    "minecraft:fern",
    "minecraft:tall_grass",
    "minecraft:large_fern",
    "minecraft:crimson_nylium",
    "minecraft:warped_nylium",
    "minecraft:crimson_roots",
    "minecraft:warped_roots",
  ];
  let woods = [
    "minecraft:oak_sapling",
    "minecraft:spruce_sapling",
    "minecraft:birch_sapling",
    "minecraft:jungle_sapling",
    "minecraft:acacia_sapling",
    "minecraft:dark_oak_sapling",
    "minecraft:acacia_log",
    "minecraft:birch_log",
    "minecraft:cherry_log",
    "minecraft:dark_oak_log",
    "minecraft:jungle_log",
    "minecraft:mangrove_log",
    "minecraft:oak_log",
    "minecraft:spruce_log",
    "minecraft:crimson_stem",
    "minecraft:warped_stem",
    "minecraft:crimson_hyphae",
    "minecraft:warped_hyphae",
  ];
  let fungus = [
    "minecraft:mycelium",
    "minecraft:red_mushroom",
    "minecraft:red_mushroom_block",
    "minecraft:brown_mushroom_block",
    "minecraft:shroomlight",
    "minecraft:crimson_fungus",
    "minecraft:warped_fungus",
  ];
  
  for (let x = location.x; x < location.x + area.x; x++) {
    for (let y = location.y; y > location.y - area.y; y--) {
      for (let z = location.z; z < location.z + area.z; z++) {
        let currentBlock = dimension.getBlock({x: x, y: y, z: z});
        if (plants.includes(currentBlock.typeId)) {
          nature.plants += 5;
        }
        if (grass.includes(currentBlock.typeId)) {
          nature.grass += 3;
        }
        if (woods.includes(currentBlock.typeId)) {
          nature.woods += 2;
        }
        if (fungus.includes(currentBlock.typeId)) {
          nature.fungus += 8;
        }
      }
    }
  }
  
  return nature;
}

export function arcaneLvl(level) {
  return (100*level)/2;
}

function arcanaCalc(level) {
  let arc = 0
  for (let i = 1; i < level+1; i++) {
    if (i % 10 == 0) {
      arc += (Math.ceil(level/10) * 50 + 50) * 10;
    } else {
      arc += Math.ceil(level/10) * 50 + 50;
    }
  }
  return arc;
}

system.afterEvents.scriptEventReceive.subscribe(e => {
  const id = e.id;
  const entity = e.sourceEntity;
  
  let arcaneLevel = world.scoreboard.getObjective("bs:arcLevel")?.getScore(entity.scoreboardIdentity);
  let arcana = world.scoreboard.getObjective("bs:arcana")?.getScore(entity.scoreboardIdentity);
  let limiter = world.scoreboard.getObjective("bs:arcanaL")?.getScore(entity.scoreboardIdentity);
  let AE = world.scoreboard.getObjective("bs:arcaneXP")?.getScore(entity.scoreboardIdentity);
  
  if (id == "bs:regenArcana") {
    let loc = {"x": entity.location.x - 1, "y": entity.location.y + 1, "z": entity.location.z - 1};
    let natureMod = arcanaDetection(entity.dimension.id, loc);
    
    if (natureMod != 0) {
      let chance = 10 + natureMod.plants + natureMod.fungus + natureMod.woods + natureMod.grass;
      let percentage = Math.round(100 * Math.random());
      if (chance > 100) {
        chance = 100;
      }
      if (percentage <= chance) {
        if ((Math.ceil(limiter * 5/100) + arcana) > limiter) {
          entity.runCommandAsync(`scoreboard players add @s bs:arcana ${Math.ceil(limiter * 5/100) - ((Math.ceil(limiter * 5/100) + arcana) - limiter)}`);
        } else {
          entity.runCommandAsync(`scoreboard players add @s bs:arcana ${Math.ceil(limiter * 5/100)}`);
        }
      }
    }
  }
  
  if (id == "bs:arcanaPenalty") {
    let health = entity.getComponent(EntityHealthComponent.componentId).currentValue;
    if (Math.sign(arcana) == -1) {
      let damage = Math.ceil(Math.abs(arcana)/5);
      entity.applyDamage(damage, {cause: "override"});
      entity.runCommandAsync(`scoreboard players set @s bs:arcana 0`);
    }
  }
  
  if (id == "bs:displayArcana") {
    let mainhand = entity.getComponent("inventory").container.getItem(entity.selectedSlotIndex);
    let offhand = entity.getComponent("equippable").getEquipment("Offhand");
    
    let page;
    if (offhand != undefined) {
      page = offhand.getDynamicProperty("grimoire:pageNumber");
    }
    
    let spell;
    
    if (page != undefined) {
      let pageInfo = JSON.parse(offhand.getDynamicProperty(`grimoire:page${page}`));
      if (!pageInfo.blank) {
        spell = pageInfo.spell;
        entity.onScreenDisplay.setActionBar(`§d[${arcaneLevel}] (${arcana}/${limiter})\nPage ${page}: ${spell}`);
      } else {
        entity.onScreenDisplay.setActionBar(`§d[${arcaneLevel}] (${arcana}/${limiter})\nPage ${page}: Empty Page`);
      }
    } else {
      entity.onScreenDisplay.setActionBar(`§d[${arcaneLevel}] (${arcana}/${limiter})`);
    }
  }
  
  if (id == "bs:levelUp") {
    let insCap = arcaneLvl(arcaneLevel);
    if (AE >= insCap) {
      if ((arcaneLevel + 1) % 10 == 0) {
        entity.runCommandAsync(`scoreboard players set @s bs:arcaneXP ${AE - insCap}`);
        entity.runCommandAsync(`scoreboard players add @s bs:arcLevel 1`);
        entity.runCommandAsync(`scoreboard players add @s bs:arcanaL ${(Math.ceil(arcaneLevel/10) * 50 + 50) * 10}`);
        entity.runCommandAsync(`scoreboard players set @s bs:arcana ${world.scoreboard.getObjective("bs:arcanaL").getScore(entity.scoreboardIdentity)}`);
      } else {
        entity.runCommandAsync(`scoreboard players set @s bs:arcaneXP ${insCap - AE}`);
        entity.runCommandAsync(`scoreboard players add @s bs:arcLevel 1`);
        entity.runCommandAsync(`scoreboard players add @s bs:arcanaL ${Math.ceil(arcaneLevel/10) * 50 + 50}`);
        entity.runCommandAsync(`scoreboard players set @s bs:arcana ${world.scoreboard.getObjective("bs:arcanaL").getScore(entity.scoreboardIdentity)}`);
      }
    }
  }
  
  if (id == "bs:setLVL") {
    let msg = e.message * 1;
    if (Number(msg) != NaN) {
      entity.runCommandAsync(`scoreboard players set @s bs:arcaneXP 0`);
      entity.runCommandAsync(`scoreboard players set @s bs:arcLevel ${msg}`);
      entity.runCommandAsync(`scoreboard players set @s bs:arcanaL ${arcanaCalc(msg)}`);
      entity.runCommandAsync(`scoreboard players set @s bs:arcana ${arcanaCalc(msg)}`);
    }
  }
});