import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './v1/auth/auth.module';
import { ProductsModule } from './v1/products/products.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ElasticModule } from './infrastructure/elasticsearch/elasticsearch.module';
import { UserInterceptor } from './v1/interceptors/user.interceptor';
// import { SearchModule } from './infrastructure/elasticsearch/elasticsearch.module';
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core"
import { AuthGuard } from './guards/auth.guard';
import { LoggerModule } from 'nestjs-pino';




@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    PrismaModule,
    AuthModule,
    ElasticModule,
    LoggerModule.forRoot({
      pinoHttp:{
        transport : {
          target : "pino-pretty",
          options:{
            singleLine : true
          }
        }

      }
    }
    )
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass:UserInterceptor
  },{
    provide:APP_GUARD,
    useClass:AuthGuard
  }],
})
export class AppModule {}
