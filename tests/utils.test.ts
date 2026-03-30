import { paginate, formatDate, compact } from "../src/utils";

describe("paginate", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it("returns the first page", () => {
        expect(paginate(items, 1, 3)).toEqual([1, 2, 3]);
    });

    it("returns the second page", () => {
        expect(paginate(items, 2, 3)).toEqual([4, 5, 6]);
    });

    it("returns partial last page", () => {
        expect(paginate(items, 4, 3)).toEqual([10]);
    });

    it("returns empty array past the end", () => {
        expect(paginate(items, 5, 3)).toEqual([]);
    });
});

describe("formatDate", () => {
    it("formats a valid date", () => {
        const d = new Date("2024-01-15T10:00:00.000Z");
        expect(formatDate(d)).toBe("2024-01-15T10:00:00.000Z");
    });

    it("returns null for null", () => {
        expect(formatDate(null)).toBeNull();
    });

    it("returns null for undefined", () => {
        expect(formatDate(undefined)).toBeNull();
    });
});

describe("compact", () => {
    it("removes null values", () => {
        expect(compact({ a: 1, b: null, c: "hello" })).toEqual({ a: 1, c: "hello" });
    });

    it("removes undefined values", () => {
        expect(compact({ a: 1, b: undefined })).toEqual({ a: 1 });
    });

    it("keeps falsy-but-defined values", () => {
        expect(compact({ a: 0, b: false, c: "" })).toEqual({ a: 0, b: false, c: "" });
    });
});
