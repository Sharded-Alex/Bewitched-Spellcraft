## Initialize on World Start
execute as @a[tag=bs:magus] run scoreboard objectives add bs:arcLevel dummy "Magus Level"

## Passive Mana Regen
execute as @a[scores={bs:arcana=..-1}] run scriptevent bs:arcanaPenalty
execute as @a[tag=bs:magus] run scoreboard players add @s bs:aTimer 1
execute as @a[scores={bs:aTimer=50}] if score @s bs:arcana < @s bs:arcanaL run scriptevent bs:regenArcana
execute as @a[scores={bs:aTimer=51..}] run scoreboard players set @s bs:aTimer 0

## Info Display
execute as @a[tag=bs:magus, hasitem={item=bs:lapis_staff, location=slot.weapon.mainhand}] as @s run scriptevent bs:displayArcana