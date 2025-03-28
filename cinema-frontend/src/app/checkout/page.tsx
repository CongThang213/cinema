'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const backendUrl = 'http://localhost:4000';
  // Xử lý thanh toán
  const handlePayment = async (method: 'vnpay' | 'momo') => {
    setLoading(method);
    const orderId = `order_${Date.now()}`;
    const amount = 100000; // Giả lập số tiền
  
    try {
      const res = await fetch(`${backendUrl}/payment/mock?orderId=${orderId}&amount=${amount}&method=${method}`);
  
      if (!res.ok) throw new Error('Lỗi khi kết nối API');
  
      const data = await res.json();
      if (data.paymentUrl) {
        router.push(data.paymentUrl);
      } else {
        alert('Không nhận được URL thanh toán.');
      }
    } catch (error) {
      alert(`Lỗi hệ thống: ${error}`);
    } finally {
      setLoading(null);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Chọn phương thức thanh toán</h2>

      <div className="flex gap-4">
        {['vnpay', 'momo'].map((method) => (
          <button
            key={method}
            onClick={() => handlePayment(method as 'vnpay' | 'momo')}
            disabled={loading !== null}
            className={`px-6 py-2 text-white rounded transition duration-300 ${
              loading === method
                ? 'bg-gray-400 cursor-not-allowed'
                : method === 'vnpay'
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-pink-500 hover:bg-pink-700'
            }`}
          >
            {loading === method ? 'Đang xử lý...' : `Thanh toán bằng ${method.toUpperCase()}`}
          </button>
        ))}
      </div>
    </div>
  );
}
