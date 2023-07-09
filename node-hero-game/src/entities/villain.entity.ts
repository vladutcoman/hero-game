import { Interval } from "../types/types.js";
import { getCharacterStats } from "../utils/utils.js";
import CharacterEntity from "./abstract/character.entity.js";

const HEATLH_INTERVAL: Interval = [60, 90];
const STRENGTH_INTERVAL: Interval = [60, 90];
const DEFENCE_INTERVAL: Interval = [40, 60];
const SPEED_INTERVAL: Interval = [40, 60];
const LUCK_INTERVAL: Interval = [25, 40];

export default class VillainEntity extends CharacterEntity {
  protected _health = 0;
  protected _fullHealth = 0;
  protected _strength = 0;
  protected _defence = 0;
  protected _speed = 0;
  protected _luck = 0;

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
    )
    this._health = data.health;
    this._fullHealth = data.fullHealth;
    this._strength = data.strength;
    this._defence = data.defence;
    this._speed = data.speed;
    this._luck = data.luck;
  }
}