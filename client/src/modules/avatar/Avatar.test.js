import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

describe("Avatar", () => {
  it("renders without crashing", () => {
    const { asFragment } = render(<Avatar />);

    expect(asFragment(<Avatar imgLink="test img link" />)).toMatchSnapshot();
  });
});
