import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import {LoggerMiddleware} from "../middleware/logger.middleware";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        // .forRoutes(CustomerController);
        .forRoutes('customer');
  }
}
