"use client";
import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const AdminSettings = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const [appInfo, setAppInfo] = useState({
    supportEmail: "",
    websiteUrl: "",
    privacyPolicy: "",
  });

  const [contentSecurity, setContentSecurity] = useState(true);

  const handleSocialChange = (key, value) => {
    setSocialLinks((prev) => ({ ...prev, [key]: value }));
  };

  const handleAppInfoChange = (key, value) => {
    setAppInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = (group, key) => {
    if (group === "social") {
      setSocialLinks((prev) => ({ ...prev, [key]: "" }));
    } else {
      setAppInfo((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSave = () => {
    console.log("Saving settings...", { socialLinks, appInfo, contentSecurity });
    alert("Changes saved successfully.");
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Setting</h1>
        <button
          className="bg-[#7D287E] text-white px-5 py-2 rounded-md hover:opacity-90"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Social Information</h2>
          {Object.entries(socialLinks).map(([key, value]) => (
            <div key={key} className="relative mb-4">
              <label className="block text-sm mb-1 capitalize">{key}</label>
              <input
                type="text"
                value={value}
                placeholder={
                  key === "facebook"
                    ? "Facebook.com/your-id-link"
                    : key === "youtube"
                    ? "youtube.com/yourchannel-link-here"
                    : "instagram.com/your-insta-id-linkhere"
                }
                onChange={(e) => handleSocialChange(key, e.target.value)}
                className="w-full bg-gray-200 px-4 py-2 rounded-md text-sm outline-none pr-10"
              />
              <button
                onClick={() => handleClear("social", key)}
                className="absolute right-2 top-7 text-gray-500 cursor-pointer"
              >
                <IoIosClose size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-4">App Information</h2>
          {Object.entries(appInfo).map(([key, value]) => (
            <div key={key} className="relative mb-4">
              <label className="block text-sm mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                value={value}
                placeholder="youremail@email.com"
                onChange={(e) => handleAppInfoChange(key, e.target.value)}
                className="w-full bg-gray-200 px-4 py-2 rounded-md text-sm outline-none pr-10"
              />
              <button
                onClick={() => handleClear("app", key)}
                className="absolute right-2 top-7 text-gray-500 cursor-pointer"
              >
                <IoIosClose size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 mt-6">
        <h2 className="font-semibold mb-2 text-[24px] ">Other Tabs</h2>
        <div className="flex justify-between items-center pt-4">
          <div>
            <p className="font-medium text-sm">
              Content security <span className="text-gray-500 text-xs">(Disable screenshot and screen recording)</span>
            </p>
            <p className="text-sm mt-1 text-gray-600">{contentSecurity ? "Enabled" : "Disabled"}</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={contentSecurity}
                onChange={() => setContentSecurity(!contentSecurity)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full transition ${
                contentSecurity ? "bg-[#7D287E]" : "bg-gray-300"
              }`}></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  contentSecurity ? "translate-x-full" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;
