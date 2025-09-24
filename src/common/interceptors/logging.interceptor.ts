import { Injectable, Logger, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const { method, originalUrl, headers } = request;
    const startedAt = Date.now();

    const authorization = headers['authorization'] ?? headers['Authorization'];
    const serializedBody = this.stringifyBody(request.body);
    const userId = this.extractUserId(authorization);

    this.logger.log(
      `Request ${method} ${originalUrl} userId=${userId ?? 'N/A'} body=${serializedBody}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startedAt;
        this.logger.log(`Response ${method} ${originalUrl} ${response.statusCode} +${duration}ms`);
      }),
      catchError((err) => {
        const duration = Date.now() - startedAt;
        const status = err?.status ?? err?.statusCode ?? 500;
        this.logger.error(
          `Error ${method} ${originalUrl} ${status} +${duration}ms`,
          err?.stack,
        );
        throw err;
      }),
    );
  }

  private stringifyBody(body: unknown): string {
    if (typeof body === 'undefined') {
      return 'undefined';
    }

    if (body === null) {
      return 'null';
    }

    if (typeof body === 'string') {
      return body;
    }

    try {
      return JSON.stringify(body);
    } catch (error) {
      return '[unserializable-body]';
    }
  }

  private extractUserId(authorizationHeader: string | string[] | undefined): string | undefined {
    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
      return undefined;
    }

    const [, token] = authorizationHeader.split(' ');
    if (!token) {
      return undefined;
    }

    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64').toString('utf8'));
      return payload?.sub ?? payload?.userId;
    } catch (error) {
      this.logger.warn('Failed to decode JWT while logging request');
      return undefined;
    }
  }
}
