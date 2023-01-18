import Router from "./Router";
import { expect } from "chai";
import sinon from "sinon";

describe("Router", () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  beforeEach(() => {
    Router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  const getContentFake = sinon.fake.returns(document.createElement("div"));

  const BlockMock = class {
    getContent = getContentFake;
  } as any;

  it("should call forward", () => {
    Router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it("should call back", () => {
    Router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });

  it("use() should return Router instance", () => {
    const result = Router.use("/", BlockMock);

    expect(result).to.eq(Router);
  });
});
