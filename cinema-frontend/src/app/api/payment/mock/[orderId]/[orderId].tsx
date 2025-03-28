import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount');
  const method = searchParams.get('method');

  if (!params.orderId || !amount || !method) {
    return NextResponse.json({ status: 'fail', message: 'Thiếu thông tin thanh toán' }, { status: 400 });
  }

  // Giả lập kết quả thanh toán
  const isSuccess = Math.random() > 0.5;
  const status = isSuccess ? 'success' : 'fail';
  const message = isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!';

  return NextResponse.json({ status, message });
}
