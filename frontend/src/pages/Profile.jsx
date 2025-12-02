import React, { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../services/userServices";
import { updateClientProfile } from "../services/clientServices";
import Modal from "../components/Modal";
import { uploadProfilePic } from "../services/uploadServices";
import EditProfileForm from "../components/EditProfileForm";
import { updateFreelancerProfile } from "../services/freelancerServices";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const userRole = JSON.parse(localStorage.getItem("user")).role;

  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    bio: "",
    profilePic: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    description: "",
    hiringBudget: 0,
    skills: [],
    hourlyRate: 0,
    experience: "",
    portfolioLinks: [],
    availability: "",
  });

  // LOAD USER INFO
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res.data);

        const data = {
          name: res.data.name || "",
          email: res.data.email || "",
          title: res.data.profile?.title || "",
          bio: res.data.profile?.bio || "",
          profilePic: res.data.profile?.profilePic || "",
        };

        if (userRole === "client") {
          Object.assign(data, {
            companyName: res.data.clientProfile?.companyName || "",
            companyWebsite: res.data.clientProfile?.companyWebsite || "",
            industry: res.data.clientProfile?.industry || "",
            description: res.data.clientProfile?.description || "",
            hiringBudget: res.data.clientProfile?.hiringBudget || 0,
          });
        }

        if (userRole === "freelancer") {
          Object.assign(data, {
            skills: res.data.freelancerProfile?.skills || [],
            hourlyRate: res.data.freelancerProfile?.hourlyRate || 0,
            experience: res.data.freelancerProfile?.experience || "",
            portfolioLinks: res.data.freelancerProfile?.portfolioLinks || [],
            availability: res.data.freelancerProfile?.availability || "",
          });
        }
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [userRole]);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
    setFormData({ ...formData, profilePic: file }); // store File for upload
  };

  // SAVE PROFILE
  // Upload to Cloudinary and save profile
  const handleSave = async () => {
    let profilePicUrl = formData.profilePic;

    // Upload image if a File object
    if (formData.profilePic instanceof File) {
      const uploadData = new FormData();
      uploadData.append("image", formData.profilePic);

      try {
        const uploadRes = await uploadProfilePic(uploadData);
        profilePicUrl = uploadRes.data.url; // get Cloudinary URL
      } catch (err) {
        toast.error("Image upload failed:", err);
        return;
      }
    }

    try {
      const updatedProfile = {
        name: formData.name,
        email: formData.email,
        profile: {
          title: formData.title,
          bio: formData.bio,
          profilePic: profilePicUrl,
        },
      };

      const updatedClientProfile = {
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        industry: formData.industry,
        description: formData.description,
        hiringBudget: formData.hiringBudget,
      };

      const updatedFreelancerProfile = {
        skills: formData.skills,
        hourlyRate: formData.hourlyRate,
        experience: formData.experience,
        portfolioLinks: formData.portfolioLinks,
        availability: formData.availability,
      };

      if (userRole === "client") {
        const res = await updateMyProfile(updatedProfile);
        const res2 = await updateClientProfile(updatedClientProfile);
        setUser({ ...res.data.updatedUser, ...res2.data.client });
      } else if (userRole === "freelancer") {
        const res = await updateMyProfile(updatedProfile);
        const res2 = await updateFreelancerProfile(updatedFreelancerProfile);
        console.log(res2.data);
        setUser({ ...res.data.updatedUser, ...res2.data.freelancer });
      }
      // Update state
      setOpen(false);
      setPreviewImage(null);
    } catch (err) {
      toast.error("Profile update failed:", err.response.data.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mx-auto">
          My Profile
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        {/* CENTER - PROFILE PIC */}
        <div>
          <img
            src={
              previewImage ||
              user.profile?.profilePic ||
              "https://via.placeholder.com/150"
            }
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300"
          />
        </div>

        <div className="flex mt-5">
          {/* LEFT - QUICK INFO */}
          <div className="bg-white border rounded-xl shadow p-6 m-1">
            <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Title:</span>{" "}
                {user.profile?.title || "—"}
              </p>
              <p className="text-sm text-gray-600">
                {user.profile?.bio || "No bio yet."}
              </p>
            </div>
          </div>

          {/* RIGHT - BUSINESS INFO */}
          {userRole === "client" && (
            <div className="bg-white border rounded-xl shadow p-6 m-1">
              <h2 className="text-xl font-semibold mb-4">
                Business Information
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {user.clientProfile?.companyName}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  {user.clientProfile?.companyWebsite}
                </p>
                <p>
                  <span className="font-medium">Industry:</span>{" "}
                  {user.clientProfile?.industry}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Description:</span>{" "}
                  {user.clientProfile?.description}
                </p>
                <p>
                  <span className="font-medium">Budget:</span>{" "}
                  {user.clientProfile?.hiringBudget}
                </p>
              </div>
            </div>
          )}
          {userRole === "freelancer" && (
            <div className="bg-white border rounded-xl shadow p-6 m-1 w-full">
              <h2 className="text-xl font-semibold mb-4">
                Freelancer Information
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Skills:</span>{" "}
                  {user.freelancerProfile?.skills?.length
                    ? user.freelancerProfile.skills.join(", ")
                    : "—"}
                </p>
                <p>
                  <span className="font-medium">Hourly Rate:</span>{" "}
                  {user.freelancerProfile?.hourlyRate
                    ? `₹${user.freelancerProfile.hourlyRate}/hr`
                    : "—"}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {user.freelancerProfile?.experience || "—"}
                </p>
                <p>
                  <span className="font-medium">Portfolio Links:</span>{" "}
                  {user.freelancerProfile?.portfolioLinks?.length
                    ? user.freelancerProfile.portfolioLinks.join(", ")
                    : "—"}
                </p>
                <p>
                  <span className="font-medium">Availability:</span>{" "}
                  {user.freelancerProfile?.availability || "—"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <EditProfileForm
          userRole={userRole}
          formData={formData}
          setFormData={setFormData}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSave={handleSave}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Profile;
