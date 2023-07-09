import React, { useEffect, useReducer } from "react";
import BattleSummary from "../../components/BattleSummary/BattleSummary";
import CharacterCard from "../../components/CharacterCard/CharatcterCard";
import HeroIcon from "../../assets/hero.png";
import VillainIcon from "../../assets/villain.png";
import useHero from "../../hooks/useHero";
import useVillain from "../../hooks/useVillain";
import {
  BattleActionTypes,
  BattleStatus,
  CurrentPlayer,
  initialState,
  reducer,
} from "./reducer";
import { isProbability } from "../../utils/utils";
import BattleHeader from "../../components/BattleHeader/BattleHeader";

const MAX_TURNS = 20;

const Battle = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { battleStatus, currentTurn, roundsSummary, round } = state;

  const heroData = useHero();
  const villainData = useVillain();

  useEffect(() => {
    if (round > MAX_TURNS) {
      alert("Max turns reached! No Winner");
      dispatch({ type: BattleActionTypes.END, payload: state });
    } else if (round > 0 && battleStatus !== BattleStatus.ENDED) {
      setTimeout(() => {
        battle();
      }, 1500);
    }
  }, [round]);

  const battle = () => {
    if (isWinner()) {
      dispatch({ type: BattleActionTypes.END, payload: state });
      return;
    }
    if (currentTurn === CurrentPlayer.HERO) {
      heroTurn();
    } else {
      villainTurn();
    }
  }

  const heroTurn = () => {
    if (isProbability(villainData.villain.luck)) {
      goNextRound(
        CurrentPlayer.VILLAIN,
        `Villain got lucky! Villain current health: ${villainData.villain.health}`
      );
    } else {
      heroAttack();
    }
  }

  const villainTurn = () => {
    if (isProbability(heroData.hero.luck)) {
      goNextRound(
        CurrentPlayer.HERO,
        `Hero got lucky! Hero current health: ${heroData.hero.health}`
      )
    } else {
      villainAttack();
    }
  }

  const villainAttack = () => {
    const { attack } = villainData.getAttack(heroData.hero.defence);
    const event = heroData.updateHealth(attack);
    goNextRound(
      CurrentPlayer.HERO,
      `Villain attack with ${attack} damage.  ${event} Hero current health: ${
        heroData.hero.health - attack
      }`
    )
  }

  const heroAttack = () => {
    const { attack, events } = heroData.getAttack(villainData.villain.defence);
    villainData.updateHealth(attack);
    goNextRound(
      CurrentPlayer.VILLAIN,
      `Hero attack with ${attack} damage.  ${events} Villain current health: ${
        villainData.villain.health - attack
      }`
    );
  }

  const goNextRound = (nextTurn: CurrentPlayer, message: string) => {
    dispatch({
      type: BattleActionTypes.NEXT_ROUND,
      payload: {
        ...state,
        round: round + 1,
        currentTurn: nextTurn,
        roundsSummary: [...roundsSummary, message],
      },
    });
  }

  const isWinner = (): boolean => {
    let winner = false;
    if (heroData.hero.health <= 0) {
      alert("Villain won!");
      winner = true;
    } else if (villainData.villain.health <= 0) {
      alert("Hero won!");
      winner = true;
    }
    return winner;
  }

  const getFirstPlayer = (): CurrentPlayer => {
    if (heroData.hero.speed > villainData.villain.speed) {
      return CurrentPlayer.HERO;
    } else if (heroData.hero.speed < villainData.villain.speed) {
      return CurrentPlayer.VILLAIN;
    } else {
      /**
       * Here I have assumed that if the luck is equal, the hero will be the first player.
       */
      if (heroData.hero.luck >= villainData.villain.luck) {
        return CurrentPlayer.HERO;
      } else {
        return CurrentPlayer.VILLAIN;
      }
    }
  };

  const onStartBattle = () => {
    if (battleStatus === BattleStatus.ENDED) {
      heroData.init();
      villainData.init();
    }
    dispatch({
      type: BattleActionTypes.START_BATTLE,
      payload: { ...state, currentTurn: getFirstPlayer() },
    });
  };

  return (
    <>
     <BattleHeader battleStatus={battleStatus} onStartBattle={onStartBattle} />
      <section className="grid md:grid-cols-3 grid-cols-1 justify-items-stretch gap-6 h-4/6">
        <CharacterCard
          character={heroData.hero}
          image={HeroIcon}
          highlited={currentTurn === CurrentPlayer.HERO}
        />
        <BattleSummary summaryArr={roundsSummary} />
        <CharacterCard
          character={villainData.villain}
          image={VillainIcon}
          highlited={currentTurn === CurrentPlayer.VILLAIN}
        />
      </section>
    </>
  );
};

export default Battle;
