import * as knightService from "../../src/services/knightService";

describe("Users service", () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ test: 100 }),
      status: Number,
    })
  ) as jest.Mock;
  const mockResponse = {
    name: "test",
    nickname: "testnick",
    birthday: new Date("2000-10-11T00:00:00.000Z"),
    keyAttribute: "strength",
    weapons: [
      {
        name: "sword",
        mod: 3,
        attr: " strength",
        equipped: true,
      },
    ],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  };
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should return all knight", async () => {
    jest.spyOn(window, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: 200,
        })
      ) as jest.Mock
    );

    expect(await knightService.getKnights()).toBe(mockResponse);
  });
  it("should return all heroes", async () => {
    jest.spyOn(window, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: 200,
        })
      ) as jest.Mock
    );
    expect(await knightService.getHeroes()).toBe(mockResponse);
  });
  it("should return a knight", async () => {
    jest.spyOn(window, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: 200,
        })
      ) as jest.Mock
    );
    expect(await knightService.getKnight("")).toBe(mockResponse);
  });
  it("should update a knight", async () => {
    jest
      .spyOn(window, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({}), status: 204 })
        ) as jest.Mock
      );
    expect(await knightService.updateKnight("", { nickname: "" })).toBe(true);
  });
  it("should delete a knight", async () => {
    jest
      .spyOn(window, "fetch")
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({ json: () => Promise.resolve({}), status: 204 })
        ) as jest.Mock
      );
    expect(await knightService.deleteKnight("")).toBe(true);
  });
  it("should create a knight", async () => {
    jest.spyOn(window, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse),
          status: 200,
        })
      ) as jest.Mock
    );
    expect(await knightService.createKnight(mockResponse)).toBe(mockResponse);
  });
});
