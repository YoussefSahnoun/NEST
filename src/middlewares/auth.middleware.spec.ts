import {AuthenticationMiddleware} from './auth.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticationMiddleware()).toBeDefined();
  });
});
