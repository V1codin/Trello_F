import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorBlock } from ".";

describe("Error", () => {
  it("renders with props", () => {
    const props = { message: "Test heading", errorClass: "" };
    render(<ErrorBlock {...props} />);

    expect(screen.getByRole("heading", { name: props.message }));
  });
  it("renders without required props", () => {
    const props = { message: "", errorClass: "error Class" };
    const { container } = render(<ErrorBlock {...props} />);

    expect(container.firstChild).toBeNull();
  });
});
