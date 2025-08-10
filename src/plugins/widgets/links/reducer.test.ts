import { addLink, removeLink, updateLink, reorderLink } from "./actions";
import { reducer } from "./reducer";

describe("links/reducer()", () => {
  it("should add new links", () => {
    expect(reducer([], addLink())).toEqual([{ url: "https://" }]);
    expect(
      reducer([{ url: "https://newtab.fripe.dev/" }], { type: "ADD_LINK" }),
    ).toEqual([{ url: "https://newtab.fripe.dev/" }, { url: "https://" }]);
  });

  it("should remove links", () => {
    expect(
      reducer(
        [
          { url: "https://newtab.fripe.dev/" },
          { url: "https://newtab.fripe.dev/about.html" },
        ],
        removeLink(0),
      ),
    ).toEqual([{ url: "https://newtab.fripe.dev/about.html" }]);
  });

  it("should update links", () => {
    expect(
      reducer(
        [
          { url: "https://newtab.fripe.dev/" },
          { url: "https://newtab.fripe.dev/about.html" },
        ],
        updateLink(0, { name: "tab-nine", url: "https://newtab.fripe.dev/" }),
      ),
    ).toEqual([
      { name: "tab-nine", url: "https://newtab.fripe.dev/" },
      { url: "https://newtab.fripe.dev/about.html" },
    ]);
  });

  it("should reorder links", () => {
    expect(
      reducer(
        [
          { url: "https://newtab.fripe.dev/" },
          { url: "https://newtab.fripe.dev/about.html" },
          { url: "https://newtab.fripe.dev/support.html" },
        ],
        reorderLink(1, 0),
      ),
    ).toEqual([
      { url: "https://newtab.fripe.dev/about.html" },
      { url: "https://newtab.fripe.dev/" },
      { url: "https://newtab.fripe.dev/support.html" },
    ]);

    expect(
      reducer(
        [
          { url: "https://newtab.fripe.dev/" },
          { url: "https://newtab.fripe.dev/about.html" },
          { url: "https://newtab.fripe.dev/support.html" },
        ],
        reorderLink(1, 2),
      ),
    ).toEqual([
      { url: "https://newtab.fripe.dev/" },
      { url: "https://newtab.fripe.dev/support.html" },
      { url: "https://newtab.fripe.dev/about.html" },
    ]);
  });

  it("should throw on unknown action", () => {
    expect(() => reducer([], { type: "UNKNOWN" } as any)).toThrow();
  });
});
