import React, { useEffect } from 'react';
import { CharacterAttack, CharacterHookResult, Interval, Villain } from '../types/types';
import { getCharacterStats } from '../utils/utils';

const HEATLH_INTERVAL: Interval = [60, 90];
const STRENGTH_INTERVAL: Interval = [60, 90];
const DEFENCE_INTERVAL: Interval = [40, 60];
const SPEED_INTERVAL: Interval = [40, 60];
const LUCK_INTERVAL: Interval = [25, 40];

interface VillainHookResult extends CharacterHookResult {
  villain: Villain;
}

const useVillain = (): VillainHookResult => {
  const [villain, setVillain] = React.useState({} as Villain);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setVillain(getCharacterStats(
      HEATLH_INTERVAL,
      STRENGTH_INTERVAL,
      DEFENCE_INTERVAL,
      SPEED_INTERVAL,
      LUCK_INTERVAL
    )); 
  };

  const updateHealth = (damage: number): string => {
    setVillain((prevVillain) => {
      const newHealth = prevVillain.health - damage;
      return {
        ...prevVillain,
        health: newHealth > 0 ? newHealth : 0,
      };
    });
    return '';
  };

  const getAttack = (opponentDefence: number): CharacterAttack => {
    return { attack: villain.strength - opponentDefence, events: '' };
  };


  return { villain, updateHealth, getAttack, init };
}

export default useVillain;