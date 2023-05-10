import jwt from "jsonwebtoken";
import { Token } from "typescript";

export class JwtService {
  public sign(userId: number, email: string, expiresIn: string): string {
    const apiTokenKey = this.getTokenKey();

    if (!apiTokenKey) {
      throw new Error("API key must be provided");
    }

    const token = jwt.sign(
      {
        user_id: userId,
        email,
      },
      apiTokenKey,
      {
        expiresIn: expiresIn,
      }
    );

    return token;
  }

  public verify(token: string) {
    return jwt.verify(token, this.getTokenKey());
  }

  public getTokenKey(): string {
    return process.env.API_TOKEN_KEY as string;
  }

  public getJwtToken(token: string): string {
    const tokenParts = token.split(" ");
    const isBearer = tokenParts[0];

    if (!isBearer) {
      throw new Error("Provided token must be Bearer Token");
    }

    return tokenParts[1];
  }
}
