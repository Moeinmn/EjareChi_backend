import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/insfrastructure/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }, // Optional: Token expiration time
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
