import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">About Us</h1>

      <p className="mb-4 text-gray-700">
        Welcome to <strong>Skillora</strong>.
      </p>

      <p className="mb-4 text-gray-700">
        Skillora is a freelancing marketplace designed to connect skilled
        freelancers with clients who need reliable, high-quality services. Our
        platform enables clients to post jobs, review proposals, communicate in
        real time, and securely pay freelancers once the work is completed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        To empower freelancers and clients by providing a seamless platform for
        collaboration, communication, and secure payments.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our Vision</h2>
      <p className="text-gray-700 mb-4">
        To build a trusted freelance ecosystem that values quality work, fair
        compensation, and long-term professional relationships.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Offer</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Job posting and proposal management</li>
        <li>Real-time chat between clients and freelancers</li>
        <li>Secure payments using Stripe</li>
        <li>Verified reviews after job completion</li>
        <li>Dedicated dashboards for clients, freelancers, and admins</li>
      </ul>
    </div>
  );
};

export default AboutUs;
