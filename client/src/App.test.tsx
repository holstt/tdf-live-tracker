import { act, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders header", async () => {
    await act(async () => {
        render(<App />);
    });
    const headerElement = screen.getByText(/TDF Live Tracker/i);
    expect(headerElement).toBeInTheDocument();
});
