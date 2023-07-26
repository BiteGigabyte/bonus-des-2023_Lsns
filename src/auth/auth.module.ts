import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
      session: false,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY || 'Secret',
        signOptions: {
          expiresIn: process.env.JWT_TTL || '24h',
        },
        verifyOptions: {
          clockTolerance: 60,
          maxAge: process.env.JWT_TTL || '24h',
        },
      }),
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, BearerStrategy, UserService],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
