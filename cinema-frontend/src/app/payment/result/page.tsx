'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('Đang xử lý thanh toán...');

  useEffect(() => {
    if (searchParams) {
      const newStatus = searchParams.get('status');
      const newMessage = searchParams.get('message');

      setStatus(newStatus || 'error');
      setMessage(newMessage || 'Không có thông tin thanh toán.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2
        className={`text-2xl font-bold ${
          status === 'success' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {message}
      </h2>

      <button
        onClick={() => router.push('/')}
        className="px-6 py-2 bg-gray-500 text-white rounded transition duration-300 hover:bg-gray-700"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}
