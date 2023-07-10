import React from "react";
import { BattleStatus } from "../../pages/Battle/reducer";

type BattleHeaderProps = {
  battleStatus: BattleStatus;
  onStartBattle: () => void;
};

const BattleHeader = ({ battleStatus, onStartBattle }: BattleHeaderProps) => {
  return (
    <header className="text-center text-xl font-bold mb-14">
      <h1 className="mb-4">Battle</h1>
      <button
        onClick={onStartBattle}
        disabled={
          ![BattleStatus.NO_STARTED, BattleStatus.ENDED].includes(battleStatus)
        }
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-40"
      >
        Fight!
      </button>
    </header>
  );
};

export default BattleHeader;
