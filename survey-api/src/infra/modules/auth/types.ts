import { UserId } from 'src/core/entities';

export type AuthenticatedUser = {
  id: UserId;
  CPF: string;
};
