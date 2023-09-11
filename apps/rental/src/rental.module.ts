import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { CustomLoggerModule, PrismaModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   MONGODB_URI: Joi.string().required(),
      //   JWT_SECRET: Joi.string().required(),
      //   JWT_EXPIRATION: Joi.string().required(),
      //   HTTP_PORT: Joi.number().required(),
      //   TCP_PORT: Joi.number().required(),
      // }),
    }),
    CustomLoggerModule,
  ],
  controllers: [RentalController , CategoriesController],
  providers: [RentalService],
})
export class RentalModule {}
