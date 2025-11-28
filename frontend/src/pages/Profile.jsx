import React, { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../services/userServices";
import { updateClientProfile } from "../services/clientServices";
import Modal from "../components/Modal";
import EditProfileForm from "../components/EditClientProfileForm";
import { uploadProfilePic } from "../services/uploadServices";

function Profile() {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

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
  });

  // LOAD USER INFO
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getMyProfile();
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          title: res.data.profile?.title || "",
          bio: res.data.profile?.bio || "",
          profilePic: res.data.profile?.profilePic || "",
          companyName: res.data.clientProfile?.companyName || "",
          companyWebsite: res.data.clientProfile?.companyWebsite || "",
          industry: res.data.clientProfile?.industry || "",
          description: res.data.clientProfile?.description || "",
          hiringBudget: res.data.clientProfile?.hiringBudget || 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

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
        console.log("Image upload failed:", err);
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
      // Save profile data
      const res = await updateMyProfile(updatedProfile);
      const res2 = await updateClientProfile(updatedClientProfile);

      console.log(res.data);
      console.log(res2.data);
      // Update state
      setUser({ ...res.data.updatedUser, ...res2.data.client });
      setOpen(false);
      setPreviewImage(null);
    } catch (err) {
      console.log("Profile update failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT - QUICK INFO */}
        <div className="bg-white border rounded-xl shadow p-6">
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

        {/* CENTER - PROFILE PIC */}
        <div className="bg-white border rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={
              previewImage ||
              user.profile?.profilePic ||
              "https://via.placeholder.com/150"
            }
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-300"
          />
          <button
            onClick={() => setOpen(true)}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Edit Profile
          </button>
        </div>

        {/* RIGHT - BUSINESS INFO */}
        <div className="bg-white border rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
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
      </div>

      {/* EDIT MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <EditProfileForm
          formData={formData}
          setFormData={setFormData}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSave={handleSave}
        />
      </Modal>
    </div>
  );
}

export default Profile;
