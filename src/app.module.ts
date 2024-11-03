import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { Connection } from 'typeorm';
import { User } from './modules/auth/models/user.entity';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    ModulesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private connection: Connection) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const userRepository = this.connection.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { username: 'admin' },
    });

    if (!existingUser) {
      const newUser = new User();
      newUser.username = 'admin';
      newUser.password = await bcrypt.hash(
        configService.getValue('ADMIN_PASSWORD'),
        10,
      );
      console.log(configService.getValue('ADMIN_PASSWORD'));
      newUser.role = 'admin';

      await userRepository.save(newUser);
    }
  }
}
