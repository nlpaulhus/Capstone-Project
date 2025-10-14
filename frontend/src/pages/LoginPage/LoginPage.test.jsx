import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage.jsx";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const MockLoginPage = () => {
  return (
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
};

describe("Login Page", () => {
  it("renders the Login Page", async () => {
    render(<MockLoginPage />);
    const emailInput = screen.getByRole("textbox", { name: "Email address" });
    await userEvent.type(emailInput, "testtest@test.com");
    expect(emailInput).toHaveValue("testtest@test.com");
  });
});
