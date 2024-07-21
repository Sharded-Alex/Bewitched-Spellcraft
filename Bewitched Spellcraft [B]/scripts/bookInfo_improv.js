export const information = {
  "titlePage": {
    "title": "Incantanomica",
    "body": "A summation of the Arcanic mysteries lies within these pages.\n\nHowever, it would do you well to remember that that is what the arcane is: mystery. My notes can only illuminate the secrets that I have uncovered.\n\n",
    "buttons": [
      {
        "buttonName": "Chapter I: §kArcana§r",
        "buttonIcon": "textures/items/apple",
        "excludeTags": ["entry:arcanaBasics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "arcana.preface"
          }
        ]
      },
      {
        "buttonName": "Chapter I: Arcana",
        "buttonIcon": "textures/items/apple",
        "buttonTagRequirements": ["entry:arcanaBasics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "arcana.lifeForce"
          }
        ]
      },
      {
        "buttonName": "Chapter II: Incant Basics",
        "buttonIcon": "textures/items/book_written",
        "buttonTagRequirements": ["entry:incantBasics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "incants.preface"
          }
        ]
      },
      {
        "buttonName": "Chapter III: Spellcraft",
        "buttonIcon": "textures/items/tools/research",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "research.preface"
          }
        ]
      },
      {
        "buttonName": "Incantionary",
        "buttonIcon": "textures/items/book_writable",
        "buttonTagRequirements": ["entry:Know"],
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      },
    ]
  }, 
  
  // Chapter 1: Arcana
  "arcana.preface": {
    "title": "Strange Forces",
    "body": "After months of research, I've found something! I'd been interested in how the ancient magi \"raised seas and split mountains\" with only their words.\n\nThe problem is that this information seems to be locked behind some strange rite, one that I can hardly decipher... \n\nMy only clue lies in this peculiar riddle, \"§dThe key to Wisdom's Door is cast from pain§r\". I must solve this parable if I am to progress.\n\n",
    "buttons": [
      {
        "buttonName": "Close",
        "buttonIcon": ""
      }
    ]
  },
  "arcana.lifeForce": {
    "title": "Erudition!",
    "body": "I've done it! Of §ocourse§r that was the answer! However, this challenge both worries and intrigues me; was pain a commonplace among the ancient magi? Does that now extend to me? I guess I will just have to find out.\n\nEither way, I've been enlightened, and now I understand the force known as §darcana§r.\n\nArcana is simply §dlife§r; both health and experiences but it seems to go deeper. Through experiencing loss within my new mindset, I have come to understand that it is also the force that powers §dincantations§r.\n\nI have taken the time to note down my understandings.\n\n",
    "buttons": [
      {
        "buttonName": "Arcana Generation",
        "buttonIcon": "textures/items/redstone_dust",
        "buttonTagRequirements": ["entry:arcanaBasics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "arcana.regeneration"
          }
        ]
      },
      {
        "buttonName": "Ascension",
        "buttonIcon": "textures/items/experience_bottle",
        "buttonTagRequirements": ["entry:arcanaBasics"],
        "onClick": [
          {
            "type": "addTag",
            "tag": "entry:incantBasics"
          },
          {
            "type": "openForm",
            "form": "arcana.levels"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "titlePage"
          }
        ]
      }
    ]
  },
  "arcana.regeneration": {
    "title": "Arcana Generation",
    "body": "Arcana has some strange properties that are §dclosely related to natural environment§r, and its regeneration seems to be somewhat dependent on it.\n\nIf I am in a space filled with flora, I seem to unconsciously absorb their leaking life force, which then becomes arcana for me to use.\n\nThe more §dabundant in plant life my surroundings are§r, the §dfaster I regenerate§r my spent arcana. This also means that the reverse is true.\n\n§dThe End§r seems to §dnot recover my arcana at all§r, which is really peculiar.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "arcana.lifeForce"
          }
        ]
      }
    ]
  },
  "arcana.levels": {
    "title": "Ascension",
    "body": "Ascension is an important aspect of any and all magi, as far as I can find. While creativity makes me powerful, §dinsight§r also plays an important role.\n\nWhen I accumulate enough insight (which I consider §dexperience with the Arcanic Art§r), I will §dascend§r. This allows me to store more arcana, and increases my ability to use certain Incants.\n\n§lAscension Types§r\nThere are two kinds of Ascensions: Lower and Higher. A Lower Ascension increases my arcana capacity by a small amount every 9 levels. This amount seems to scale as I ascend higher.\n\nA Higher Ascension simply increases my arcana capacity by ten times the normal amount. These occur every 10 Ascensions.\n\n§lLimits of Ascension§r\nAside from increasing my arcana capacity, the number of ascensions I've gone through seems to affect the amount of power I can draw from certain Incants, especially §dones that require numeric inputs§r (eg. Alchemicals). I will ensure that I note down these limits in the relevant sections.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "arcana.lifeForce"
          }
        ]
      }
    ]
  },
  
  // Chapter 2: Incant Basics
  "incants.preface": {
    "title": "Incant Basics",
    "body": "Incants are the words that create incantations. These words come from the ancient language known as Arcanic, and they influence the World itself.\n\nWith that being the case, it makes sense that deciphering the meanings behind them is §dquite the task§r. Even I would've given up if it was not for the power I find at my fingertips.\n\nIn this section, I will explain the basics of these mystic words and cover the important aspects that govern and interact with them.\n\n",
    "buttons": [
      {
        "buttonName": "Incant Types",
        "buttonIcon": "textures/items/book_enchanted",
        "buttonTagRequirements": ["entry:incantBasics"],
        "onClick": [
          {
            "type": "addTag",
            "tag": "entry:clusterTypes"
          },
          {
            "type": "openForm",
            "form": "incants.types"
          }
        ]
      },
      {
        "buttonName": "Cluster Types",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["entry:incantBasics", "entry:clusterTypes"],
        "onClick": [
          {
            "type": "addTag",
            "tag": "entry:mageWork"
          },
          {
            "type": "openForm",
            "form": "incants.clusterTypes"
          }
        ]
      },
      {
        "buttonName": "The Akashic",
        "buttonIcon": "textures/blocks/chiseled_bookshelf_occupied",
        "buttonTagRequirements": ["entry:incantBasics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "incants.akashic"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "titlePage"
          }
        ]
      }
    ]
  },
  "incants.types": {
    "title": "Incant Types",
    "body": "There are many Incants, but when broken down to their most basic selves, they each have one of three (3) functions: §dcollect§r, §dmanipulate§r, or §dexecute§r. As a result, they are noted down in almost every text I've found as §aCollectors§r, §aManipulators§r, and §aTasks§r.\n\n§aCollectors§r gather information about the World and are foundational to all incantations. This collected data could be about the mage, what they are look at, the value of a number, or even what another entity is looking at. Whenever Collectors \"collect\", whatever they find is saved to the §dAkashic§r as §dclusters§r.\n\n§aManipulators§r use the clusters in the Akashic to get a result. They could calculate a new value from two Numbers or Vectors, or even switch around the order of clusters in the Akashic, however that is §dadvanced§r spellwork.\n\n§aTasks§r are the simplest to understand. They pull clusters from the §dAkashic§r and use them to execute effects in the World. Tasks will only ever pull clusters that are at the top of the Akashic. As a result, the Arcanic Arts are often considered §dstack-based§r.\n\nEvery Incant that I have come across §dfollows this structure§r, even the most obscure ones. I do admit, they help me understand the shape my incantations should take but knowing the §dtypes of clusters that exist§r assists me greatly as well.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "incants.preface"
          }
        ]
      }
    ]
  },
  "incants.clusterTypes": {
    "title": "Cluster Types",
    "body": "As mentioned before, §dclusters§r are strange little pieces of magical data stored in the §dAkashic§r. I've taken the time to document each of the types I've discovered during my research.\n\n§lEntity§r\n§oStores information about an entity like its name, health, position, size, etc.§r\n\n§lBlock§r\n§oStores information about a block like its name, position, properties, etc.§r\n\n§lVector§r\n§oA group of three numbers that represent the x, y, and z. They are used to represent a direction, position and/or magnitude.§r\n\n§lNumber§r\n§oThis is a number or decimal value. It can be either negative or positive.§r\n\n§lBoolean§r\n§oThis cluster type can only ever be either True or False.§r\n\n§lList§r\n§oA more complex cluster type that can hold other clusters and even incantations. Anything in a List is considered a part of one cluster.§r\n\n§lNull§r\n§oA value that essentially means nothing, absence, nil. It is generally seen when an incantation is incorrect and can cause errors if detected.§r\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "incants.preface"
          }
        ]
      }
    ]
  },
  "incants.akashic": {
    "title": "The Akashic",
    "body": "Every single incantation I perform is interpreted by §dthe Akashic§r. It turns my words into the target I wish to affect, the numerals I wish to invoke, even the positions and directions I wish my spell to go; the Akashic §dtranslates and stores§r all of it.\n\nThis §dstack of clusters§r is very much like a stack of plates. Adding a cluster puts it on top of the whole stack. Following that same line of thought, I can only affect/remove the topmost cluster at any point in time, which is always the cluster added last. Following this principle, §dTasks§r take the clusters from the Akashic in a specific order (or syntax) and use them to produce magic!\n\nIn this way, I've come to understand the Arcanic Art as a game of information, where what I input affects what is outputted. If my input is incorrect in syntax, my output will be equally as incorrect, causing my incantation to either fail or act in some strange way I did not intend.\n\nMagic is truly fascinating...\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "incants.preface"
          }
        ]
      }
    ]
  },
  
  // Chapter 3: Spellcraft
  "research.preface": {
    "title": "Spellcraft",
    "body": "I may not fully understand what I should do, but I understand that I must experiment. If it is one thing I've learned from my research, knowledge of Arcanism is earned, not conjured.\n\nI've also come to understand that the incantations I formulate will likely come from my own understandings. The powers I hold rely upon my own efforts; as such, I cannot fail.\n\n",
    "buttons": [
      {
        "buttonName": "Inscription",
        "buttonIcon": "textures/items/tools/ink_quill",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "research.scribing"
          }
        ]
      },
      {
        "buttonName": "Spell Tools",
        "buttonIcon": "textures/items/tools/lapis_staff",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellTools"
          }
        ]
      },
      {
        "buttonName": "Spell Potency",
        "buttonIcon": "textures/items/potion_bottle_damageBoost",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "research.potency"
          }
        ]
      },
      {
        "buttonName": "Spell Syntax",
        "buttonIcon": "textures/symbols/syntax_sticks",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "addTag",
            "tag": "entry:Know"
          },
          {
            "type": "addTag",
            "tag": "incant:basics"
          },
          {
            "type": "openForm",
            "form": "research.spellSyntax"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "titlePage"
          }
        ]
      }
    ]
  },
  "research.scribing": {
    "title": "Inscription",
    "body": "Writing down a spell is not a hard task, but I will need a few components to get started. They are: a §aLectern§r, an §aInk & Quill§r, and §aPaper§r.\n\nI begin the the process by holding the Paper in my §amainhand§r and the Ink & Quill §ain the other§r. I then interact with Lectern. During this process, I take my time to name the spell, write down the incantation, and then add some small note if I feel I must.\n\nAfter this process, I submit my paper to create a §aSpell Page§r. If I need to edit it, I simply hold keep holding the Ink & Quill and instead use the Spell Page to interact with the Lectern. This tends to have no cost. They can also be copied using Paper if the Spell Page is in my offhand.\n\nI call this the §ainscription process§r, and I've found it to be foundational in magical experimentation.\n\n§lCompound Research§r\nThere are times when the amount of words I'm allowed on a Spell Page is not enough. In scenarios like these, I can §dcombine§r two Spell Pages into a Compound Spell Page. A Compound Spell Page may be combined with another of its kind as well to combine them. This is done by §dholding one Page in my offhand§r and §dthe other in my mainhand§r. By using my mainhand, I can §dattach the held Page to the end of the Page in my offhand§r.\n\nThis allows me to create far more complex spells; however, a Compound Spell Page §dloses the ability to be edited and/or copied§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.preface"
          }
        ]
      }
    ]
  },
  "research.spellTools": {
    "title": "Spell Tools",
    "body": "Incantations were once able to be performed verbally, but it seems that method was quite inefficient and so, it was lost to time. Luckily, I believe I have found other ways to perform magic, both old and new.\n\n",
    "buttons": [
      {
        "buttonName": "Grimoires & the Staff",
        "buttonIcon": "textures/items/spellbooks/empty_spellbook",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tools.wands&Books"
          }
        ]
      },
      {
        "buttonName": "Steles",
        "buttonIcon": "textures/items/tools/activated_spellrune",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tools.steles"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.preface"
          }
        ]
      }
    ]
  },
  "tools.wands&Books": {
    "title": "Grimoires & Staffs",
    "body": "In many texts, there are writings about mages keeping incantations in their §aGrimoires§r and directing their magic with §alapis staffs§r. I find this method very... magus-like and I like it.\n\nGrimoires have 10 pages that can be selected at will by sneak-clicking, and I can §ainsert a Spell Page by holding it in my offhand and using the book§r. Inserting a spell into an already filled page §cwill overwrite its contents§r. By using the Grimoire while it is on a used page, I can read the contents of the incantation but never edit it.\n\nWith that done, I can put the Grimoire in my offhand and use a Staff (commonly, the Lapis Magus variant) to cast the incantation on the page I am currently on. I can select pages in this state by sneak-using the staff with the Grimoire in my offhand, similar to before.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellTools"
          }
        ]
      }
    ]
  },
  "tools.steles": {
    "title": "Steles",
    "body": "My studies are complete! I've found a strange set of rituals that enable me to bind the lifeforce of other entities and an incantation of my choosing into a small carryable item. I have come to call them Steles.\n\nEven though they can only be used §da certain amount of times§r before crumbling, they §ddo not use arcana§r to cast the spell held inside! This is big, because that means that even non-magi can use these talismans. Furthermore, they §ddo not§r seem to be bound by the §dLaw of Potency§r. Whether this is a good or bad thing, I am not sure.\n\nSteles cannot be crafted normally, however. They are manifested using Rites of Encapsulation.",
    "buttons": [
      {
        "buttonName": "Rite of Clay Encapsulation",
        "buttonIcon": "textures/items/clay_ball",
        "buttonTagRequirements": ["entry:mageWork"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tools.steles.clay_rite"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellTools"
          }
        ]
      }
    ]
  },
  "tools.steles.clay_rite": {
    "title": "The Rite of Encapsulation",
    "body": "I start this ritual by gathering my materials.\n- 1 Block of Lapis Lazuli\n- 1 Lectern\n- 4 flowers\n- 1 Lapis Magus Staff\n- My incantation\n- Animals (pigs, cows, sheep and/or chickens)\n\nAfter I have gathered these things, I begin to set up my area.\n\n§lSetting Up§r\nThe §dLectern§r is the central block, with the Lapis Lazuli Block §ddirectly underneath it§r.\n\nI then surround the Lectern with the §dflowers§r I have gathered. I place one in each cardinal direction around it. Supposedly, this is for ritual stability.\n\nFinally, I gather the animals around this set up. I hold my staff in my mainhand and my incantation in the other, and interact with the Lectern. This will initiate my magical working. §dStarting the rite requires 500 Arcana.§r\n\n§lDuring the Rite§r\nI believe this ritual originated from some §darcana-deficient§r magus because of this next part. That is the only explanation for the mystical brutality I witnessed on my first attempt.\n\nDepending on the amount of words in the incantation multiplied by 3, the ritual will compare the cost to the pooled health of all the animals present and in a §d6 block radius§r. When their total lifeforce arcana (their total health) meets the arcana cost, it will pull from their lifeforce and §dthis process can be fatal for them§r if the incantation is massive.  That is §dthe true reason why I have not set any definite amount of animals§r.\n\nI cannot say I completely agree with the use of this ritual, so I have only tried imbuing smaller spells into  steles. However, should there be a magus that does not wince at sacrifice, it can bind far bigger incantations.",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tools.steles"
          }
        ]
      }
    ]
  },
  "research.spellSyntax": {
    "title": "Spell Syntax",
    "body": "An incantation is essentially a §dmagical sentence§r that §dtells the World exactly what I want to happen§r. I have discovered no TRUE syntax for this art but I do believe I have some tips that may help further down in my studies.\n\n",
    "buttons": [
      {
        "buttonName": "Give A Task!",
        "buttonIcon": "textures/ui/icon_sign",
        "onClick": [
          {
            "type": "openForm",
            "form": "syntax.ruleOne"
          }
        ]
      },
      {
        "buttonName": "Inform My Task!",
        "buttonIcon": "textures/ui/icon_sign",
        "onClick": [
          {
            "type": "openForm",
            "form": "syntax.ruleTwo"
          }
        ]
      },
      {
        "buttonName": "Watch the Magic Unfold!",
        "buttonIcon": "textures/ui/icon_sign",
        "onClick": [
          {
            "type": "openForm",
            "form": "syntax.ruleThree"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.preface"
          }
        ]
      }
    ]
  },
  "syntax.ruleOne": {
    "title": "Give A Task!",
    "body": "All functioning incantations have at LEAST one Task. Without one, an incantation can only gather and/or manipulate clusters. While clusters are important, they will not yield any sort of visible magical effects on their own.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellSyntax"
          }
        ]
      }
    ]
  },
  "syntax.ruleTwo": {
    "title": "Inform My Tasks!",
    "body": "Each Task only accepts 1 or more clusters of certain type. As an example, I will use the Task, §oFus§r (Light). It only accepts a cluster of the §oVector§r type. If a Vector is at the top of the Akashic when §oFus§r activates, then a light will be conjured at the Vector's position.\n\nThat allows me much flexibility when defining where I want Fus to light. I can conjure it anywhere as long as I can define the location and the World allows it.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellSyntax"
          }
        ]
      }
    ]
  },
  "syntax.ruleThree": {
    "title": "Watch the Magic Unfold!",
    "body": "This part is the most difficult for me to explain. Every incant in an incantation does SOMETHING, even if I cannot see it. Every cluster is added to the Akashic, and then Manipulators and Tasks read them. It is so strange, yet it makes sense.\n\nAn example spell is §dETE GEA FUS§r.\n\n- §dETE§r (Self) adds me to the top of the Akashic as the casting magus.\n\n- §dGEA§r (Position) finds out the location of the Entity or Block at the top of the Akashic. In this case, §oI§r am that Entity.\n\n- §dFUS§r (Light) takes a Vector and conjures a light at its location. My position is a Vector, so the light is conjured at my feet!\n\nThis is a simple spell yet it has so many moving parts... perhaps I can augment this spell to be conjured at the feet of another. Maybe I can even create a version I can effectively use as a torch of sorts.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.spellSyntax"
          }
        ]
      }
    ]
  },
  "research.potency": {
    "title": "Spell Potency",
    "body": "I've come to figure out a strange property of magic. While I believe it is limitless, that seems to only apply to those who have ascended enough times. There are very clear limits imposed upon certain §dTasks that accept Number Clusters§r.\n\nAs a result, in theory, a 1st Ascension magus does not have the power that a 7th Ascension magus could have when utilizing them. Even if the latter magus was to give the former their spell, they would not be able to draw forth the effects with the same §dpotency§r, even though nothing about the spell has changed.\n\nI have come to call this principle the §dLaw of Potency§r. Any Number Cluster required by a Task Incant has a limit determined by a particular value (determined by the Task) multiplied by the amount of ascensions a magus has undergone. This particular value is what I call the §dscale§r.\n\nI have worked to document all the various scales across all the Tasks (and sometimes, other Incants) that make use of them. You will find them within their entry.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "research.preface"
          }
        ]
      }
    ]
  },
  
  // Chapter 4: Incantionary
  "index.preface": {
    "title": "Incantionary",
    "body": "Finally, I am knowledgeable enough to be able to document my collection of Incants. This section is enchanted to hide away Incants the reader does not know, so that if I ever take on apprentices, they will be able to learn without all the unnecessary clutter.\n\nI've also taken great care in cataloguing the arcanic words by similarity.\n\n§lKey§r\n§aIncant§r - The Incant's Arcanic name\n§aConcept§r - What the Incant represents\n§aSyntax§r - What cluster types should come §obefore§r this Incant and their order.\n§aAkashic Input§r - What cluster(s) will be added to the Akashic as a result of the Incant.\n\nI will also add further notes on exactly what each Incant does.\n\n",
    "buttons": [
      {
        "buttonName": "Basic Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      },
      {
        "buttonName": "Numeric Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.numbers"
          }
        ]
      },
      {
        "buttonName": "Bool Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.boolean"
          }
        ]
      },
      {
        "buttonName": "Constant Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      },
      {
        "buttonName": "Operational Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      },
      {
        "buttonName": "Vectorial Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      },
      {
        "buttonName": "Brackets Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.brackets"
          }
        ]
      },
      {
        "buttonName": "Akashic Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.akashics"
          }
        ]
      },
      {
        "buttonName": "List Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.lists"
          }
        ]
      },
      {
        "buttonName": "Logical Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      },
      {
        "buttonName": "Query Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      },
      {
        "buttonName": "Task Incants",
        "buttonIcon": "textures/ui/icon_spring",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.tasks"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "titlePage"
          }
        ]
      }
    ]
  },
  "index.basic": {
    "title": "Basic Incants",
    "body": "This is a record of various incants that have proven invaluable to my incription of incantations.\n\n",
    "buttons": [
      {
        "buttonName": "Ete (Self)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.ete"
          }
        ]
      },
      {
        "buttonName": "Gea (Position)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.gea"
          }
        ]
      },
      {
        "buttonName": "Biegea (Head Location)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.biegea"
          }
        ]
      },
      {
        "buttonName": "Debug (Debug)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.debug"
          }
        ]
      },
      {
        "buttonName": "Esijit (See Entity)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.esijit"
          }
        ]
      },
      {
        "buttonName": "Esifir (See Block)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.esifir"
          }
        ]
      },
      {
        "buttonName": "Esipal (See Block Face)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.esipal"
          }
        ]
      },
      {
        "buttonName": "Esilib (View Direction)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.esilib"
          }
        ]
      },
      {
        "buttonName": "Esizon (See Cone)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.esizon"
          }
        ]
      },
      {
        "buttonName": "Wix (Radius)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.wix"
          }
        ]
      },
      {
        "buttonName": "Firugea (Get Block)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.firugea"
          }
        ]
      },
      {
        "buttonName": "Irapal (Localize)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "basic.irapal"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.numbers": {
    "title": "Numeric Incants",
    "body": "There are no Incants that represent numbers, or perhaps they exist but Arcanic recognizes all numbers as they truly are. Either way, simply focusing on the value of the number is enough, so numbers like 2, 3, 6, and 87 will work. One, two, and three will not.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.boolean": {
    "title": "Bool Incants",
    "body": "Possibly the two simplest Incants to understand. They §dact against each other§r but §done can only exist if the other does not§r. Their relationship has served me greatly throughout my journey.\n\n",
    "buttons": [
      {
        "buttonName": "Ira (True)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "bool.true"
          }
        ]
      },
      {
        "buttonName": "Iro (False)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "bool.false"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.constants": {
    "title": "Constant Incants",
    "body": "There are Incants I've discovered that hold a single value, no matter the circumstances under which I use them. Actually, §dBool Incants are apart of this group§r but because of importance and organization, I have not included them here.\n\nIn this section, I will note things such as §dabsence§r and §darithmetic§r and §dvector§r constants.\n\n",
    "buttons": [
      {
        "buttonName": "Het (Null)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.null"
          }
        ]
      },
      {
        "buttonName": "Malibhet (Nowhere?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.nowhere"
          }
        ]
      },
      {
        "buttonName": "Malibie (Up)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.up"
          }
        ]
      },
      {
        "buttonName": "Malibfie (Down)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.down"
          }
        ]
      },
      {
        "buttonName": "Malibdie (East)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.east"
          }
        ]
      },
      {
        "buttonName": "Malibcie (West)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.west"
          }
        ]
      },
      {
        "buttonName": "Malibkie (North)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.north"
          }
        ]
      },
      {
        "buttonName": "Malibjie (South)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.south"
          }
        ]
      },
      {
        "buttonName": "Hafozon (PI)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.PI"
          }
        ]
      },
      {
        "buttonName": "Holozon (Full Circle)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "constant.circle"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.operations": {
    "title": "Operational Incants",
    "body": "I once was among the magi that dismissed this group as \"useless\"; however, not anymore. Operationals are quite literally problem solvers, aiming to put my environment into mathematical perspectives that both I and the World can understand.\n\nWith this being so, I can create mystical formulas to manifest the change I wish to bring about with a level of precision I could never have achieved without them.\n\nFrom my studying of the Akashic, §dall Operational Incants§r remove the numbers/vectors that are being calculated and replaces them with the resulting value from their calculations.\n\nIt truly is a wonderful example of how everchanging and impactful each Incant driven interaction with the Akashic truly is.\n\n",
    "buttons": [
      {
        "buttonName": "Sinvera (Addition)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operations.add"
          }
        ]
      },
      {
        "buttonName": "Sinvara (Subtraction)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operations.substract"
          }
        ]
      },
      {
        "buttonName": "Tocover (Multiplication)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operations.multiply"
          }
        ]
      },
      {
        "buttonName": "Tocovar (Division)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operations.divide"
          }
        ]
      },
      {
        "buttonName": "Ironim (Round Off Number)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operations.roundOff"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.vectors": {
    "title": "Vectorial Incants",
    "body": "There are many things that Vectors control when it comes to performing incantations. These incants create, destroy, and manipulate Vector Clusters so that they adjust to my needs.\n\n",
    "buttons": [
      {
        "buttonName": "Sinafil (Create Vector)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "vectors.createVector"
          }
        ]
      },
      {
        "buttonName": "Yinafil (Break Vector)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "vectors.breakVector"
          }
        ]
      },
      {
        "buttonName": "Libafil (Length)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "vectors.length"
          }
        ]
      },
      {
        "buttonName": "Libas (Distance)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "vectors.distance"
          }
        ]
      },
      {
        "buttonName": "Irokie (Round Off Vector)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "vectors.roundOff"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.brackets": {
    "title": "Bracket Incants",
    "body": "Like the §dBoolean Incants§r, §dABI§r and §dVIR§r are Twins. They act as brackets for Incants, and are able to store other Incants as List clusters to be inserted into the Akashic.\n\nEssentially, §dABI§r §aETE GEA FUS§r §dVIR§r represents §d[§r§aETE GEA FUS§r§d]§r, and this value would be added to the Akashic. There are some Incants that are able to make use of clusters like these, one of the most notable being §dIF§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.operators": {
    "title": "Logical Incants",
    "body": "I've stumbled on a peculiar form of magic derived from the use of Boolean clusters. In a way, I am pulling on the powers of validity and invalidity.\n\nWhile alot of these Incants compare Booleans, there are Incants that can cast incantations under conditions, such as through Query Incants, etc.\n\n",
    "buttons": [
      {
        "buttonName": "If",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.if"
          }
        ]
      },
      {
        "buttonName": "Or",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.or"
          }
        ]
      },
      {
        "buttonName": "And",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.and"
          }
        ]
      },
      {
        "buttonName": "Not",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.not"
          }
        ]
      },
      {
        "buttonName": "Jit (Equal)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.equal"
          }
        ]
      },
      {
        "buttonName": "Irajit (Truly Equal)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.trueEqual"
          }
        ]
      },
      {
        "buttonName": "Jirver (Greater Than)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.greaterThan"
          }
        ]
      },
      {
        "buttonName": "Jirverjit (Greater Than/Equal)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.greaterThanEqual"
          }
        ]
      },
      {
        "buttonName": "Jirvar (Less Than)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.lessThan"
          }
        ]
      },
      {
        "buttonName": "Jirvarjit (Less Than/Equal)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "operators.lessThanEqual"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.queries": {
    "title": "Query Incants",
    "body": "After covering Logical Incants, I've discovered various methods of gleaning §danswers from the World§r. I've decided to call these Query Incants. They always tend to §dcheck§r something. Alot of them tend to return Boolean Clusters, but a select few return other clusters.\n\n",
    "buttons": [
      {
        "buttonName": "Maleme? (Running?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.running"
          }
        ]
      },
      {
        "buttonName": "Xibfie? (Sneaking?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.sneaking"
          }
        ]
      },
      {
        "buttonName": "Malbie? (Jumping?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.jumping"
          }
        ]
      },
      {
        "buttonName": "Malfie? (Falling?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.falling"
          }
        ]
      },
      {
        "buttonName": "Gelacor? (On Ground?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.onLand"
          }
        ]
      },
      {
        "buttonName": "Gelaqar? (In Water?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.inWater"
          }
        ]
      },
      {
        "buttonName": "Yic? (Health?)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "queries.health"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.akashics": {
    "title": "Akashic Incants",
    "body": "All Incants affect the Akashic, but there are some that manipulate it in ways that no others can. I've started to call them §dAkashic Manipulators§r, or §dAkashic Incants§r for short.\n\nThey are able to §ddelete clusters§r, §dswitch their order§r, §dextract them from Lists§r, and even §dduplicate them§r! To an archmagus, these incants can be invaluable.\n\n",
    "buttons": [
      {
        "buttonName": "Xabas (Swap)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "akashics.switch"
          }
        ]
      },
      {
        "buttonName": "Sinjit (Duplicate)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "akashics.duplicate"
          }
        ]
      },
      {
        "buttonName": "Yingim (Erase)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "akashics.erase"
          }
        ]
      },
      {
        "buttonName": "Xibfan (Delay)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "akashics.delay"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.lists": {
    "title": "List Incants",
    "body": "Like §dAkashic Incants§r, there are a subset of Incants that govern the delicate relationship Lists have with Incants and Clusters. I've taken to calling them §dList Manipulators/Incants§r.\n\nThese Incants are able to pull clusters from Lists, allowing them to be used by other Incants easily. In other scenarios, there are even Incants that are able to cast Lists as an incantation of its own.\n\n",
    "buttons": [
      {
        "buttonName": "Burabi (First In List)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "lists.list_first"
          }
        ]
      },
      {
        "buttonName": "Burvir (Last In List)",
        "buttonIcon": "textures/items/paper",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "lists.list_last"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "index.tasks": {
    "title": "Task Incants",
    "body": "While all Incants are important, Tasks are a cut above the rest. These are the Incants that trigger actual magical effects, and no incantation is complete without them.\n\nHowever, there are quite a few of them that exist, and so these are grouped accordingly as well. Well, this is how §oI§r group them.\n\n",
    "buttons": [
      {
        "buttonName": "Alchemical Tasks",
        "buttonIcon": "textures/items/potion_bottle_damageBoost",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      },
      {
        "buttonName": "Elemental Tasks",
        "buttonIcon": "textures/ui/worldsIcon",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      },
      {
        "buttonName": "Spatial Tasks",
        "buttonIcon": "textures/ui/worldsIcon",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.spatial.preface"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  
  "basic.ete": {
    "title": "Ete (Self)",
    "body": "§aIncant§r: ETE\n§aConcept§r: Myself/The Magus\n§aSyntax§r: () ETE\n§aAkashic Input§r: §dEntity§r\n\nETE symbolizes the speaker, or myself. I have deemed it one of my most powerful tools because who better to carry out my Art than myself?\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.gea": {
    "title": "Gea (Position)",
    "body": "§aIncant§r: GEA\n§aConcept§r: Position\n§aSyntax§r: (§dEntity/Block§r) GEA\n§aAkashic Input§r: §dVector§r\n\nThere are times when I need to explicitly state §owhere§r I, another entity, or another block is. This incant is how I do that.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.esijit": {
    "title": "Esijit (See Entity)",
    "body": "§aIncant§r: ESIJIT\n§aConcept§r: See Entity/See Other\n§aSyntax§r: (§dEntity§r) ESIJIT\n§aAkashic Input§r: §dEntity/Null§r\n\nESIJIT allows me to state the entity directly in the line of sight of another entity. I usually have it immediately follow §dETE§r but it takes any entity. This can allow me to pull off some truly strange incantations.\n\nIf there is no entity in the entity's (or my) line of sight, Null will be added to the Akashic. After all, that is what they (or I) see; nothing.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.esifir": {
    "title": "Esifir (See Block)",
    "body": "§aIncant§r: ESIFIR\n§aConcept§r: See Block\n§aSyntax§r: (§dEntity§r) ESIFIR\n§aAkashic Input§r: §dBlock/Null§r\n\nI've found ESIFIR to be useful in incantations that revolve around Vector clusters. By getting a Block, I can definitively tell where it is located, and that can be very useful.\n\nIf I (or whatever Entity it receives) cannot see a Block, it will return Null.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.esipal": {
    "title": "Esipal (See Block Face)",
    "body": "§aIncant§r: ESIPAL\n§aConcept§r: See Block Face\n§aSyntax§r: (§dEntity§r) ESIPAL\n§aAkashic Input§r: §dVector/Null§r\n\nESIPAL is at the border of what I consider \"basic\". It is also slightly misleading. It adds the vector of the location of the side of whatever block the Entity (which can be me) is seeing.\n\nWhen preparing incantations that deal with §ateleportation§r or §dplacing blocks§r, this Incant can be invaluable, so it earns its place in this section.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.esilib": {
    "title": "Esilib (View Direction)",
    "body": "§aIncant§r: ESILIB\n§aConcept§r: View Direction\n§aSyntax§r: (§dEntity§r) ESILIB\n§aAkashic Input§r: §dVector§r\n\nESILIB is one of my simpler, but well used, Vectorial Incants, meaning it adds a Vector to the Akashic.\n\nIt particularly adds the vector of where I'm facing to the Akashic. I've created many §dlaunching incantations§r with this Incant, and I believe I will create many more to come.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.esizon": {
    "title": "Esizon (See Cone)",
    "body": "§aIncant§r: ESIZON\n§aConcept§r: See Entities In Cone\n§aSyntax§r: (§dEntity§r) ESIZON\n§aAkashic Input§r: §dList [Entities]§r\n\nESIZON returns the list of entities an Entity (which can be myself) can see in a cone. It does not work like the other \"sight\" Incants because of this.\n\nI generally use it along with Akashic Incants or various Logical or Loop Incants because each Entity in the List has to be interacted with individually by Incants. I would say this Incant is useful but also a bit complex to use correctly.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.wix": {
    "title": "Wix (Radius)",
    "body": "§aIncant§r: WIX\n§aConcept§r: Entities In a Radius\n§aSyntax§r: (§dVector§r, §aNumber§r) ESIZON\n§aAkashic Input§r: §dList [Entities]§r\n§dNumber Scale:§r §a0.5§r\n\nWIX, like ESIZON, returns a list of entities at a location. However, it does so with the entities in a radius (defined by the §aNumber§r, making it a bit more powerful.\n\nI find it best to use it alongside List Incants because each Entity in the List has to be interacted with individually to affect them in anyway. So far, I am able to weakly imitate homing projectiles when used in close collaboration with Malbizon.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.biegea": {
    "title": "Biegea (Get Head Location)",
    "body": "§aIncant§r: BIEGEA\n§aConcept§r: Get Head Location\n§aSyntax§r: (§aEntity§r) BIEGEA\n§aAkashic Input§r: §aVector§r\n\nSometimes my direct position is not the most ideal position to work magic from. This Incant gathers the location of my head and inserts it into the Akashic.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.firugea": {
    "title": "Firugea (Get Block)",
    "body": "§aIncant§r: FIRUGEA\n§aConcept§r: Get Block\n§aSyntax§r: (§dVector§r) FIRUGEA\n§aAkashic Input§r: Block\n\nI sometimes forget this Incant but make no mistake, it is useful. It is able to turn a Vector cluster into a Block cluster. In other words, it can get the block at a provided position.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.irapal": {
    "title": "Irapal (Localize)",
    "body": "§aIncant§r: IRAPAL\n§aConcept§r: Localize Vector\n§aSyntax§r: (§dEntity§r, §dVector§r) IRAPAL\n§aAkashic Input§r: §dVector§r\n\nThere are ways to gather the directions of the world, but only one that allows the ones relative to an entity. This Incant does this by taking an Entity and localizing the Vector provided to it.\n\nIt is a complex concept yes, but one I'm sure will help me in complex kinetic magics.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  "basic.debug": {
    "title": "Debug (Debug)",
    "body": "§aIncant§r: DEBUG\n§aConcept§r: Debug\n§aSyntax§r: (§dAny§r) DEBUG\n§aAkashic Input§r: §6The Akashic§r\n\nA powerful incant that §dsheds light on the secrets of the Akashic§r. All information in the Akashic will be shown to the caster of this Incant.\n\nThe piece of the Akashic shown is based on where in the incantation DEBUG is.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.basic"
          }
        ]
      }
    ]
  },
  
  "bool.true": {
    "title": "Ira (True)",
    "body": "§aIncant§r: IRA\n§aConcept§r: True/Truth/Validity\n§aSyntax§r: () IRA\n§aAkashic Input§r: §dBoolean§r\n\nThis Incant represents truth, which is a concept that is useful in a variety of §dTasks§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.boolean"
          }
        ]
      }
    ]
  },
  "bool.false": {
    "title": "Iro (False)",
    "body": "§aIncant§r: IRO\n§aConcept§r: False/Lies/Invalidity\n§aSyntax§r: () IRO\n§aAkashic Input§r: §dBoolean§r\n\nThis Incant is the inverse of §dIRA§r, and represents lies, untruth. This does not mean it is not just as important. Like its brother, IRO answers questions, and these questions lie in various §dTasks§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.boolean"
          }
        ]
      }
    ]
  },
  
  "constant.null": {
    "title": "Het (Null)",
    "body": "§aIncant§r: HET\n§aConcept§r: Nothing/Nil/Null\n§aSyntax§r: () HET\n§aAkashic Input§r: §dNull§r\n\nThis Incant is something I cannot wrap my head around. It truly represents nothing. To be precise, it is like an emptiness that cannot even be imagined because §dit simply is not§r...\n\nEither way, it means nothing.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.nowhere": {
    "title": "Malibhet (Nowhere?)",
    "body": "§aIncant§r: MALIBHET\n§aConcept§r: Nowhere/Origin\n§aSyntax§r: () MALIBHET\n§aAkashic Input§r: §dVector§r\n\nSaying MALIBHET gets me §dnowhere§r. However, that simply means that it represents no movement, no direction. In another sense, I §dinvoke the origin (0, 0, 0)§r.\n\nIt is quite confusing, but I think that nowhere is the origin...? I feel as though trying to connect these dots could drive me mad.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.up": {
    "title": "Malibie (Up)",
    "body": "§aIncant§r: MALIBIE\n§aConcept§r: Up/Above\n§aSyntax§r: () MALIBIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §dup (+y)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.down": {
    "title": "Malibfie (Down)",
    "body": "§aIncant§r: MALIBFIE\n§aConcept§r: Down/Below\n§aSyntax§r: () MALIBFIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §ddown (-y)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.east": {
    "title": "Malibdie (East)",
    "body": "§aIncant§r: MALIBDIE\n§aConcept§r: Right/East\n§aSyntax§r: () MALIBDIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §deast (+x)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.west": {
    "title": "Malibcie (West)",
    "body": "§aIncant§r: MALIBCIE\n§aConcept§r: Left/West\n§aSyntax§r: () MALIBCIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §dwest (-x)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.north": {
    "title": "Malibkie (North)",
    "body": "§aIncant§r: MALIBKIE\n§aConcept§r: North\n§aSyntax§r: () MALIBKIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §dnorth (-z)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.south": {
    "title": "Malibjie (South)",
    "body": "§aIncant§r: MALIBJIE\n§aConcept§r: South\n§aSyntax§r: () MALIBJIE\n§aAkashic Input§r: §dVector§r\n\nThis is the Incant that represents §dsouth (+z)§r. That is quite literally it. As a unit vector, it only has a §dlength of 1§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.PI": {
    "title": "Hafozon (PI)",
    "body": "§aIncant§r: HAFOZON\n§aConcept§r: Circle Radius\n§aSyntax§r: () HAFOZON\n§aAkashic Input§r: §dNumber§r\n\nI've cracked it! This Incant somewhat accurately defines the radial representation of a half circle, the radius! What I may do with this, I do not know but I have it in my arsenal.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  "constant.circle": {
    "title": "Holozon (Full Circle)",
    "body": "§aIncant§r: HOLOZON\n§aConcept§r: Full Rotation/Circle\n§aSyntax§r: () HOLOZON\n§aAkashic Input§r: §dNumber§r\n\nPI is one thing, but now I have the radial representation of a full circle... I'm not sure what to do with this.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.constants"
          }
        ]
      }
    ]
  },
  
  "operations.add": {
    "title": "Sinvera (Addition)",
    "body": "§aIncant§r: SINVERA\n§aConcept§r: Addition/Increment\n§aSyntax§r: (§dNumber§r, §dNumber§r) SINVERA §aOR§r (§dVector§r, §dVector§r) SINVERA\n§aAkashic Input§r: §dNumber§r §aOR§r §dVector§r\n\nThis Incant adds together either 2 Numbers or 2 Vectors. I've found that it cannot combine both cluster types.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      }
    ]
  },
  "operations.subtract": {
    "title": "Sinvara (Subtraction)",
    "body": "§aIncant§r: SINVARA\n§aConcept§r: Subtraction/Decrement\n§aSyntax§r: (§dNumber§r, §dNumber§r) SINVARA §aOR§r (§dVector§r, §dVector§r) SINVARA\n§aAkashic Input§r: §dNumber§r §aOR§r §dVector§r\n\nThis Incant subtracts either 2 Numbers or 2 Vectors, finding the difference. I've found that it cannot find the difference between a Vector and a Number and vice versa.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      }
    ]
  },
  "operations.multiply": {
    "title": "Tocover (Multiplication)",
    "body": "§aIncant§r: TOCOVER\n§aConcept§r: Multiplying\n§aSyntax§r: (§dVector/Number§r, §dNumber§r) TOCOVER §aOR§r (§dVector§r, §dVector§r) TOCOVER\n§aAkashic Input§r: §dNumber§r §aOR§r §dVector§r\n\nThis Incant multiplies Numbers and/or Vectors, finding a product. Multipying 2 Vectors or 2 Numbers is a simple matter, but §dmultiplying a Number and a Vector§r requires the §dVector to come first§r, eg. §dMALIBIE 2§r §gTOCOVER§r\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      }
    ]
  },
  "operations.divide": {
    "title": "Tocovar (Division)",
    "body": "§aIncant§r: TOCOVAR\n§aConcept§r: Dividing\n§aSyntax§r: (§dVector/Number§r, §dNumber§r) TOCOVER §aOR§r (§dVector§r, §dVector§r) TOCOVAR\n§aAkashic Input§r: §dNumber§r §aOR§r §dVector§r\n\nThis Incant divides Numbers and/or Vectors, finding their quotient. Dividing 2 Vectors or 2 Numbers is a simple matter, but §ddividing a Number and a Vector§r follows the same rules as multiplying them, eg. §dMALIBIE 2§r §gTOCOVAR§r\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      }
    ]
  },
  "operations.roundOff": {
    "title": "Ironim (Round Off)",
    "body": "§aIncant§r: IRONIM\n§aConcept§r: Round Off Number\n§aSyntax§r: (§dNumber§r) IRONIM\n§aAkashic Input§r: §dNumber§r\n\nThis Incant rounds off a number to the nearest ones place. I can use this to round off decimals should they come in my incantations.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operations"
          }
        ]
      }
    ]
  },
  
  "akashics.switch": {
    "title": "Xabas (Swap)",
    "body": "§aIncant§r: XABAS\n§aConcept§r: Swap Places\n§aSyntax§r: (§2Any§r, §6Any§r) XABAS\n§aAkashic Input§r: §6Any§r, §2Any§r\n\n§dXABAS§r takes the two last added clusters in the Akashic and swaps their order.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.akashics"
          }
        ]
      }
    ]
  },
  "akashics.duplicate": {
    "title": "Sinjit (Duplicate)",
    "body": "§aIncant§r: SINJIT\n§aConcept§r: Duplicate/Copy Paste\n§aSyntax§r: (§dAny§r) SINJIT\n§aAkashic Input§r: §dAny§r\n\n§dSINJIT§r is a simple but very useful Incant I've found. It directly §dcopies§r the Incant at the top of the Akashic and §dinserts a copy of it back in§r.\n\nI've used this method many times to save and affect Clusters after a delay, or to preserve Clusters that I will use later on in an incantation.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.akashics"
          }
        ]
      }
    ]
  },
  "akashics.erase": {
    "title": "Yingim (Erase)",
    "body": "§aIncant§r: YINGIM\n§aConcept§r: Erase/Delete\n§aSyntax§r: (§aAny§r) YINGIM\n§aAkashic Input§r: \n\n§dYINGIM§r takes the most recent cluster in the Akashic and erases it.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.akashics"
          }
        ]
      }
    ]
  },
  "akashics.delay": {
    "title": "Xibfan (Delay)",
    "body": "§aIncant§r: XIBFAN\n§aConcept§r: Delay/Pause\n§aSyntax§r: (§aNumber§r) XIBFAN\n§aAkashic Input§r: \n\n§dXIBFAN§r is a powerful Akashic Incant that pauses an incantation for a few seconds. This amount generally §dcannot exceed 10 seconds§r, but even this small amount of time is enough to greatly influence the result.\n\nUnderstand this however; XIBFAN truly pauses an incantation. Delaying an incant like ESIJIT can allow the targeted entity to §dmove out of the way§r and cause it to §dreturn NULL§r as soon as this delay's duration is up.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.akashics"
          }
        ]
      }
    ]
  },
  
  "vectors.createVector": {
    "title": "Sinafil (Create Vector)",
    "body": "§aIncant§r: SINAFIL\n§aConcept§r: Create Vector\n§aSyntax§r: (§dNumber§r, §dNumber§r, §dNumber§r) SINAFIL\n§aAkashic Input§r: §dVector§r \n\n§dSINAFIL§r takes three Number Clusters and transforms them into a Vector Cluster. Simple but quite effective.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      }
    ]
  },
  "vectors.breakVector": {
    "title": "Yinafil (Break Vector)",
    "body": "§aIncant§r: YINAFIL\n§aConcept§r: Break Vector\n§aSyntax§r: (§dVector§r) YINAFIL\n§aAkashic Input§r: §dNumber§r, §dNumber§r, §dNumber§r\n\n§dYINAFIL§r takes a Vector Cluster and breaks it down into its Number Clusters. Why it exists, I suppose I will find out.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      }
    ]
  },
  "vectors.length": {
    "title": "Libafil (Length)",
    "body": "§aIncant§r: LIBAFIL\n§aConcept§r: Length\n§aSyntax§r: (§dVector§r) LIBAFIL\n§aAkashic Input§r: §dNumber§r\n\n§dLIBAFIL§r takes a Vector Cluster and returns how long it is. I'm sure I can find a use for this.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      }
    ]
  },
  "vectors.distance": {
    "title": "Libas (Distance)",
    "body": "§aIncant§r: LIBAS\n§aConcept§r: Length\n§aSyntax§r: (§dVector§r, §dVector§r) LIBAS\n§aAkashic Input§r: §dNumber§r\n\n§dLIBAS§r takes 2 Vector Clusters and returns the distance between them. It could be useful in determining how far away a location is from another in blocks.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      }
    ]
  },
  "vectors.roundOff": {
    "title": "Irokie (Round Off Vector)",
    "body": "§aIncant§r: IROKIE\n§aConcept§r: Round Off Vector\n§aSyntax§r: (§dVector§r) IROKIE\n§aAkashic Input§r: §dVector§r\n\n§dIROKIE§r rounds off each value in a Vector Cluster. At first, I did not believe this to be very useful, but upon creating incantations that form walls, I found that they generally featured this incant in them.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.vectors"
          }
        ]
      }
    ]
  },
  
  "lists.list_first": {
    "title": "Burabi (First In List)",
    "body": "§aIncant§r: BURABI\n§aConcept§r: First in the List\n§aSyntax§r: (§aList§r) BURABI\n§aAkashic Input§r: §aAny§r \n\nI've encountered problems in the past with extracting information from Lists of Clusters. This Incant helps solve that.\n\n§dBURABI§r takes a List and pulls out the §dmost recent cluster§r added to it and then §dputs it into the Akashic§r. The List is erased afterwards though, so I should be thoughtful when utilizing a method like this.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.lists"
          }
        ]
      }
    ]
  },
  "lists.list_last": {
    "title": "Burvir (Last In List)",
    "body": "§aIncant§r: BURVIR\n§aConcept§r: Last in the List\n§aSyntax§r: (§aList§r) BURVIR\n§aAkashic Input§r: §aAny§r \n\nThis Incant is the direct opposite of §dBURABI§r, pulling out the first cluster added to a provided List.\n\nThe first cluster in the List is normally the most dated one, but that is not always the case. As a result, I must understand that §dBURVIR§r simply pulls from the very bottom of a List.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.lists"
          }
        ]
      }
    ]
  },
  
  "queries.running": {
    "title": "Maleme? (Running?)",
    "body": "§aIncant§r: MALEME?\n§aConcept§r: Is Running?\n§aSyntax§r: (§aEntity§r) MALEME?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they running?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.sneaking": {
    "title": "Xibfie? (Sneaking?)",
    "body": "§aIncant§r: XIBFIE?\n§aConcept§r: Is Sneaking?\n§aSyntax§r: (§aEntity§r) XIBFIE?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they sneaking?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.jumping": {
    "title": "Malbie? (Jumping?)",
    "body": "§aIncant§r: MALBIE?\n§aConcept§r: Is Jumping?\n§aSyntax§r: (§aEntity§r) MALBIE?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they jumping?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.falling": {
    "title": "Malfie? (Falling?)",
    "body": "§aIncant§r: MALFIE?\n§aConcept§r: Is Falling?\n§aSyntax§r: (§aEntity§r) MALBIE?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they falling?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.onLand": {
    "title": "Gelacor? (On Ground?)",
    "body": "§aIncant§r: GELACOR?\n§aConcept§r: Is On Ground?\n§aSyntax§r: (§aEntity§r) GELACOR?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they on the ground?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.inWater": {
    "title": "Gelaqar? (In Water?)",
    "body": "§aIncant§r: GELACOR?\n§aConcept§r: Is In Water?\n§aSyntax§r: (§aEntity§r) GELAQAR?\n§aAkashic Input§r: §aBoolean§r \n\nThis incant asks the question, \"Are they in water?\". Depending on its answer, your output can change.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  "queries.health": {
    "title": "Yic? (Health?)",
    "body": "§aIncant§r: YIC?\n§aConcept§r: How Much Health?\n§aSyntax§r: (§dEntity§r) YIC?\n§aAkashic Input§r: §dHealth§r\n\nThis is not healing incant. I've made that mistake before. This incant simply gets the health of the Entity, but I have found it useful in certain complex incantations.\n\nAs for simpler uses, I have used YIC? to §adiscern the health of others§r with the help of §dETE ESIJIT§r and §dDEBUG§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.queries"
          }
        ]
      }
    ]
  },
  
  "operators.if": {
    "title": "If",
    "body": "§aIncant§r: IF\n§aConcept§r: Logical If\n§aSyntax§r: (§dCondition:§r §aBoolean§r, §dIf True?:§r §aList§r, §dIf False?:§r §aList§r) IF\n§aAkashic Input§r: §aAny§r\n\nA powerful Incant that is able to allow an incantation to have multiple effects based solely on the state of the §dCondition§r.\n\nIf the §dCondition§r is §dtrue§r, the §dIf True§r List will be cast as if it is an incantation. If the §dCondition§r is §dfalse§r, the §dIf False§r List is cast instead.\n\nIn both cases, it is assumed that the Lists contain Incants. I have noted down how to achieve this in §dBracket Incants§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.or": {
    "title": "Or",
    "body": "§aIncant§r: OR\n§aConcept§r: Logical Or\n§aSyntax§r: (§aBoolean§r, §aBoolean§r) OR\n§aAkashic Input§r: §aBoolean§r\n\nAn Incant that discerns the validity of two conditions (or simply two Boolean clusters). If either of the conditions are true, this Incant will output §dtrue§r. If that's not the case, I will recieve §dfalse§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.and": {
    "title": "And",
    "body": "§aIncant§r: AND\n§aConcept§r: Logical And\n§aSyntax§r: (§aBoolean§r, §aBoolean§r) AND\n§aAkashic Input§r: §aBoolean§r\n\nAn Incant that discerns the validity of two conditions (or simply two Boolean clusters). If §lboth§r of the conditions are true, this Incant will output §dtrue§r. If that's not the case, I will recieve §dfalse§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.not": {
    "title": "Not",
    "body": "§aIncant§r: NOT\n§aConcept§r: Logical Not\n§aSyntax§r: (§aBoolean§r) NOT\n§aAkashic Input§r: §aBoolean§r\n\nThis Incant §dreverses§r the validity of the provided boolean. I've learned that that means \"true\" becomes \"false\", and vice versa.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.equal": {
    "title": "Jit (Equals)",
    "body": "§aIncant§r: JIT\n§aConcept§r: Equality\n§aSyntax§r: (§aAny§r, §aAny§r) JIT\n§aAkashic Input§r: §aBoolean§r\n\nThis incant compares the §dvalue§r of two clusters. If they match, this will add true to the Akashic, else it will add false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.trueEqual": {
    "title": "Irajit (Truly Equal)",
    "body": "§aIncant§r: IRAJIT\n§aConcept§r: True Equality\n§aSyntax§r: (§aAny§r, §aAny§r) IRAJIT\n§aAkashic Input§r: §aBoolean§r\n\nThis incant compares the §dvalue§r, §dtype§r, and §dpotential subtype§r of two clusters. If they all match, this will add true to the Akashic, else it will add false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.greaterThan": {
    "title": "Jirver (Greater Than)",
    "body": "§aIncant§r: JIRVER\n§aConcept§r: Greater Than\n§aSyntax§r: (§aNumber§r, §aNumber§r) JIRVER\n§aAkashic Input§r: §aBoolean§r\n\nThis incant figures out if §aNumber 1§r is larger than §aNumber 2§r. Of course, this will return true if that is the case, else the Akashic will recieve a false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.greaterThanEqual": {
    "title": "Jirverjit (Greater Than/Equal)",
    "body": "§aIncant§r: JIRVERJIT\n§aConcept§r: Greater Than/Equal\n§aSyntax§r: (§aNumber§r, §aNumber§r) JIRVERJIT\n§aAkashic Input§r: §aBoolean§r\n\nThis incant figures out if §aNumber 1§r is equal to or larger than §aNumber 2§r. Of course, this will return true if that is the case, else the Akashic will recieve a false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.lessThan": {
    "title": "Jirvar (Less Than)",
    "body": "§aIncant§r: JIRVAR\n§aConcept§r: Greater Than\n§aSyntax§r: (§aNumber§r, §aNumber§r) JIRVAR\n§aAkashic Input§r: §aBoolean§r\n\nThis incant figures out if §aNumber 1§r is less than §aNumber 2§r. Of course, this will return true if that is the case, else the Akashic will recieve a false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  "operators.lessThanEqual": {
    "title": "Jirvarjit (Less Than/Equal)",
    "body": "§aIncant§r: JIRVARJIT\n§aConcept§r: Less Than/Equal\n§aSyntax§r: (§aNumber§r, §aNumber§r) JIRVARJIT\n§aAkashic Input§r: §aBoolean§r\n\nThis incant figures out if §aNumber 1§r is equal to or less than §aNumber 2§r. Of course, this will return true if that is the case, else the Akashic will recieve a false.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.operators"
          }
        ]
      }
    ]
  },
  
  "tasks.alchemy.preface": {
    "title": "Alchemical Tasks",
    "body": "Words can have an effect on creatures, and that is certainly true for Alchemical Tasks (or §dAlchemicals§r). When given the right clusters, entities can be buffed and debuffed with just a swift (but precise) look.\n\n",
    "buttons": [
      {
        "buttonName": "Esieme",
        "excludeTags": ["incant:night_vision"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.night_vision_locked"
          }
        ]
      },
      {
        "buttonName": "Esieme (Night Vision)",
        "buttonIcon": "textures/ui/night_vision_effect",
        "buttonTagRequirements": ["incant:night_vision"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.night_vision_unlocked"
          }
        ]
      },
      {
        "buttonName": "Hesayic",
        "excludeTags": ["incant:regeneration"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.regeneration_locked"
          }
        ]
      },
      {
        "buttonName": "Hesayic (Regeneration)",
        "buttonIcon": "textures/ui/regeneration_effect",
        "buttonTagRequirements": ["incant:regeneration"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.regeneration_unlocked"
          }
        ]
      },
      {
        "buttonName": "Malbascor",
        "excludeTags": ["incant:levitation"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.levitation_locked"
          }
        ]
      },
      {
        "buttonName": "Malbascor (Levitation)",
        "buttonIcon": "textures/ui/levitation_effect",
        "buttonTagRequirements": ["incant:levitation"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.levitation_unlocked"
          }
        ]
      },
      {
        "buttonName": "Malbie",
        "excludeTags": ["incant:leaping"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.leaping_locked"
          }
        ]
      },
      {
        "buttonName": "Malbie (Leaping)",
        "buttonIcon": "textures/ui/jump_boost_effect",
        "buttonTagRequirements": ["incant:leaping"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.leaping_unlocked"
          }
        ]
      },
      {
        "buttonName": "Malfievar",
        "excludeTags": ["incant:slow_falling"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.slow_falling_locked"
          }
        ]
      },
      {
        "buttonName": "Malfievar (Slow Falling)",
        "buttonIcon": "textures/ui/slow_falling_effect",
        "buttonTagRequirements": ["incant:slow_falling"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.slow_falling_unlocked"
          }
        ]
      },
      {
        "buttonName": "Malvaryiq",
        "excludeTags": ["incant:hunger"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.hunger_locked"
          }
        ]
      },
      {
        "buttonName": "Malvaryiq (Hunger)",
        "buttonIcon": "textures/ui/hunger_effect",
        "buttonTagRequirements": ["incant:hunger"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.hunger_unlocked"
          }
        ]
      },
      {
        "buttonName": "Abracadabra",
        "excludeTags": ["incant:nausea"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.nausea_locked"
          }
        ]
      },
      {
        "buttonName": "Abracadabra (Nausea)",
        "buttonIcon": "textures/ui/nausea_effect",
        "buttonTagRequirements": ["incant:nausea"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.nausea_unlocked"
          }
        ]
      },
      {
        "buttonName": "Redesi",
        "excludeTags": ["incant:blindness"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.blindness_locked"
          }
        ]
      },
      {
        "buttonName": "Redesi (Blindness)",
        "buttonIcon": "textures/ui/blindness_effect",
        "buttonTagRequirements": ["incant:blindness"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.blindness_unlocked"
          }
        ]
      },
      {
        "buttonName": "Semayiq",
        "excludeTags": ["incant:poison"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.poison_locked"
          }
        ]
      },
      {
        "buttonName": "Semayiq (Poison)",
        "buttonIcon": "textures/ui/poison_effect",
        "buttonTagRequirements": ["incant:poison"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.poison_unlocked"
          }
        ]
      },
      {
        "buttonName": "Xabesi",
        "excludeTags": ["incant:invisibility"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.invisibility_locked"
          }
        ]
      },
      {
        "buttonName": "Xabesi (Invisibility)",
        "buttonIcon": "textures/ui/invisibility_effect",
        "buttonTagRequirements": ["incant:invisibility"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.invisibility_unlocked"
          }
        ]
      },
      {
        "buttonName": "Yixyiq",
        "excludeTags": ["incant:wither"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.wither_locked"
          }
        ]
      },
      {
        "buttonName": "Yixyiq (Wither)",
        "buttonIcon": "textures/ui/wither_effect",
        "buttonTagRequirements": ["incant:wither"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.wither_unlocked"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.night_vision_locked": {
    "title": "Esieme",
    "body": "The Incant of Night Vision is hidden within these pages. However, to truly understand it, I will require §aan item§r, reader.\n\n§aBring to me the glow of the sea.§r Just one is sufficient.\n\n",
    "buttons": [
      {
        "buttonName": "Solve",
        "buttonIcon": "textures/ui/missing_item",
        "requiredItem": {
          "item": "minecraft:glow_ink_sac",
          "amount": 1
        },
        "onClick": [
          {
            "type": "giveXP",
            "amount": 10
          },
          {
            "type": "addTag",
            "tag": "incant:night_vision"
          },
          {
            "type": "sayInfo",
            "info": "I §dsee§r! I see beyond the cracks of the World, and they bleed with the light of a thousand luminous Gods...\n\n§aI have unlocked §d[Esieme]§a!§r"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.night_vision_unlocked": {
    "title": "Esieme (Night Vision)",
    "body": "§aIncant§r: ESIEME\n§aConcept§r: Night Vision\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) ESIEME\n§dDuration Scale:§r §a15§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nThis Incant allows me to see in the dark as well as I would in the dark. Quite a useful little ability when §dexploring deep, dark spaces§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.regeneration_locked": {
    "title": "Hesayic",
    "body": "The Incant of Regeneration is hidden within these pages. To unlock it, a magus will need two \"things\":\n- be §dwithin or above their 3rd Ascension§r.\n- experience the §dsting of combat§r.\n\nMeet these conditions, and the path will become clear.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.regeneration_unlocked": {
    "title": "Hesayic (Regeneration)",
    "body": "§aIncant§r: HESAYIC\n§aConcept§r: Regeneration\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) HESAYIC\n§dDuration Scale:§r §a10§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nThere are times when I recieve wounds I wish to heal. This Incant is one solution to my problem.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.levitation_locked": {
    "title": "Malbascor",
    "body": "The Incant of Levitation is hidden within these pages. There isn’t much to speak of with this one. The §dsensation of falling§r should be enough for you to understand.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.levitation_unlocked": {
    "title": "Malbascor (Levitation)",
    "body": "§aIncant§r: MALBASCOR\n§aConcept§r: Levitation/Float\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) MALBASCOR\n§dDuration Scale:§r §a5§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nMany magi have tried to simulate flight, and many texts speak of these\"leaping magi\". However, if I wish for a calmer, more controlled way to get to higher places, I believe I have solved my problem.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.leaping_locked": {
    "title": "Malbie",
    "body": "The Incant of Leaping is hidden within these pages. I quite like this one. The §dfoot of the leaping prey§r is the key to this mystical lock.\n\n",
    "buttons": [
      {
        "buttonName": "Solve",
        "buttonIcon": "textures/ui/missing_item",
        "requiredItem": {
          "item": "minecraft:rabbit_foot",
          "amount": 1
        },
        "onClick": [
          {
            "type": "giveXP",
            "amount": 20
          },
          {
            "type": "addTag",
            "tag": "incant:leaping"
          },
          {
            "type": "sayInfo",
            "info": "This item holds the intrinsic ability all rabbits have. Now that ability is mine.\n\n§aI have unlocked §d[Malbie]§a!§r"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.leaping_unlocked": {
    "title": "Malbie (Leaping)",
    "body": "§aIncant§r: MALBIE\n§aConcept§r: Leaping/Jump Boost\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) MALBIE\n§dDuration Scale:§r §a15§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nTo leap or not to leap; that is §otruly§r the question. I am sure my agility will only improve with this.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.slow_falling_locked": {
    "title": "Malfievar",
    "body": "The Incant of Slow Falling is hidden within these pages. It is a hero without a cape that every magus worth ANYTHING has in their arsenal. The trick to this lock lies in the subtle art of §dfalling§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.slow_falling_unlocked": {
    "title": "Malfievar (Slow Falling)",
    "body": "§aIncant§r: MALFIEVAR\n§aConcept§r: Slow Falling\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) MALFIEVAR\n§dDuration Scale:§r §a20§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nThis Incant slows the fall of any mob its effect is applied to. As a result, it is a staple in flight incantations for the ancient magi.\n\nAs for me, I use it to escape the blow of all sorts of impact, so no movement incantation of mine is safe from  MALFIEVAR's influence.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.hunger_locked": {
    "title": "Malvaryiq",
    "body": "The Incant of Hunger is hidden within these pages. I suppose it is not much surprise that only those who have partaken in the §dmost unsavory of flesh§r knows this concept well. At the 5th Ascension, it will all make sense.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.hunger_unlocked": {
    "title": "Malvaryiq (Hunger)",
    "body": "§aIncant§r: MALVARYIQ\n§aConcept§r: Hunger\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) MALVARYIQ\n§dDuration Scale:§r §a10§r\n§dAmplifier Scale:§r §a0.25§r\n§aAkashic Input§r: \n\nHunger can be deadly and it is not hard to see why. However, I have never been able to weaponize it. Perhaps this is my chance.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.nausea_locked": {
    "title": "Abracadabra",
    "body": "The Incant of Nausea is hidden within these pages. The answer can be found on the 8th Ascension, after §ddrinking a flowery stew§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.nausea_unlocked": {
    "title": "Abracadabra (Nausea)",
    "body": "§aIncant§r: ABRACADABRA\n§aConcept§r: Nausea\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) ABRACADABRA\n§dDuration Scale:§r §a10§r\n§dAmplifier Scale:§r §a0.25§r\n§aAkashic Input§r: \n\nSwimming visions of magical squiggles. The land is moving, my head feels wrong. My sight is wobbly and the World is too. I should have never uttered this accursed word.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.blindness_locked": {
    "title": "Redesi",
    "body": "The Incant of Blindness is hidden within these pages. My experiences with this Incant have never been my findest, but I will say this; the answer lies with the §dtrue wanderer of the depths§r.\n\nBring back with you the §dblackness§r that lies §dwithin the ocean§r. Just one will do the trick.\n\n",
    "buttons": [
      {
        "buttonName": "Solve",
        "buttonIcon": "textures/ui/missing_item",
        "requiredItem": {
          "item": "minecraft:ink_sac",
          "amount": 1
        },
        "onClick": [
          {
            "type": "giveXP",
            "amount": 20
          },
          {
            "type": "addTag",
            "tag": "incant:blindness"
          },
          {
            "type": "sayInfo",
            "info": "This ink is dark and mundane but I understand its essence. I was once like it.\n\n§aI have unlocked §d[Redesi] §a!§r"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.blindness_unlocked": {
    "title": "Redesi (Blindness)",
    "body": "§aIncant§r: REDESI\n§aConcept§r: Blindness\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) REDESI\n§dDuration Scale:§r §a8§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nPlunging enemies into darkness and confusion is a great strategy to use in combat. REDESI, I've found, is the best way to do this.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.poison_locked": {
    "title": "Semayiq",
    "body": "The Incant of Poison is hidden within these pages. It is as insidious as its effect, and is especially receptive to painful, but not deadly, suffering.\n\nThe §dscuttling weaver§r has many §deyes§r, and the key lies in one's grotesque §dconsumption§r. Be warned; only a magus of the 8th Ascension or higher may pry this lock apart.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.poison_unlocked": {
    "title": "Semayiq (Poison)",
    "body": "§aIncant§r: SEMAYIQ\n§aConcept§r: Poison\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) SEMAYIQ\n§dDuration Scale:§r §a5§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nPoison is a vicious enemy, but I hold it on my tongue as skillfully as a pillager holds their crossbow. However, even with this, the undead seem to pay its effects no mind. Disappointing.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.invisibility_locked": {
    "title": "Xabesi",
    "body": "The Incant of Invisibility is hidden within these pages. Invisibility is surprisingly simple to acquire. When a magus achieves their 4th Ascension,  §dexperiencing this mystical effect§r is all that is necessary for it to be understood.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.invisibility_unlocked": {
    "title": "Xabesi (Invisibility)",
    "body": "§aIncant§r: XABESI\n§aConcept§r: Invisibility\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) XABESI\n§dDuration Scale:§r §a20§r\n§dAmplifier Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nI have stumbled into the truly mystical effects of Arcanism. I am able to vanish from sight with just a few words. My armor and items are still very much visible though, so I'm not sure how much good such an effect will do me...\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.wither_locked": {
    "title": "Yixyiq",
    "body": "The Incant of Wither & Decay is hidden within these pages.\n\n§oWithin the fortress of hellish brick, a skeleton of black bone a magus must vanquish.\n\n The 12th Ascension they must acquire through Arcanic, else for nothing their armored body might perish.§r\n\nI see my prophetic poetry is improving.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  "tasks.alchemy.wither_unlocked": {
    "title": "Yixyiq (Wither)",
    "body": "§aIncant§r: YIXYIQ\n§aConcept§r: Wither/Decay\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dShow Particles?:§r §aBoolean§r, §dAmplifier:§r §aNumber§r, §dDuration:§r §aNumber§r) YIXYIQ\n§dDuration Scale:§r §a5§r\n§dAmplifier Scale:§r §a0.25§r\n§aAkashic Input§r: \n\nResearch into this word has considered this word synonymous with Death; however, I just consider it decay and corrosion. This is one effective way to get rid of pests that I mean harm.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.alchemy.preface"
          }
        ]
      }
    ]
  },
  
  "tasks.elements.preface": {
    "title": "Elemental Tasks",
    "body": "I've found that with the right Incants, I can conjure the elements. I doubt I will ever be able to fashion them into beautiful displays of power though.\n\nFinding the right words can be a challenge though. My only clue is that §dsubjecting myself to the element's influence§r seems to be one way to unlock their power.\n\nAny that I find will be noted down in this section.\n\n",
    "buttons": [
      {
        "buttonName": "Fus (Light)",
        "buttonIcon": "textures/blocks/torch_on",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.light"
          }
        ]
      },
      {
        "buttonName": "Bis (Fire)",
        "buttonIcon": "textures/blocks/fire_0_placeholder",
        "buttonTagRequirements": ["incant:burn"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.fire"
          }
        ]
      },
      {
        "buttonName": "Malbizon (Fire Charge)",
        "buttonIcon": "textures/items/fireball",
        "buttonTagRequirements": ["incant:ballOfFire"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.fireCharge"
          }
        ]
      },
      {
        "buttonName": "Qar (Water)",
        "buttonIcon": "textures/blocks/water_placeholder",
        "buttonTagRequirements": ["incant:wet"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.water"
          }
        ]
      },
      {
        "buttonName": "Qarilic (Frost)",
        "buttonIcon": "textures/blocks/powdered_snow",
        "buttonTagRequirements": ["incant:frost"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.frost"
          }
        ]
      },
      {
        "buttonName": "Sinbashus (Lightning)",
        "buttonIcon": "textures/items/copper_ingot",
        "buttonTagRequirements": ["incant:lightning"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.lightning"
          }
        ]
      },
      {
        "buttonName": "Bishuscor (Explode)",
        "buttonIcon": "textures/blocks/tnt_side",
        "buttonTagRequirements": ["incant:explode"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.explode"
          }
        ]
      },
      {
        "buttonName": "Mal (Impulse)",
        "buttonIcon": "textures/items/arrow",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.impulse"
          }
        ]
      },
      {
        "buttonName": "Maljie (Knockback)",
        "buttonIcon": "textures/items/iron_ingot",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.knockback"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.light": {
    "title": "Fus (Light)",
    "body": "§aIncant§r: FUS\n§aConcept§r: Light/Illumination\n§aSyntax§r: (§dTarget Location:§r §aVector§r) FUS\n§aAkashic Input§r: \n\nI suppose when the Gods lit up the World, they spoke this word. I cannot imagine how much arcana such a feat would cost.\n\nEither way, I have with me a simpke Incant, Light, that illuminates the dark. I should be careful to not overpopulate the World with it. I've seen records that show that this can cause a strange phenomenon known only as \"lag\".\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.fire": {
    "title": "Bis (Fire)",
    "body": "§aIncant§r: BIS\n§aConcept§r: Fire\n§aSyntax (1)§r: (§dTarget:§r §aEntity§r) BIS\n§aSyntax (2)§r: (§dLocation:§r §aVector§r) BIS\n§aAkashic Input§r: \n\nBIS, the Incant of both warmth and destruction. In the instance that I've come upon it, it burns. Perhaps that burning I can share to those who wish me ill.\n\nIf I direct it at an Entity, it will likely burst into flames. If I direct it at a Vector, it will like catch fire. I can say truthfully that this word §oburns§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.water": {
    "title": "Qar (Water)",
    "body": "§aIncant§r: QAR\n§aConcept§r: Water/Douse\n§aSyntax (1)§r: (§dTarget:§r §aEntity§r) QAR\n§aSyntax (2)§r: (§dLocation:§r §aVector§r) QAR\n§aAkashic Input§r: \n\nWith this Incant, I can conjure water. This water source is not permanent however, so I'm unsure of how useful this specific Task will be to me.\n\nIt can also be directed at an Entity, in which case it will likely extinguish them if they are burning.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.frost": {
    "title": "Qarilic (Frost)",
    "body": "§aIncant§r: QARILIC\n§aConcept§r: Frost\n§aSyntax (1)§r: (§dTarget:§r §aEntity§r) QARILIC\n§aSyntax (2)§r: (§dLocation:§r §aVector§r) QARILIC\n§aAkashic Input§r: \n\nWith this Incant, I can create snow; the dangerous kind. Being the dangerous kind, wading into it will have dire consequences, and not many like being frozen to death.\n\nFurthermore, it can be directed at an Entity to cause them some freezing damage. This makes it one of the only incants to do some form of direct damage.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.lightning": {
    "title": "Sinbashus (Lightning)",
    "body": "§aIncant§r: SINBASHUS\n§aConcept§r: Lightning Strike\n§aSyntax§r: (§dStrike Location:§r §aVector§r) SINBASHUS\n§aAkashic Input§r: \n\nSINBASHUS is likely one of my most powerful combatative Incants. With only a location, I can call down a bolt of lightning to strike my target. I can see some interesting combat spells sparking from this Incant.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.explode": {
    "title": "Bishuscor (Explode)",
    "body": "§aIncant§r: BISHUSCOR\n§aConcept§r: Combustion\n§aSyntax§r: (§dTarget Location:§r §aVector§r, §dPower:§r §aNumber§r, §dBreak Blocks?:§r §aBoolean§r, §dCause Fires?:§r §aBoolean§r) BISHUSCOR\n§dPower Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nThis is likely one of the Incants that made magi dangerous people to anger. A simple word and a simple location and a whole area could potentially be razed.\n\nThankfully, no mere novice can pull of explosions of any true terrifying sizes. I do wonder though, what did the ancient magi do about the experts that decided they were up to mystical (and explosive) mischief?\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.impulse": {
    "title": "Mal (Impulse)",
    "body": "§aIncant§r: MAL\n§aConcept§r: Impulse\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dDirection:§r §aVector§r) MAL\n§aAkashic Input§r: \n\nI've figured out how to manipulate the force around an entity. For some reason, this technique does not work on my peers, but it does apply to things like mobs, projectiles, and items.\n\nI'm sure I could use this psuedo-telekinesis for §osomething§r.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.knockback": {
    "title": "Maljie (Knockback)",
    "body": "§aIncant§r: MALJIE\n§aConcept§r: Knockback\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dUpward Value:§r §aNumber§r, §dForward Value:§r §aNumber§r, §dDirection:§r §aVector§r) MALJIE\n§dUpward Value Scale:§r §a0.25§r\n§dForward Value Scale:§r §a0.5§r\n§aAkashic Input§r: \n\nMALJIE is an offshoot of MAL in a way, I think. It's original purpose was to shove backwards but from my findings, hardly any magus used it for this purpose.\n\nThis is apparently the secret to highspeed flight, but only if I figure out the right combination of Incants...\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  "tasks.elements.fireCharge": {
    "title": "Malbizon (Fire Charge)",
    "body": "§aIncant§r: MALBIZON\n§aConcept§r: Knockback\n§aSyntax§r: (§dSpawn Position:§r §aVector§r, §dVelocity:§r §aVector§r) MALBIZON\n§aAkashic Input§r: \n\nAs shameful as it might sound, a dream of mine has always been to fire a projectile using magic. Now I can!\n\nA common mantra I use just before it to ensure that this Incant works is §dETE BIEGEA ETE ESILIB SINVERA ETE ESILIB§r. It simply causes the fire charge to shoot outwards in front of me in the direction I am looking.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.elements.preface"
          }
        ]
      }
    ]
  },
  
  "tasks.spatial.preface": {
    "title": "Spatial Tasks",
    "body": "The Incants that lie beyond this page move the caster/target entity instantaneously across a space. Whether or not this is done with precision depends on the Incant and the caster themselves.However, some level of understanding of §dVector clusters§r and §dVector Manipulators§r would make using them creatively far easier.\n\n",
    "buttons": [
      {
        "buttonName": "Malfan (Blink)",
        "buttonIcon": "textures/items/ender_pearl",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.spatial.blink"
          }
        ]
      },
      {
        "buttonName": "Malfaneme (Teleport)",
        "buttonIcon": "textures/items/ender_pearl",
        "buttonTagRequirements": ["incant:basics"],
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.spatial.teleport"
          }
        ]
      },
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "index.preface"
          }
        ]
      }
    ]
  },
  "tasks.spatial.blink": {
    "title": "Malfan (Blink)",
    "body": "§aIncant§r: MALFAN\n§aConcept§r: Light/Illumination\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dDistance:§r §aNumber§r) MALFAN\n§dDistance Scale:§r §a20§r\n§aAkashic Input§r: \n\nThis Incant allows me to §dmove myself instantaneously along in the direction I'm looking§r. I must be careful however; the World doesn’t seem to care where, or rather in §owhat§r, I end up.\n\nUsing MALFAN creatively requires some skill and out of the box thinking as far as I've seen, but that doesn’t mean it isn’t as dangerous as any other Task Incant.\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.spatial.preface"
          }
        ]
      }
    ]
  },
  "tasks.spatial.teleport": {
    "title": "Malfaneme (Teleport)",
    "body": "§aIncant§r: MALFANEME\n§aConcept§r: Teleport\n§aSyntax§r: (§dTarget:§r §aEntity§r, §dLocation:§r §aVector§r) MALFANEME\n§aAkashic Input§r: §aBoolean§r\n\nThis method of travel is both convenient and somewhat safe. I am now able to state a location and simply be there, but my arcana gets sapped by around 2 multiplied by the amount of blocks I travel. I am also unable to transport myself into blocks.\n\nCuriously, MALFANEME seems to add the results of my attempt to the Akashic, allowing to check whether the attempt was successful. Perhaps this can be utilized...\n\n",
    "buttons": [
      {
        "buttonName": "Back",
        "buttonIcon": "textures/ui/book_arrowleft_default",
        "onClick": [
          {
            "type": "openForm",
            "form": "tasks.spatial.preface"
          }
        ]
      }
    ]
  },
};