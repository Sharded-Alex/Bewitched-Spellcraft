execute as @s run scoreboard objectives add bs:arcLevel dummy "Arcana Level"
execute as @s run scoreboard objectives add bs:arcana dummy "Arcana"
execute as @s run scoreboard objectives add bs:arcanaL dummy "Arcana Limit"
execute as @s run scoreboard objectives add bs:aTimer dummy "Timer"
execute as @s run scoreboard objectives add bs:arcaneXP dummy
execute as @s run scoreboard objectives add bs:wardType dummy
execute as @s run scoreboard objectives add bs:wardTime dummy
execute as @s run scoreboard objectives add bs:wardTimer dummy
execute as @s run scoreboard objectives add bs:wardPower dummy

execute as @s run scoreboard players set @s bs:arcLevel 1
execute as @s run scoreboard players set @s bs:arcana 100
execute as @s run scoreboard players set @s bs:arcanaL 100
execute as @s run scoreboard players set @s bs:arcanaXP 0