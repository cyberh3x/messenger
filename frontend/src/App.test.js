import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders UFO Messenger link", () => {
  render(<App />);
  const linkElement = screen.getByText(/UFO Messenger/i);
  expect(linkElement).toBeInTheDocument();
});
