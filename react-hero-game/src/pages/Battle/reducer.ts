export enum CurrentPlayer {
  HERO = 'hero',
  VILLAIN = 'villain',
  NONE = 'none',
}

export enum BattleStatus {
  IN_PROGRESS = 'in_progress',
  NO_STARTED = 'not_started',
  ENDED = 'ended',
}

export type BattleState = {
  roundsSummary: string[],
  currentTurn: CurrentPlayer,
  battleStatus: BattleStatus,
  round: number,
}

export enum BattleActionTypes {
  UPDATE_STATUS = 'update_status',
  START_BATTLE = 'start_battle',
  NEXT_ROUND = 'next_round',
  END = 'end',
}

type BattleActionType = { type: BattleActionTypes; payload: BattleState }

export const initialState: BattleState = {
  roundsSummary: [] as string[],
  currentTurn: CurrentPlayer.NONE,
  battleStatus: BattleStatus.NO_STARTED,
  round: 0,
};

export function reducer(state: BattleState, action: BattleActionType): BattleState {
  switch (action.type) {
    case BattleActionTypes.UPDATE_STATUS: {
      return {
        ...state,
        battleStatus: action.payload.battleStatus,
      }
    }
    case BattleActionTypes.START_BATTLE: {
      return {
        ...initialState,
        round: state.round + 1,
        battleStatus: BattleStatus.IN_PROGRESS,
        currentTurn: action.payload.currentTurn,
      }
    }
    case BattleActionTypes.NEXT_ROUND: {
      return {
        ...state,
        round: action.payload.round,
        battleStatus: action.payload.battleStatus,
        roundsSummary: action.payload.roundsSummary,
        currentTurn: action.payload.currentTurn,
      }
    }
    case BattleActionTypes.END: {
      return {
        ...state,
        currentTurn: CurrentPlayer.NONE,
        battleStatus: BattleStatus.ENDED,
        round: 0,
      }
    }
    default:
      return state
  }
}

