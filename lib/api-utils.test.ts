import { describe, it, expect } from "vitest";
import { ApiError } from "./api-utils";

describe("ApiError", () => {
  it("カスタムエラーを作成できる", () => {
    const error = new ApiError(404, "Not found");

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe("Not found");
    expect(error.name).toBe("ApiError");
  });

  it("エラー詳細を含められる", () => {
    const errors = [
      { field: "title", message: "タイトルは必須です" },
    ];
    const error = new ApiError(400, "バリデーションエラー", errors);

    expect(error.errors).toEqual(errors);
  });
});
