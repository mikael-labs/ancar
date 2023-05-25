import { HttpStatus } from '@nestjs/common';

export abstract class BaseError extends Error {
  constructor(message: string, public readonly statusCode: HttpStatus) {
    super(message);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
