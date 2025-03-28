import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async createMockPayment(
    orderId: string,
    amount: number,
    method: 'vnpay' | 'momo',
    status?: 'success' | 'fail',
  ) {
    if (!orderId || !amount || !method) {
      throw new BadRequestException('Thiếu thông tin thanh toán.');
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // Nếu không có `status`, tự động random
    const finalStatus = status || (Math.random() > 0.5 ? 'success' : 'fail');

    const message =
      finalStatus === 'success'
        ? 'Thanh toán thành công!'
        : 'Thanh toán thất bại. Vui lòng thử lại.';

    // Redirect về frontend
    const paymentUrl = `${frontendUrl}/payment/result?status=${finalStatus}&message=${encodeURIComponent(message)}`;

    return { paymentUrl };
  }
}
