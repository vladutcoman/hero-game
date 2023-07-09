import VillainEntity from "../entities/villain.entity.js";
import CharacterService from "./abstract/character.service.js";

export default class VillainService extends CharacterService {
  villain;

  constructor() {
    super();
    this.villain = new VillainEntity();
  }

  resetCharacter(): void {
    this.villain.init();
  }

  updateHealth(damage: number) {
    const diff = this.villain.health - damage;
    this.villain.health = diff > 0 ? diff : 0;
  }

  getAttack(opponentDefence: number) {
    return this.villain.strength - opponentDefence;
  }
}
