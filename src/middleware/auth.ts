import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/auth/token/jwt.service";
import { BadRequest, Forbidden, Unauthorized } from "../lib/Errors/errors";

const authMiddleware = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  if (!request.headers.authorization) {
    throw new Forbidden("A Bearer token must be provided to be auth");
  }

  //implementar alguma renovacao de token, verificar se a expiracao do token esta prestes a expirar e renov
  // mudar a expiracao do token para 48h, se o token tiver menos de 24 horas da para renovar  
  //da para procurar alguma coisa sobre salvar esses tokens no redis 

  const jwtService = new JwtService();

  const token = jwtService.getJwtToken(request.headers.authorization);

  try { 
    let decoded = jwtService.verify(token);
    
    request.user = decoded;
  } catch (e) {
    throw new Unauthorized("User are unauthorized");
  }

  

  next();
};


export {authMiddleware}
