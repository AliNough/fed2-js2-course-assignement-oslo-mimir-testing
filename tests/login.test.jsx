import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { loginUser, logoutUser } from "../src/lib/api";

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () =>
        Promise.resolve({
          accessToken: "fake_token",
          email: "test@stud.noroff.com",
        }),
    })
  )
);

describe("Login", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  let originalFetch;

  it("stores token on successful login", async () => {
    const data = await loginUser({
      email: "test@stud.noroff.com",
      password: "password",
    });

    expect(data.accessToken).toBe("fake_token");
    expect(localStorage.getItem("jwt")).toBe("fake_token");
    expect(localStorage.getItem("user_email")).toBe("test@stud.noroff.com");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () =>
          Promise.resolve({
            accessToken: "fake_token",
            email: "test@stud.noroff.com",
          }),
      })
    );
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    // clear call history
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    // After each test, we restore the original fetch function
    global.fetch = originalFetch;
  });

  it("clears the token from localStorage", () => {
    localStorage.setItem("jwt", "fake_token");
    localStorage.setItem("user_email", "test@stud.noroff.com");

    logoutUser();

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(localStorage.getItem("user_email")).toBeNull();
  });
});
