import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './modules/vehiculos/vehiculos.module';
import { UsersModule } from './modules/users/users.module'; 
import { RescuesModule } from './modules/rescues/rescues.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true 
    }), 
  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USER') || 'postgres', 
        password: configService.get<string>('DB_PASS') || '',       
        database: configService.get<string>('DB_NAME') || 'uber_mecanicos', 
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    VehiculosModule,
    UsersModule, 
    RescuesModule,
    TrackingModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}