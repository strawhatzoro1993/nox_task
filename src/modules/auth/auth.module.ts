import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { User } from './models/user.entity';
import { configService } from '../../config/config.service';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from './services/users.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'yourSecretKey', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthGuard, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, UsersService, JwtModule],
})
export class AuthModule {}
