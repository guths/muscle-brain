import exp from "constants";
import { JwtService } from "./jwt.service"
import jwt from 'jsonwebtoken';

describe('Testing Jwt Service', () => {
    it('should return valid jwt token', () => {
        const jwtService = new JwtService();

        const spy = jest.spyOn(jwtService, 'getTokenKey');
        spy.mockReturnValue('api_mock_key');

        const token = jwtService.sign(123, 'test@test.com', '1h');

        expect(typeof token).toBe('string');
        expect(token).toHaveLength(179);
    })

    it('should return error when api key not provided in env', () => {
        const jwtService = new JwtService();
        expect(() => jwtService.sign(123, 'test@test.com', '1h')).toThrowError(new Error('API key must be provided'));
    })
})