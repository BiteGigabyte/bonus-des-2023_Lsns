import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];
  constructor() {}

  async getAllUsers() {
    return this.users;
  }

  async createUser(data) {
    // id ( inc, new Date, uuid)
    return this.users.push(data);
  }

  async getOneUserAccount(userId: string) {
    const user = this.users.find((item) => item.id === userId);
    return user;
  }

  // delete
  // update
}
