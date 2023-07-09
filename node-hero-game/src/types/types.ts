export type Interval = [number, number];

export interface CharacterType {
  health: number;
  fullHealth: number;
  strength: number;
  defence: number;
  speed: number;
  luck: number;
}

export enum BattleStatus {
  IN_PROGRESS = "in_progress",
  NO_STARTED = "not_started",
  ENDED = "ended",
}

export enum CurrentPlayer {
  HERO = "hero",
  VILLAIN = "villain",
  NONE = "none",
}

export type PromptConfirmation = {
  startBattle: boolean;
};
