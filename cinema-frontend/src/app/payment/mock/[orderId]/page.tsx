'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MockPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dùng `useMemo()` để tránh gọi `searchParams.get()` nhiều lần
  const params = useMemo(() => ({
    orderId: searchParams?.get('orderId') ?? '',
    amount: searchParams?.get('amount') ?? '',
    method: searchParams?.get('method') ?? '',
  }), [searchParams]);

  const [message, setMessage] = useState('Đang xử lý thanh toán...');

  useEffect(() => {
    if (!params.orderId || !params.amount || !params.method) {
      setMessage('Lỗi: Thiếu thông tin thanh toán!');
      return;
    }

    const processPayment = async () => {
      try {
        const res = await fetch(`/api/payment/mock/${params.orderId}?amount=${params.amount}&method=${params.method}`);
        if (!res.ok) throw new Error('Lỗi kết nối với server');

        const data = await res.json();
        setMessage(data.message);

        setTimeout(() => {
          router.push(`/payment/result?status=${data.status}&message=${encodeURIComponent(data.message)}`);
        }, 3000);
      } catch (error) {
        setMessage('Lỗi khi xử lý thanh toán. Vui lòng thử lại!');
      }
    };

    processPayment();
  }, [params, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl">{message}</h2>
    </div>
  );
}
