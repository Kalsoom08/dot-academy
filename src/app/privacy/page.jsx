import Head from 'next/head';
import { Anton } from 'next/font/google';

const anton = Anton({ subsets: ['latin'], weight: '400' });

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Ecademy Dot</title>
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800 font-sans">


        <section>
          <h1 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>
            Privacy Policy <span>🔒</span>
          </h1>
          <p className="">
            At Ecademy Dot, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
          <p >1. Information We Collect</p>
          <ul className="list-disc ml-5 mb-4">
            <li>Your name, email address, and contact details</li>
            <li>Usage data (which pages you visit, what you click, etc.)</li>
            <li>Device information (browser type, IP address)</li>
          </ul>

          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>How We Use Your Information</h2>
          <ul className="list-disc ml-5 mb-4">
            <li>Provide our exam preparation services</li>
            <li>Improve the user experience</li>
            <li>Send updates or important announcements</li>
            <li>Respond to your queries or support requests</li>
          </ul>

          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Cookies</h2>
          <p className="mb-4">We may use cookies to improve site functionality and analyze site traffic. You can disable cookies in your browser settings.</p>

          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Third-Party Services</h2>
          <p className="mb-4">We do not sell or share your personal data with third parties. However, we may use third-party services (like analytics tools) that collect anonymous usage data.</p>

          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Data Security</h2>
          <p className="mb-4">We take steps to protect your information using secure technology. However, no method of transmission over the internet is 100% secure.</p>

          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Your Rights</h2>
          <p className="mb-4">
            You may request access to, correction of, or deletion of your data by contacting us at{' '}
            <a href="mailto:ecademydot@mail.com" className="text-purple-600 underline">ecademydot@mail.com</a>.
          </p>
        </section>

      
        <section>
          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Disclaimer ⚠️</h2>
          <p className="mb-2">
            Ecademy Dot is an educational platform created to help students and job-seekers prepare for One Paper MCQs Tests and other exams in the future.
          </p>
          <ul className="list-disc ml-5 mb-4">
            <li>We are not affiliated with any government body or testing agency.</li>
            <li>Our content is based on past paper trends, public resources, and expert inputs.</li>
            <li>We do not guarantee selection or success in any exam.</li>
            <li>The information provided is for general guidance only. Always verify with official sources.</li>
          </ul>
          <p>
            By using our platform, you agree that Ecademy Dot is not responsible for any loss or consequence that may result from using the material.
          </p>
        </section>

       
        <section>
          <h2 className={`${anton.className} text-2xl font-bold text-[#7D287E] mb-2`}>Terms and Conditions 🧾</h2>
          <p className="mb-2">Effective Date: 10-August-2025</p>
          <p className="mb-2">
            Welcome to Ecademy Dot. These Terms and Conditions govern your use of our website and services. By accessing our site, you agree to the following:
          </p>
          <ol className="list-decimal ml-5 mb-4 space-y-2">
            <li>
              <strong>User Conduct:</strong>
              <ul className="list-disc ml-5 mt-1">
                <li>You must be at least 13 years old to use our services.</li>
                <li>You agree to use our content only for personal, non-commercial learning purposes.</li>
                <li>Do not misuse the platform (e.g., hacking, copying content, or spreading misinformation).</li>
              </ul>
            </li>
            <li>
              <strong>Intellectual Property:</strong> All content on Ecademy Dot, including text, quizzes, and designs, is our intellectual property. You may not reproduce or distribute it without our written consent.
            </li>
            <li>
              <strong>Account Responsibility:</strong> You’re responsible for keeping your login information safe and for all activity under your account.
            </li>
            <li>
              <strong>Modifications:</strong> We may update our content, features, or policies without prior notice. Please review these terms regularly.
            </li>
            <li>
              <strong>Limitation of Liability:</strong> We do our best to provide accurate and helpful content. However, we are not liable for any errors, omissions, or exam outcomes related to your use of our platform.
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
