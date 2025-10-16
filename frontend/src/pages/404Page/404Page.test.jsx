import { render, screen, fireEvent } from "@testing-library/react";
import NotFoundPage from "./404Page.jsx";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

const MockBuild404Page = () => {
  return (
    <MemoryRouter initialEntries={["/page-a", "/page-b"]}>
      <Routes>
        <Route path="/page-a" element={<div>Page A Content</div>} />
        <Route path="/page-b" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("404 Page", () => {
  it("renders the 404 Page", () => {
    render(<MockBuild404Page />);
    const message = screen.getByText("Oops! That page can't be found!");
    expect(message).toBeInTheDocument();

    const homeButton = screen.getByText(/Home/i);
    fireEvent.click(homeButton);
    expect(window.location.pathname).toBe("/");

    const previousButton = screen.getByText(/Return to Previous Page/i);
    fireEvent.click(previousButton);

    expect(screen.getByText("Page A Content"));
  });
});
