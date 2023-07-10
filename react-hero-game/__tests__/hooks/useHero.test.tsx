import React from "react";
import { render, act, cleanup } from "@testing-library/react";
import useHero, { HeroHookResult } from "../../src/hooks/useHero";
import * as UtilsModule from "../../src/utils/utils";

const mockIsProbabilitySpy = jest.spyOn(UtilsModule, "isProbability");

describe("useHero", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  const useHookResult = () => {
    let hookResult: HeroHookResult | null = null;
    act(() => {
      const TestComponent = () => {
        hookResult = useHero();
        return null;
      };
      render(<TestComponent />);
    });
    return { hookResult };
  };

  it("should initialize hero correctly", () => {
    const { hookResult } = useHookResult();

    expect(hookResult).toBeDefined();

    if (hookResult) {
      const { hero } = hookResult as HeroHookResult;
      expect(hero).toEqual({
        health: expect.any(Number),
        strength: expect.any(Number),
        fullHealth: expect.any(Number),
        defence: expect.any(Number),
        speed: expect.any(Number),
        luck: expect.any(Number),
        criticalStrike: expect.any(Function),
        resilience: expect.any(Function),
      });
    }
  });

  it("should return proper value for getAttack without criticalStrike", () => {
    const { hookResult } = useHookResult();

    expect(hookResult).toBeDefined();

    if (hookResult) {
      mockIsProbabilitySpy.mockReturnValue(false);
      const { hero, getAttack } = hookResult as HeroHookResult;
      const opponentDefence = 10;
      act(() => {
        const { attack } = getAttack(opponentDefence);
        expect(attack).toEqual(hero.strength - opponentDefence);
      });
    }
  });

  it("should return proper value for getAttack with criticalStrike and triple attack", () => {
    const { hookResult } = useHookResult();

    expect(hookResult).toBeDefined();

    if (hookResult) {
      mockIsProbabilitySpy.mockReturnValue(true);
      const { hero, getAttack } = hookResult as HeroHookResult;
      const opponentDefence = 10;

      const baseAttack = hero.strength - opponentDefence;
      act(() => {
        const { attack } = getAttack(opponentDefence);
        expect(attack).toEqual(baseAttack * 3);
      });
    }
  });

  it("should return proper value for getAttack with criticalStrike", () => {
    const { hookResult } = useHookResult();

    expect(hookResult).toBeDefined();

    if (hookResult) {
      mockIsProbabilitySpy.mockReturnValueOnce(true).mockReturnValueOnce(false);
      const { hero, getAttack } = hookResult as HeroHookResult;
      const opponentDefence = 10;

      const baseAttack = hero.strength - opponentDefence;
      act(() => {
        const { attack } = getAttack(opponentDefence);
        expect(attack).toEqual(baseAttack * 2);
      });
    }
  });
});
