import React from "react";
import { cleanup, getByText, render } from "@testing-library/react";
import BattleSummary from "../../src/components/BattleSummary/BattleSummary";
import { getAllByTagName } from "../../src/utils/testUtils";

describe("BattleSummary", () => {
  beforeEach(cleanup);

  const renderComponent = (items = [] as string[]) => {
    const wrapper = render(<BattleSummary summaryArr={items} />);
    
    const summaries = getAllByTagName(wrapper.container, 'span');
    const title = getByText(wrapper.container, 'Battle summary');

    return { wrapper, summaries, title };
  }

  it("should render empty BattleSummary", () => {
    const { summaries, title } = renderComponent();

    expect(title).toBeInTheDocument();
    expect(summaries.length).toBe(0);
  });
  
  it("hould render BattleSummary with items", () => {
    const { summaries, title, wrapper } = renderComponent(['123', '456']);
      
      const el = wrapper.getByText('123');

      expect(el).toBeInTheDocument();
      expect(summaries.length).toBe(2);
      expect(title).toBeInTheDocument();
  });
});