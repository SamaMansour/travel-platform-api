import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get(AuthController);
  });

  it('should call login service', async () => {
    mockAuthService.login.mockResolvedValue({ token: 'x' });

    const result = await controller.login({
      email: 'test@test.com',
      password: '123',
    });

    expect(result).toEqual({ token: 'x' });
    expect(mockAuthService.login).toHaveBeenCalledWith(
      'test@test.com',
      '123',
    );
  });
});
