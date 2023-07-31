import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const body = context.switchToHttp().getRequest();
    const path = context.switchToHttp().getRequest()?.route?.path;
    console.log({ body });

    console.log('Before...');
    return handler.handle().pipe(tap(() => console.log(`After...`)));
  }
}
