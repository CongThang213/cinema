import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const method = searchParams.get('method');

  if (!orderId || !amount || !method) {
    return NextResponse.json({ error: 'Thiếu thông tin thanh toán' }, { status: 400 });
  }

  // Giả lập thanh toán thành công/thất bại
  const isSuccess = Math.random() > 0.5;
  const status = isSuccess ? 'success' : 'fail';
  const message = isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!';

  // URL frontend
  const paymentUrl = `/payment/result?status=${status}&message=${encodeURIComponent(message)}`;

  return NextResponse.json({ paymentUrl });
}
