import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'password123',
    },
  ];

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }
}
