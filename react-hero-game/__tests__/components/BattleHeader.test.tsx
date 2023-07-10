import React from "react";
import { cleanup, fireEvent, getByRole, getByText, render } from "@testing-library/react";
import BattleHeader from "../../src/components/BattleHeader/BattleHeader";
import { BattleStatus } from "../../src/pages/Battle/reducer";

const mockOnStartBattle = jest.fn();

describe("Battle Header", () => {
  beforeEach(cleanup);

  const renderComponent = (status: BattleStatus = BattleStatus.NO_STARTED) => {
    const wrapper = render(<BattleHeader onStartBattle={mockOnStartBattle} battleStatus={status} />);
    
    const button = getByRole(wrapper.container, 'button');
    const title = getByText(wrapper.container, 'Battle');

    return { wrapper, button, title };
  }

  it("should render BattleHeader correctly with status NOT_STARTED", () => {
    const { button, title } = renderComponent();

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("should render BattleHeader correctly with status IN_PROGRESS", () => {
    const { button, title } = renderComponent(BattleStatus.IN_PROGRESS);
    
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should call mockOnStartBattle on clicking the button", () => {
    const { button } = renderComponent();

    fireEvent.click(button)
    
    expect(mockOnStartBattle).toHaveBeenCalledTimes(1);
  });
  
});