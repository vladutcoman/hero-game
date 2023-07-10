import BattleService from "./services/battle.service.js";
import HeroService from "./services/hero.service.js";
import VillainService from "./services/villain.service.js";
import inquirer from "inquirer";
import { PromptConfirmation } from "./types/types.js";

const heroService = new HeroService();
const villainService = new VillainService();
const battleService = new BattleService(heroService, villainService);

const questions = [
  {
    type: "confirm",
    name: "startBattle",
    message: "Start battle?",
    default: false,
  },
];

function getAnswers(): Promise<PromptConfirmation> {
  return inquirer
    .prompt(questions)
    .then(async (answers: PromptConfirmation) => {
      if (answers.startBattle) {
        await battleService.startBattle();
        return getAnswers();
      } else {
        return answers;
      }
    });
}

getAnswers()
  .then()
  .catch((error) => {});
