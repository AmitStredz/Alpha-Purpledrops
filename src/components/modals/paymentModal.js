import React, { useState } from 'react';
import Header from '../navbar/header';
import Footer from '../footer/footer';
import { CgCloseO } from 'react-icons/cg';

export default function PaymentModal({onclose}) {
  const [selectedMethod, setSelectedMethod] = useState('creditCard');

  return (
    <div className='w-screen h-full fixed top-0 text-black left-0 flex font-aclonica justify-center items-center backdrop-blur-xl z-[100] overflow-auto' data-aos="fade-in">
      <div className="fixed h-auto max-h-[90vh] overflow-y-auto m-3 sm:m-6 md:m-10 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-10 w-[95%] sm:w-[90%] md:w-[80%] max-w-4xl" data-aos="zoom-in">
        <div className='flex justify-between items-center py-2 sm:py-3 md:py-5 border-b pb-3 sm:pb-4'>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Payment Method</h2>
          <CgCloseO size={25} onClick={onclose} className='cursor-pointer hover:text-red-500 transition-colors'/>
        </div>

        <div className="mb-4 sm:mb-6 mt-3 sm:mt-4">
          <h3 className="text-base sm:text-lg font-semibold">Choose a payment method</h3>
          <div className="flex flex-wrap justify-center sm:justify-around gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div
              onClick={() => setSelectedMethod('creditCard')}
              className={`cursor-pointer border p-2 sm:p-3 md:p-4 rounded-lg flex flex-col items-center w-[85px] sm:w-28 md:w-32 transition-all hover:shadow-md
                ${selectedMethod === 'creditCard' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl">💳</div>
              <p className="text-xs sm:text-sm md:text-base text-center mt-1">Credit card</p>
              {selectedMethod === 'creditCard' && <div className="text-[#8601FF] mt-1 sm:mt-2">✔</div>}
            </div>

            <div
              onClick={() => setSelectedMethod('paypal')}
              className={`cursor-pointer border p-2 sm:p-3 md:p-4 rounded-lg flex flex-col items-center w-[85px] sm:w-28 md:w-32 transition-all hover:shadow-md
                ${selectedMethod === 'paypal' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl">🅿️</div>
              <p className="text-xs sm:text-sm md:text-base text-center mt-1">Paypal</p>
              {selectedMethod === 'paypal' && <div className="text-[#8601FF] mt-1 sm:mt-2">✔</div>}
            </div>

            <div
              onClick={() => setSelectedMethod('upi')}
              className={`cursor-pointer border p-2 sm:p-3 md:p-4 rounded-lg flex flex-col items-center w-[85px] sm:w-28 md:w-32 transition-all hover:shadow-md
                ${selectedMethod === 'upi' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl">📱</div>
              <p className="text-xs sm:text-sm md:text-base text-center mt-1">UPI transaction</p>
              {selectedMethod === 'upi' && <div className="text-[#8601FF] mt-1 sm:mt-2">✔</div>}
            </div>
          </div>
        </div>

        {selectedMethod === 'creditCard' && (
          <div className="mt-4 sm:mt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 md:mb-4">Add your card details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {/* Card Number */}
              <div className="relative">
                <label className="block mb-1 font-semibold text-sm">Card Number</label>
                <input
                  type="text"
                  value="1900 4367 9362 8937"
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base"
                  readOnly
                />
                <div className="absolute right-3 top-[33px] sm:top-[37px] text-sm sm:text-base">VISA</div>
                <div className="absolute right-10 sm:right-12 top-[33px] sm:top-[37px] text-[#8601FF]">✔</div>
              </div>

              {/* Expiration Date */}
              <div className="relative">
                <label className="block mb-1 font-semibold text-sm">Expiration Date</label>
                <input
                  type="text"
                  value="02/26"
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base"
                  readOnly
                />
                <div className="absolute right-3 top-[33px] sm:top-[37px] text-gray-500">📅</div>
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block mb-1 font-semibold text-sm">Card Holder Name</label>
                <input
                  type="text"
                  value="Mr. Siva Prakash"
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base"
                  readOnly
                />
              </div>

              {/* CVV */}
              <div className="relative">
                <label className="block mb-1 font-semibold text-sm">CVV</label>
                <input
                  type="text"
                  value="987"
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base"
                  readOnly
                />
                <div className="absolute right-3 top-[33px] sm:top-[37px] text-gray-500">🔒</div>
              </div>
            </div>

            {/* Total and Place Order */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5 sm:mt-6 md:mt-8 gap-3 sm:gap-4">
              <div className="text-base sm:text-lg font-bold">Total: $1200</div>
              <button className="w-full sm:w-auto bg-[#8601FF] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
                Place Order
              </button>
            </div>
          </div>
        )}

        {selectedMethod === 'paypal' && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-6 border rounded-lg text-center">
            <div className="text-xl sm:text-2xl text-blue-500 mb-3">PayPal Integration</div>
            <p className="text-sm sm:text-base mb-4">Click the button below to complete your payment with PayPal</p>
            <button className="bg-blue-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">
              Pay with PayPal
            </button>
          </div>
        )}

        {selectedMethod === 'upi' && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-6 border rounded-lg text-center">
            <div className="text-xl sm:text-2xl mb-3">UPI Payment</div>
            <div className="mb-4 flex justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-sm sm:text-base">QR Code Here</p>
              </div>
            </div>
            <p className="text-sm sm:text-base mb-3">UPI ID: example@upi</p>
            <div className="text-base sm:text-lg font-bold mb-4">Total: $1200</div>
            <button className="bg-[#8601FF] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto">
              I've Completed Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
