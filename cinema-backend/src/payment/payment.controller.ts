import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('mock')
  async createMockPayment(
    @Query('orderId') orderId: string,
    @Query('amount') amount: number,
    @Query('method') method: 'vnpay' | 'momo',
    @Query('status') status?: 'success' | 'fail',
  ) {
    if (!orderId || !amount || !method) {
      throw new BadRequestException('Thiếu thông tin thanh toán.');
    }

    return this.paymentService.createMockPayment(orderId, amount, method, status);
  }
}
