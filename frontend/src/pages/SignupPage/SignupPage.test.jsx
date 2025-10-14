import { render, screen } from "@testing-library/react";
import SignupPage from "./SignupPage.jsx";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const MockSignupPage = () => {
  return (
    <MemoryRouter>
      <SignupPage />
    </MemoryRouter>
  );
};

describe("Signup Page", () => {
  it("renders the Signup Page", async () => {
    render(<MockSignupPage />);
    const nameInput = screen.getByRole("textbox", { name: "First Name:" });
    await userEvent.type(nameInput, "Shania");
    expect(nameInput).toHaveValue("Shania");
  });
});
