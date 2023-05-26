import { User, UserId } from '../entities/user';

type UserDTOProps = {
  id: UserId;
  name: string;
  CPF: string;
};

export class UserDTO {
  id: UserId;
  name: string;
  CPF: string;

  constructor({ id, CPF, name }: UserDTOProps) {
    this.id = id;
    this.name = name;
    this.CPF = CPF;
  }

  static fromUser(user: User): UserDTO {
    return new UserDTO({
      id: user.id,
      name: user.name,
      CPF: user.CPF,
    });
  }
}
