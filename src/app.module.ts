import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './modules/vehiculos/vehiculos.module';
import { UsersModule } from './modules/users/users.module'; // Ajusta el nombre si lo generaste como UsuariosModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: '',
      database: 'uber_mecanicos', 
      autoLoadEntities: true,
      synchronize: true, 
    }),
    VehiculosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}