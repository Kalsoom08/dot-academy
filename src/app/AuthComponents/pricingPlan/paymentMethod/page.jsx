'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaComments } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import icon1 from '../../../../../public/Payment/icon1.png';
import icon2 from '../../../../../public/Payment/icon2.png';

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('payfast');

  const isSelected = (method) => selectedMethod === method;

  return (
    <section className="min-h-screen flex flex-col items-center bg-white py-10 px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-10 anton text-center">
        Choose a payment method
      </h1>

      <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 w-full max-w-md">
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg px-4 py-3 mb-4 ${
            isSelected('1link') ? 'border-[#7c287d] bg-[#fdf8fd]' : 'border-gray-300'
          } cursor-pointer`}
          onClick={() => setSelectedMethod('1link')}
        >
          <div className="flex items-start sm:items-center gap-4 mb-2 sm:mb-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                isSelected('1link') ? 'bg-[#7c287d]' : 'border-2 border-gray-400'
              }`}
            >
              {isSelected('1link') && <FaCheck size={10} className="text-white" />}
            </div>
            <div>
              <p className={`font-semibold ${isSelected('1link') ? 'text-[#7c287d]' : ''}`}>1Link 1bill</p>
              <p className="text-sm text-gray-500">Coming Soon</p>
            </div>
          </div>
          <Image src={icon1} alt="1Link Icon" className="w-8 h-8 object-contain self-end sm:self-auto" />
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg px-4 py-3 mb-4 ${
            isSelected('payfast') ? 'border-[#7c287d] bg-[#fdf8fd]' : 'border-gray-300'
          } cursor-pointer`}
          onClick={() => setSelectedMethod('payfast')}
        >
          <div className="flex items-start sm:items-center gap-4 mb-2 sm:mb-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                isSelected('payfast') ? 'bg-[#7c287d]' : 'border-2 border-gray-400'
              }`}
            >
              {isSelected('payfast') && <FaCheck size={10} className="text-white" />}
            </div>
            <div>
              <p className={`font-semibold ${isSelected('payfast') ? 'text-[#7c287d]' : ''}`}>Payfast</p>
              <p className="text-sm text-gray-600">Pay via Debit/Credit/Wallet/Bank Account</p>
            </div>
          </div>
          <Image src={icon2} alt="Payfast Icon" className="w-8 h-8 object-contain self-end sm:self-auto" />
        </div>

        <div className="text-sm text-gray-700 py-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center mb-2">
            <span>Ecademy MDCAT Course</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#00A0FF] text-white text-xs px-2 py-0.5 rounded-md">Save 80%</span>
              <span className="font-semibold">Rs. 5000</span>
            </div>
          </div>
          <div className="border-t border-gray-300 my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs. 5000</span>
          </div>
        </div>

        <button className="mt-6 w-full bg-[#7c287d] text-white py-2 rounded-full font-semibold">
          Next
        </button>
      </div>

      <div className="py-10 w-full lg:w-[80%] px-2 sm:px-6">
        <h1 className="text-[#7c287d] anton text-xl sm:text-2xl md:text-3xl py-4">Learn About Payfast payment</h1>
        <p className="text-sm py-2">
          Ab apna pasandida course ghar baithay asani se khareedain! PayFast ke zariye online payment karke aap hamaray aEcademy ka koi bhi course foran access kar saktay hain. Safe, secure aur tez tareen tareeqa sirf kuch clicks main taaleem ka safar shuru karein!
        </p>
        <h1 className="text-[18px] sm:text-[20px] mt-2">Online Course Purchase Karna Ab Asaan Hai!</h1>
        <p className="text-sm py-2">
          Hamari academy ke courses ab aap ghar baithay asaani se khareed saktay hain — sirf kuch simple steps follow karein:
        </p>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li><strong>Course Select Karein:</strong> Apni marzi ka course choose karein jo aap seekhna chahtay hain.</li>
          <li><strong>"Buy Now" ya "Enroll Now" Button Par Click Karein.</strong></li>
          <li><strong>Payment Method Choose Karein:</strong> Jab payment page open hoga, wahan PayFast ka option select karein.</li>
          <li><strong>Details Fill Karein:</strong> Apna naam, email aur zaroori maloomat enter karein.</li>
          <li><strong>Secure Payment Karein:</strong> PayFast ke zariye aap apni card, mobile wallet (Jaise JazzCash, EasyPaisa) ya bank account se payment kar saktay hain.</li>
          <li><strong>Course Access Karein:</strong> Payment ke baad aapko foran course ka access mil jaye ga — apni profile mein login kar ke course start karein.</li>
        </ol>

        <p className="text-gray-600 text-xs py-6">Secure, Reliable aur Fast PayFast ke zariye!</p>

        <h2 className="text-xl sm:text-2xl md:text-3xl text-[#7d287e] anton mb-4">Coming Soon 1Link 1Bill</h2>

        <p className="mb-4 text-sm">
          Hamari website par 1LINK / 1BILL payment option bohat jald available hone wala hai jiske zariye aap directly apni bank app, JazzCash, ya EasyPaisa se aasani se payment kar saktay honge.
        </p>

        <p className="mb-4 text-sm">🔜 Kuch hi dinon mein yeh feature live ho jayega.</p>

        <p className="mb-4 text-sm">🕐 Tab tak aap PayFast, JazzCash, EasyPaisa ya Manual Payment options ka use kar ke apna course khareed saktay hain.</p>

        <ol className="list-decimal pl-6 mb-6 space-y-2 text-sm">
          <li>Course Select Karein aur “Enroll Now” par click karein.</li>
          <li>Payment Method Main “1BILL (1LINK)” Choose Karein.</li>
          <li>Aapko aik unique 1BILL ID milegi (jaise: 1234567890123).</li>
          <li>Apna JazzCash, EasyPaisa, ya kisi bhi bank app open karein.</li>
          <li>Bill Payment / 1BILL option par jaa kar Biller Code ya 1BILL ID enter karein.</li>
          <li>Amount verify karein aur Confirm par click karein.</li>
          <li>Payment complete hone ke baad, aapko course ka access mil jaye ga within few minutes.</li>
        </ol>

        <h3 className="text-lg font-semibold mb-2">Note:</h3>

        <ul className="space-y-2 mb-4 text-sm">
          <li className="flex items-start gap-2">
            <span>✅ Yeh tareeqa safe, fast aur Pakistan ke taqreeban har bank app ya wallet mein available hai.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>❗ Agar aapko 1BILL ID milne ke baad bhi koi masla ho, to humse foran rabta karein.</span>
          </li>
        </ul>

        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <FaPhone />
            <span>WhatsApp / Call: [Aapka Number]</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope />
            <span>Email: [Aapka Email]</span>
          </li>
          <li className="flex items-center gap-2">
            <FaComments />
            <span>Live Chat Support bhi available hai!</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PaymentMethod;
