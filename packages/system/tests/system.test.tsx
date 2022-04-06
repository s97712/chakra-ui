import { render, screen } from "@chakra-ui/test-utils"
import * as React from "react"

import { chakra } from "../src"

const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})

test("should allow custom should forward props", () => {
  const Div = chakra<"div", { sample: string; isBig: string }>("div", {
    shouldForwardProp: (prop) => !["sample"].includes(prop),
  })

  render(<Div sample="testing" isBig="ddf" data-testid="div" />)

  expect(screen.getByTestId("div")).not.toHaveAttribute("sample")
  expect(screen.getByTestId("div")).toHaveAttribute("isBig")
  /**
   * React-DOM should show an error about `isBig` getting to the DOM
   */
  expect(consoleSpy).toHaveBeenCalled()
})
