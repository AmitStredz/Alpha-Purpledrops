import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-400">Terms and Conditions</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <p className="mb-4">
            Welcome to <span className="text-green-400 font-medium">PurpleDrops AI</span>. By signing up and using our crypto trading bot services available at <span className="text-blue-300">www.alpharoboticsllp.com</span> you agree to comply with and be legally bound by these Terms and Conditions. If you do not agree, you must not use our services.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-gray-700 pb-2">Eligibility & Account Registration</h2>
          <div className="space-y-4">
            <p><span className="font-medium text-green-400">Age Requirement:</span> You must be at least 18 years old (or the legal age in your jurisdiction) to use our services.</p>
            <p><span className="font-medium text-green-400">Accuracy of Information:</span> You must provide accurate, complete, and up-to-date information during registration.</p>
            <p><span className="font-medium text-green-400">Account Security:</span> You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.</p>
            <p><span className="font-medium text-green-400">Prohibited Users:</span> We reserve the right to refuse service to anyone, including users from restricted jurisdictions.</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-gray-700 pb-2">Risks & Disclaimers</h2>
          <div className="space-y-4">
            <p><span className="font-medium text-green-400">High-Risk Activity:</span> Cryptocurrency trading involves significant financial risk, including the potential loss of all invested capital.</p>
            <p><span className="font-medium text-green-400">No Guarantees:</span> Purpledrops AI does not guarantee profits, and past performance is not indicative of future results.</p>
            <p><span className="font-medium text-green-400">No Financial Advice:</span> Our services are for informational purposes only and should not be considered financial, legal, or tax advice.</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-gray-700 pb-2">Fees & Payments</h2>
          <div className="space-y-4">
            <p><span className="font-medium text-green-400">Subscription Fees:</span> Any applicable fees will be disclosed before purchase.</p>
            <p><span className="font-medium text-green-400">Non-Refundable:</span> Fees are generally non-refundable unless required by law.</p>
            <p><span className="font-medium text-green-400">Changes to Fees:</span> We reserve the right to modify pricing with prior notice.</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-gray-700 pb-2">Termination & Suspension</h2>
          <div className="space-y-4">
            <p><span className="font-medium text-green-400">By Us:</span> We may suspend or terminate your account for violations of these Terms.</p>
            <p><span className="font-medium text-green-400">By You:</span> You may close your account at any time, subject to any pending obligations.</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400 border-b border-gray-700 pb-2">Contact Us</h2>
          <p className="mb-4">
            For any questions or concerns regarding these Terms, please contact:
          </p>
          <div className="flex items-center bg-gray-700 p-4 rounded-lg">
            <span className="mr-3 text-xl">📧</span>
            <span>Email: <a href="mailto:alpharoboticsllp@gmail.com" className="text-blue-300 hover:underline">purpledrops@gmail.com</a></span>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-400">
          <p>Last updated: April 16, 2025</p>
          <p className="mt-2">© 2025 Purpledrops Robotics LLP. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;