import React, { useEffect, useRef } from "react";
import { CharacterAttack, CharacterHookResult, Hero, Interval } from "../types/types";
import { getCharacterStats, isProbability } from "../utils/utils";

const HEATLH_INTERVAL: Interval = [70, 100];
const STRENGTH_INTERVAL: Interval = [70, 80];
const DEFENCE_INTERVAL: Interval = [45, 55];
const SPEED_INTERVAL: Interval = [40, 50];
const LUCK_INTERVAL: Interval = [10, 30];

const CRITICAL_STRIKE_EVENT = 'Hero Critical Strike activated.';
const TRIPLE_DAMAGE_EVENT = 'Hero Triple Damage activated.';
const RESILIENCE_EVENT = 'Hero Resiliance activated.';

const CRITICAL_STRIKE_CHANCE = 10;
const TRIPLE_DAMAGE_CHANCE = 1;
const RESILIENCE_CHANCE = 20;

interface HeroHookResult extends CharacterHookResult {
  hero: Hero;
}

const useHero = (): HeroHookResult => {
  const [hero, setHero] = React.useState({} as Hero);
  const lastTripleAttack = useRef(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setHero({
      ...getCharacterStats(
        HEATLH_INTERVAL,
        STRENGTH_INTERVAL,
        DEFENCE_INTERVAL,
        SPEED_INTERVAL,
        LUCK_INTERVAL
      ),
      criticalStrike: () => isProbability(CRITICAL_STRIKE_CHANCE),
      resilience: () => isProbability(RESILIENCE_CHANCE),
    });
  };

  const updateHealth = (damage: number): string => {
    let events = '';

    /**
     * Resilience check. If true, damage is halved
     */
    if (hero.resilience()) {
      damage = damage / 2;
      events = RESILIENCE_EVENT;
    }

    setHero((prevHero) => {
      const newHealth = prevHero.health - damage;
      return {
        ...prevHero,
        health: newHealth > 0 ? newHealth : 0,
      };
    });

    return events;
  };

  const getAttack = (opponentDefence: number): CharacterAttack => {
    let events = '';
    let attack = hero.strength - opponentDefence;

    /**
     * Critical Strike check. If true, attack is doubled or tripled
     */
    if (hero.criticalStrike()) {
      events = CRITICAL_STRIKE_EVENT;
      /**
       * Triple Damage check - check probabilty and if last time was not triple attack.
       * If true, attack is tripled, otherwise doubled
       */
      if (!lastTripleAttack.current && isProbability(TRIPLE_DAMAGE_CHANCE)) {
        events = `${events} ${TRIPLE_DAMAGE_EVENT}`
        lastTripleAttack.current = true;
        attack = attack * 3;
      } else {
        lastTripleAttack.current = false;
        attack = attack * 2;
      }
    } else {
      lastTripleAttack.current = false;
    }

    return { attack, events };
  };

  return { hero, updateHealth, getAttack, init };
};

export default useHero;
