import React from "react";
import { useSelector } from "react-redux";

function JobDetails() {
  const job = useSelector((state) => state.job.job);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(job);

  return (
    <div>
      <div className="bg-white p-6 w-[90%] max-w-lg rounded-lg max-h-[80vh]">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">{job.title}</h2>

        <div className="space-y-4 pb-10">
          {/* Category */}
          <div>
            <p className="text-gray-500 text-sm">Category</p>
            <p className="font-medium">{job.category}</p>
          </div>

          {/* Budget */}
          <div>
            <p className="text-gray-500 text-sm">Budget</p>
            <p className="font-semibold text-green-600">£{job.budget}</p>
          </div>

          {/* Status */}
          <p className="mt-2 text-sm">
            <span className="font-medium">Status: </span>
            <span className="text-green-600">{job.status || "Open"}</span>
          </p>

          {/* Skills */}
          <div>
            <p className="text-gray-500 text-sm mb-1">Skills Required</p>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <p className="text-gray-500 text-sm">Duration</p>
            <p className="font-medium">{job.duration}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-500 text-sm mb-1">Description</p>
            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Client Details */}
          {user.role === "freelancer" && (
            <div className="mt-6 border-t pt-4">
              <p className="text-gray-500 text-sm font-semibold mb-3">
                Client Details
              </p>

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <img
                  src={job.client?.profile?.profilePic}
                  alt={job.client?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* Client Info */}

                <div className="flex-1 space-y-1">
                  {/* Name */}
                  <p className="text-gray-800 font-medium text-lg">
                    {job.client?.name}
                  </p>

                  {/* Title */}
                  {job.client?.profile?.title && (
                    <p className="text-gray-600 text-sm">
                      {job.client.profile.title}
                    </p>
                  )}

                  {/* Company Name */}
                  {job.client?.clientProfile?.companyName && (
                    <p className="text-gray-600 text-sm">
                      {job.client.clientProfile.companyName}
                    </p>
                  )}

                  {/* Company Website */}
                  {job.client?.clientProfile?.companyWebsite && (
                    <a
                      href={job.client.clientProfile.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      {job.client.clientProfile.companyWebsite}
                    </a>
                  )}

                  {/* Description */}
                  {job.client?.clientProfile?.description && (
                    <p className="text-gray-600 text-sm">
                      {job.client.clientProfile.description}
                    </p>
                  )}

                  {/* Hiring Budget */}
                  {job.client?.clientProfile?.hiringBudget && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Hiring Budget: </span>
                      {job.client.clientProfile.hiringBudget}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
