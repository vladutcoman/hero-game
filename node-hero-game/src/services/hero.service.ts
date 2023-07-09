import HeroEntity from "../entities/hero.entity.js";
import { isProbability } from "../utils/utils.js";
import CharacterService from "./abstract/character.service.js";

const CRITICAL_STRIKE_EVENT = "Hero Critical Strike activated.";
const TRIPLE_DAMAGE_EVENT = "Hero Triple Damage activated.";
const RESILIENCE_EVENT = "Hero Resiliance activated.";

const CRITICAL_STRIKE_CHANCE = 10;
const TRIPLE_DAMAGE_CHANCE = 1;
const RESILIENCE_CHANCE = 20;

export default class HeroService extends CharacterService {
  hero;

  constructor() {
    super();
    this.hero = new HeroEntity();
  }

  private resilience(): boolean {
    return isProbability(RESILIENCE_CHANCE);
  }
  private criticalStrike(): boolean {
    return isProbability(CRITICAL_STRIKE_CHANCE);
  }

  resetCharacter(): void {
    this.hero.init();
  }

  updateHealth(damage: number) {
    if (this.resilience()) {
      damage = damage / 2;
      console.info(RESILIENCE_EVENT);
    }

    const diff = this.hero.health - damage;
    this.hero.health = diff > 0 ? diff : 0;
  }

  getAttack(opponentDefence: number): number {
    let attack = this.hero.strength - opponentDefence;

    /**
     * Critical Strike check. If true, attack is doubled or tripled
     */
    if (this.criticalStrike()) {
      console.info(CRITICAL_STRIKE_EVENT);
      /**
       * Triple Damage check - check probabilty and if last time was not triple attack.
       * If true, attack is tripled, otherwise doubled
       */
      if (!this.hero.lastTripleAttack && isProbability(TRIPLE_DAMAGE_CHANCE)) {
        console.info(`${TRIPLE_DAMAGE_EVENT}`);
        this.hero.lastTripleAttack = true;
        attack = attack * 3;
      } else {
        this.hero.lastTripleAttack = false;
        attack = attack * 2;
      }
    } else {
      this.hero.lastTripleAttack = false;
    }

    return attack;
  }
}
