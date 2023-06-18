import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
