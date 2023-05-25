export type UserId = number;

export type UserProps = {
  id?: UserId;
  name: string;
  password: string;
  CPF: string;
};

export class User {
  id: UserId;
  name: string;
  password: string;
  CPF: string;

  constructor({ id, name, password, CPF }: UserProps) {
    if (id) this.id = id;
    this.name = name;
    this.password = password;
    this.CPF = CPF;
  }
}
