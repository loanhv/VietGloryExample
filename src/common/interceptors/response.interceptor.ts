import { dateHelper } from '@common/helpers';
import { IBaseResponse } from '@common/types/base';
import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
class ResponseInterceptor<T> implements NestInterceptor<T, IBaseResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IBaseResponse<T>> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context)),
            catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
        );
    }

    errorHandler(exception: HttpException, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status: false,
            statusCode: status,
            path: request.url,
            message: exception.message,
            result: null,
            timestamp: dateHelper.formatDate(new Date().toISOString(), 'YYYY-MM-DD HH:mm:ss'),
        });
    }

    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = response.statusCode;

        return {
            status: true,
            path: request.url,
            statusCode,
            data: res,
            timestamp: dateHelper.formatDate(new Date().toISOString(), 'YYYY-MM-DD HH:mm:ss'),
            message: 'OK',
        };
    }
}

export { ResponseInterceptor };
