import { StatusCodes } from "http-status-codes";

export class GeneralError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 0) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }

  public getCode() {
    if (this.statusCode === 0) {
      return StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return this.statusCode;
  }
}

export class BadRequest extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class Forbidden extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class NotFound extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class Conflit extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.CONFLICT);
  }
}

export class Unauthorized extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class UnprocessableEntity extends GeneralError {
  constructor(message = "") {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
}
