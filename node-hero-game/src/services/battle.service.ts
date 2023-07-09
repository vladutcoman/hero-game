import { setTimeout } from "timers/promises";
import { BattleStatus, CurrentPlayer } from "../types/types.js";
import { isProbability } from "../utils/utils.js";
import HeroService from "./hero.service.js";
import VillainService from "./villain.service.js";

const MAX_ROUNDS = 20;

export default class BattleService {
  private round: number;
  private currentPlayer: CurrentPlayer;
  private battleStatus: BattleStatus;

  constructor(
    private heroService: HeroService,
    private villainService: VillainService
  ) {
    this.round = 0;
    this.currentPlayer = CurrentPlayer.NONE;
    this.battleStatus = BattleStatus.NO_STARTED;
  }

  private setFirstPlayer() {
    if (this.heroService.hero.speed > this.villainService.villain.speed) {
      this.currentPlayer = CurrentPlayer.HERO;
    } else if (
      this.heroService.hero.speed < this.villainService.villain.speed
    ) {
      this.currentPlayer = CurrentPlayer.VILLAIN;
    } else {
      /**
       * Here I have assumed that if the luck is equal, the hero will be the first player.
       */
      if (this.heroService.hero.luck >= this.villainService.villain.luck) {
        this.currentPlayer = CurrentPlayer.HERO;
      } else {
        this.currentPlayer = CurrentPlayer.VILLAIN;
      }
    }
  }

  private preCheck(): void {
    if (this.battleStatus === BattleStatus.ENDED) {
      this.heroService.resetCharacter();
      this.villainService.resetCharacter();
    }

    this.battleStatus = BattleStatus.IN_PROGRESS;

    this.setFirstPlayer();
  }

  private heroAttack(): void {
    const attack = this.heroService.getAttack(
      this.villainService.villain.defence
    );
    this.villainService.updateHealth(attack);
    console.info(
      `Hero attack with ${attack} damage. Villain current health: ${this.villainService.villain.health}`
    );
  }

  private villainAttack(): void {
    const attack = this.villainService.getAttack(this.heroService.hero.defence);
    this.heroService.updateHealth(attack);
    console.info(
      `Villain attack with ${attack} damage. Hero current health: ${this.heroService.hero.health}`
    );
  }

  private heroTurn(): void {
    if (isProbability(this.villainService.villain.luck)) {
      console.info(
        `Villain got lucky! Villain current health: ${this.villainService.villain.health}`
      );
    } else {
      this.heroAttack();
    }
    this.currentPlayer = CurrentPlayer.VILLAIN;
  }

  private villainTurn(): void {
    if (isProbability(this.heroService.hero.luck)) {
      console.info(
        `Hero got lucky! Hero current health: ${this.heroService.hero.health}`
      );
    } else {
      this.villainAttack();
    }
    this.currentPlayer = CurrentPlayer.HERO;
  }

  private isWinner(): boolean {
    let winner = false;
    if (this.heroService.hero.health <= 0) {
      console.info("Villain won!");
      winner = true;
    } else if (this.villainService.villain.health <= 0) {
      console.info("Hero won!");
      winner = true;
    }
    return winner;
  }

  public showInfo(): void {
    console.info(`Welcome to the battle!`);
    console.info(`\nHero stats:`);
    console.dir(this.heroService.hero);
    console.info(`\nVillain stats:`);
    console.dir(this.villainService.villain);
  }

  public async startBattle() {
    this.preCheck();

    while (
      this.round < MAX_ROUNDS &&
      this.battleStatus === BattleStatus.IN_PROGRESS
    ) {
      console.info(`==================== Round ${this.round + 1} started! ====================`);
      this.round++;

      if (this.currentPlayer === CurrentPlayer.HERO) {
        this.heroTurn();
      } else {
        this.villainTurn();
      }

      if (this.isWinner()) {
        this.battleStatus = BattleStatus.ENDED;
      }
      await setTimeout(1500);
    }

    if (this.round === MAX_ROUNDS) {
      console.info("Max rounds reached!");
      this.battleStatus = BattleStatus.ENDED;
    }
  }
}
