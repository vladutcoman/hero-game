import React from "react";
import { Character } from "../../types/types";
import { getHealthPercent } from "../../utils/utils";

type CharacterCardProps = {
  character: Character,
  image: string,
  highlited: boolean,
}

const CharacterCard = ({ character, highlited, image }: CharacterCardProps) => {
  const health = getHealthPercent(character.health, character.fullHealth);
  const borderColor = highlited ? 'border-yellow-600' : 'border-gray-300';

  return (
    <div className={`${borderColor} w-full max-w-lg bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10 flex flex-col items-center pb-10`}>
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg"
        src={image}
        alt="Bonnie image"
      />
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Health: {character.fullHealth}
      </div>
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Current Health: {character.health}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: `${health}%` }}
        >
        </div>
      </div>
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Strength: {character.strength}
      </div>
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Defence: {character.defence}
      </div>
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Speed: {character.speed}
      </div>
      <div className="italic font-bold mb-1 text-base w-full flex text-gray-500">
        Luck: {`${character.luck}%`}
      </div>
    </div>
  );
};

export default CharacterCard;
