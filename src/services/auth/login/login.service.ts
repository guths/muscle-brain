import { User } from "@prisma/client";
import { UserRepository } from "../../../repositories/user.repository";
import bcrypt from "bcryptjs";
import { JwtService } from "../token/jwt.service";

export default class LoginService {
  constructor(private userRepository: UserRepository) {}

  public async login(email: string, password: string): Promise<object> {
    const user = await this.userRepository.findUnique({
      email: email,
    });

    if (!user) {
      throw new Error("User not found");
    }
    
    const comparedPassords = await bcrypt.compare(password, user.password);

    if (!comparedPassords) {
      throw new Error("Password does not match");
    }

    const jwtService = new JwtService();

    const token = jwtService.sign(user.id, user.email, "2h");

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname,
      email: user.email,
      token: token
    };
  }
}
