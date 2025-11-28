import React from "react";

function EditProfileForm({
  formData,
  previewImage,
  setPreviewImage,
  handleChange,
  handleImageChange,
  handleSave,
  onClose,
}) {
  const handleCancel = () => {
    setPreviewImage(null);
    onClose();
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Edit Profile</h2>
      <div>
        <div className="my-1">
          <label className="font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block mt-1"
          />
          {previewImage && (
            <img
              src={previewImage}
              className="w-24 h-24 rounded-full mt-2 border"
            />
          )}
        </div>
        {/* LEFT - Personal Info */}
        <div className="space-y-4">
          <div>
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 border bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT - Business Info */}
        <div className="space-y-4">
          <div>
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Company Website</label>
            <input
              type="text"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              rows="10"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Hiring Budget (INR)</label>
            <input
              type="number"
              name="hiringBudget"
              value={formData.hiringBudget}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={handleCancel} className="px-4 py-2 border rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfileForm;
