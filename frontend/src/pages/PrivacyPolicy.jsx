import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-4 text-gray-700">
        Your privacy is important to us. This Privacy Policy explains how
        Skillora collects, uses, and protects your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Personal information (name, email)</li>
        <li>Profile and job-related information</li>
        <li>Chat messages for platform functionality</li>
        <li>Transaction data (excluding card details)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Payments & Security</h2>
      <p className="text-gray-700 mb-4">
        Payments are securely processed via Stripe. We do not store card
        information on our servers.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection</h2>
      <p className="text-gray-700 mb-4">
        We use industry-standard security measures to protect user data.
        However, no system can guarantee complete security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Rights</h2>
      <p className="text-gray-700 mb-4">
        Users may request access, updates, or deactivation of their accounts.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        For privacy-related concerns, contact us at{" "}
        <strong>support@skillora.com</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
