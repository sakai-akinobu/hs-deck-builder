export const Heros = [
  "DRUID",
  "HUNTER",
  "MAGE",
  "PALADIN",
  "PRIEST",
  "ROGUE",
  "SHAMAN",
  "WARLOCK",
  "WARRIOR"
];

export const HeroToDbfIdMap = {
  DRUID: 274,
  HUNTER: 31,
  MAGE: 637,
  PALADIN: 671,
  PRIEST: 813,
  ROGUE: 930,
  SHAMAN: 1066,
  WARLOCK: 893,
  WARRIOR: 7
};

export type HeroType = keyof typeof HeroToDbfIdMap;
