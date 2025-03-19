import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let errorDetails: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      // Nếu lỗi là object, lấy thông tin chi tiết
      if (typeof errorResponse === 'object' && errorResponse !== null) {
        message = (errorResponse as any).message || 'Unknown error';
        errorDetails = errorResponse;
      } else {
        message = errorResponse as string;
      }
    }

    // Log lỗi chi tiết
    this.logger.error(
      `🚨 Error: ${status} | ${message} | Path: ${request.url}`,
      JSON.stringify(errorDetails)
    );

    // Trả về response rõ ràng
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url, // URL xảy ra lỗi
    });
  }
}
