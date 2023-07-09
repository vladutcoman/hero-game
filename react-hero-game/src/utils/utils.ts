import { Character, Interval } from "../types/types";

export function getRandomIntInclusive(min: number, max:  number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCharacterStats(health: Interval, strength: Interval, defence: Interval, speed: Interval, luck: Interval): Character {
  const healthResult = getRandomIntInclusive(health[0], health[1])
  return {
    health: healthResult,
    fullHealth: healthResult,
    strength: getRandomIntInclusive(strength[0], strength[1]),
    defence: getRandomIntInclusive(defence[0], defence[1]),
    speed: getRandomIntInclusive(speed[0], speed[1]),
    luck: getRandomIntInclusive(luck[0], luck[1]),
  };
}

export function isProbability(percent: number): boolean {
  const random = Math.floor(Math.random() * 100) + 1;
  return random <= percent;
}

export function getHealthPercent(health: number, maxHealth: number): number {
  return Math.round((health / maxHealth) * 100);
}
