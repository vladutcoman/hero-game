export interface CharacterHookResult {
  updateHealth: (damage: number) => string;
  getAttack: (opponentDefence: number) => CharacterAttack;
  init: () => void;
}

export interface Character {
  health: number;
  fullHealth: number;
  strength: number;
  defence: number;
  speed: number;
  luck: number;
}

export interface Villain extends Character {};

export interface Hero extends Character {
  cristicalStrike: () => boolean;
  resilience: () => boolean;
}

export type Interval = [number, number];

export type CharacterAttack = {
  attack: number;
  events: string;
};
