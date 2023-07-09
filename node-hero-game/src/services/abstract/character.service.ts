export default abstract class CharacterService {
  constructor() {}

  abstract updateHealth(damage: number): void;
  abstract getAttack(opponentDefence: number): number;
  abstract resetCharacter(): void;
}
