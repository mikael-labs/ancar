export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  CPF: string;
  name: string;
  password: string;
};
