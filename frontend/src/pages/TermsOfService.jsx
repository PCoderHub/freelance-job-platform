import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Terms of Service
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4 text-gray-700">
        By accessing or using Skillora, you agree to be bound by these Terms of
        Service. If you do not agree, please do not use the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
      <p className="text-gray-700 mb-4">
        You must be at least 18 years old to use this platform and provide
        accurate information during registration.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
      <p className="text-gray-700 mb-4">
        Users are responsible for maintaining the confidentiality of their
        accounts. Administrators reserve the right to suspend or deactivate
        accounts that violate platform rules.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Jobs & Proposals</h2>
      <p className="text-gray-700 mb-4">
        Clients must provide clear job details. Freelancers must submit honest
        proposals. Misuse of the platform is strictly prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments</h2>
      <p className="text-gray-700 mb-4">
        All payments must be processed through the platform using Stripe.
        Payment is initiated only after a job is marked as completed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Reviews</h2>
      <p className="text-gray-700 mb-4">
        Reviews can only be submitted after successful job completion and
        payment. False or abusive reviews may be removed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
      <p className="text-gray-700 mb-4">
        Skillora reserves the right to suspend or terminate accounts violating
        these terms without prior notice.
      </p>
    </div>
  );
};

export default TermsOfService;
