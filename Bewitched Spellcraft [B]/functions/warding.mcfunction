execute as @a[scores={bs:wardType=1.., bs:wardTime=1..}] run scoreboard players add @s bs:wardTimer 1
execute as @a[scores={bs:wardTimer=21..}] run scoreboard players remove @s bs:wardTime 1
execute as @a[scores={bs:wardTimer=21..}] run scoreboard players set @s bs:wardTimer 0

execute as @a[scores={bs:wardType=1.., bs:wardTime=..0}] run scoreboard players set @s bs:wardType 0
execute as @a[scores={bs:wardType=1.., bs:wardTime=..0}] run scoreboard players set @s bs:wardTimer 0
execute as @a[scores={bs:wardType=1.., bs:wardTime=..0}] run scoreboard players set @s bs:wardPower 0

