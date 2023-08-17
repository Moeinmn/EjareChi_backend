import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CustomLoggerModule, PrismaModule, RedisModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';




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
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }, // Optional: Token expiration time
    }),
    CustomLoggerModule,
    RedisModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
