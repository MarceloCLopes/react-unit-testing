import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { List } from "./List";

describe("App Component", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText, unmount } = render(
      <List initialItems={["Marcelo", "David", "Rafael"]} />
    );

    expect(getByText("Marcelo")).toBeInTheDocument();
    expect(getByText("David")).toBeInTheDocument();
    expect(getByText("Rafael")).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={["Rony"]} />);

    expect(getByText("Rony")).toBeInTheDocument();

    expect(queryByText("Rafael")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    userEvent.type(inputElement, "Novo");
    userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument();
    });
  });

  it("should be able to add remove item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Marcelo"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Marcelo")).not.toBeInTheDocument();
    });
  });
});
