import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './v1/auth/auth.module';
import { ProductsModule } from './v1/products/products.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ElasticModule } from './infrastructure/elasticsearch/elasticsearch.module';


@Module({
  imports: [ConfigModule.forRoot(),
    ProductsModule,
    PrismaModule,
    AuthModule,
    ElasticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
