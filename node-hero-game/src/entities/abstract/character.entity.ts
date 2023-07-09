export default abstract class CharacterEntity {
  protected abstract _health: number;
  protected abstract _fullHealth: number;
  protected abstract _strength: number;
  protected abstract _defence: number;
  protected abstract _speed: number;
  protected abstract _luck: number;

  constructor() {
  }

  abstract init(): void;

  public set health(health: number) {
    this._health = health;
  }

  public get health(): number {
    return this._health;
  }

  public get fullHealth(): number {
    return this._fullHealth;
  }

  public get strength(): number {
    return this._strength;
  }

  public get defence(): number {
    return this._defence;
  }

  public get speed(): number {
    return this._speed;
  }

  public get luck(): number {
    return this._luck;
  }

  // abstract updateHealth(damage: number): void;
  // abstract getAttack(opponentDefence: number): number;
}
