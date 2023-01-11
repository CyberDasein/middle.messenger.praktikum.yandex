import { BaseLink } from "./index";
import { expect } from "chai";
import sinon from "sinon";

describe("Link", () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: sinon.fake(),
    };
  });

  it("should render", () => {
    new BaseLink({
      href: "/test",
      router: routerMock as any,
      label: "click",
    });
  });

  it("should call router go method", () => {
    const href = "/test";
    const instance = new BaseLink({
      label: "Click me",
      href,
      router: routerMock as any,
    });

    const element = instance.element;
    element?.click();

    expect(routerMock.go.firstArg).to.eq(href);
  });
});
