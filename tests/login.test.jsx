import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { loginUser, logoutUser } from "../src/lib/api";

// Mocking localStorage
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

// Setting up the localStorage mock
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("suit for login and logout", () => {
  // Spies to track localStorage method calls
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

  // Original fetch function reference
  let originalFetch;

  // Test case: Login should store the token and user email in localStorage
  it("stores token on successful login", async () => {
    // Arrange: Set up the mock fetch response
    // Act: Call the loginUser function
    const data = await loginUser({
      email: "test@stud.noroff.com",
      password: "password",
    });

    // Assert: Check if the data is correct and localStorage is updated
    expect(data.accessToken).toBe("dummyAccessToken");
    expect(localStorage.getItem("jwt")).toBe("dummyAccessToken");
    expect(localStorage.getItem("user_email")).toBe("test@stud.noroff.com");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Setup before each test
  beforeEach(() => {
    // Mocking the global fetch function
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          status: 200,
          ok: true,
          json: () =>
            Promise.resolve({
              accessToken: "dummyAccessToken",
              email: "test@stud.noroff.com",
            }),
        })
      )
    );
    // Save the original fetch function and replace it with the mock
    originalFetch = global.fetch;
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();

    // Clear localStorage and reset spies
    getItemSpy.mockClear();
    setItemSpy.mockClear();

    // Restore the original fetch function after each test
    global.fetch = originalFetch;
  });

  // Test case: Logout should clear the token from localStorage
  it("clears the token from localStorage", () => {
    // Arrange: Set up localStorage with a token and user email
    localStorage.setItem("jwt", "dummyAccessToken");
    localStorage.setItem("user_email", "test@stud.noroff.com");

    // Act: Call the logoutUser function
    logoutUser();

    // Assert: Check if the token and user email are cleared from localStorage
    expect(localStorage.getItem("jwt")).toBeNull();
    expect(localStorage.getItem("user_email")).toBeNull();
  });
});
