import { NextFunction, Request, Response } from "express";
import { RedisOptions, Redis } from "ioredis";
import requestIp from "request-ip"
import rateLimiter from "../lib/rate-limiter";

const option: RedisOptions = {
  host: process.env.REDIS_HOST!,
  password: process.env.REDIS_PASSWORD!,
  port: parseInt(process.env.REDIS_PORT!, 10),
};

const client = new Redis(option);
const LIMIT_PER_SECOND = 60;
const DURATION = 60;

export const redisLimitHandler = async (req: Request, res: Response, next: NextFunction) => {
    const identifier = requestIp.getClientIp(req);

    const result = await rateLimiter(
        client,
        identifier!,
        LIMIT_PER_SECOND,
        DURATION
    );

    res.setHeader("X-RateLimit-Limit", result.limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);


    //lancar um erro
    if (!result.success) {
        res.status(429).json("Too many requests in 1 minute. Please try again in a few minutes.");
        return;
    }

    res.status(200).json({ name: "John Doe" });
}
