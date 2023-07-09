import { Interval } from "../types/types.js";
import { getCharacterStats, isProbability } from "../utils/utils.js";
import CharacterEntity from "./abstract/character.entity.js";

const HEATLH_INTERVAL: Interval = [70, 100];
const STRENGTH_INTERVAL: Interval = [70, 80];
const DEFENCE_INTERVAL: Interval = [45, 55];
const SPEED_INTERVAL: Interval = [40, 50];
const LUCK_INTERVAL: Interval = [10, 30];

export default class HeroEntity extends CharacterEntity {
  protected _health = 0;
  protected _fullHealth = 0;
  protected _strength = 0;
  protected _defence = 0;
  protected _speed = 0;
  protected _luck = 0;

  private _lastTripleAttack = false;

  constructor() {
    super();
    this.init();
  }

  init() {
    const data = getCharacterStats(
      HEATLH_INTERVAL,
      STRENGTH_INTERVAL,
      DEFENCE_INTERVAL,
      SPEED_INTERVAL,
      LUCK_INTERVAL
    );
    this._health = data.health;
    this._fullHealth = data.fullHealth;
    this._strength = data.strength;
    this._defence = data.defence;
    this._speed = data.speed;
    this._luck = data.luck;
  }

  public get lastTripleAttack(): boolean {
    return this._lastTripleAttack;
  }

  public set lastTripleAttack(value: boolean) {
    this._lastTripleAttack = value;
  }

  // private resilience(): boolean {
  //   return isProbability(RESILIENCE_CHANCE);
  // }
  // private criticalStrike(): boolean {
  //   return isProbability(CRITICAL_STRIKE_CHANCE);
  // }

  // updateHealth(damage: number) {
  //   if (this.resilience()) {
  //     damage = damage / 2;
  //     console.info(RESILIENCE_EVENT);
  //   }

  //   const diff = this.health - damage;
  //   this.health = diff > 0 ? diff : 0;
  // }

  // getAttack(opponentDefence: number): number {
  //   let attack = this.strength - opponentDefence;

  //   /**
  //    * Critical Strike check. If true, attack is doubled or tripled
  //    */
  //   if (this.criticalStrike()) {
  //     console.info(CRITICAL_STRIKE_EVENT);
  //     /**
  //      * Triple Damage check - check probabilty and if last time was not triple attack.
  //      * If true, attack is tripled, otherwise doubled
  //      */
  //     if (!this.lastTripleAttack && isProbability(TRIPLE_DAMAGE_CHANCE)) {
  //       console.info(`${TRIPLE_DAMAGE_EVENT}`);
  //       this.lastTripleAttack = true;
  //       attack = attack * 3;
  //     } else {
  //       this.lastTripleAttack = false;
  //       attack = attack * 2;
  //     }
  //   } else {
  //     this.lastTripleAttack = false;
  //   }

  //   return attack;
  // }
}
