import { JwtService } from "./jwt.service";

describe("Testing Jwt Service", () => {
  

  it("should return valid jwt token", () => {
    process.env.API_TOKEN_KEY = "rockandstone";

    const jwtService = new JwtService();
    const token = jwtService.sign(123, "test@test.com", "1h");

    expect(typeof token).toBe("string");
    expect(token).toHaveLength(179);
  });
});
