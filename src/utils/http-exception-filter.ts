import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status == 409 || status == 422 || status == 401 || status === 403) {
      return response.status(status).json(exception.response);
    }
    if (status == 500) {
      return response.status(status).json(exception);
    }
    if (
      status == 400 &&
      exception.response &&
      exception.response.message &&
      Array.isArray(exception.response.message)
    ) {
      const adjustedErrorFields = {};
      exception.response.message.forEach((error) => {
        const strToArray = error.split(' ');
        adjustedErrorFields[strToArray[0]] = strToArray.slice(1).join(' ');
      });
      return response.status(422).json(adjustedErrorFields);
    }
    response.status(status).json(exception.response);
  }
}
