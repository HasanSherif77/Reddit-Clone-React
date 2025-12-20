// src/Components/EditProfile/ProfileSettings.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Import modals
import {
  EditAvatarModal,
  EditDisplayNameModal,
  EditBioModal
} from "./Modals";
// Import components
import SettingRow from "./SettingRow";
import ToggleSwitch from "./ToggleSwitch";
import "./Settings.css";

const ProfileSettings = () => {
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Auto-open avatar modal if navigating from /edit-avatar
  useEffect(() => {
    if (location.pathname === "/edit-avatar") {
      setActiveModal('avatar');
    }
  }, [location.pathname]);
  
  const [userData, setUserData] = useState({
    displayName: "",
    bio: "",
    avatar: null,
    avatarUrl: null,
    isMature: false
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            displayName: data.displayname || data.displayName || "",
            bio: data.description || data.bio || "",
            avatar: data.avatarUrl || data.avatar || null,
            avatarUrl: data.avatarUrl || data.avatar || null,
            isMature: data.isMature || false,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const openDisplayNameModal = () => {
    console.log("Opening display name modal");
    setActiveModal('displayName');
  };

  const openBioModal = () => {
    console.log("Opening bio modal");
    setActiveModal('bio');
  };

  const openAvatarModal = () => {
    console.log("Opening avatar modal");
    setActiveModal('avatar');
  };

  const closeModal = () => {
    console.log("Closing modal");
    setActiveModal(null);
  };

  // Save display name
  const handleSaveDisplayName = async (newDisplayName) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayname: newDisplayName }),
      });

      if (response.ok) {
        setUserData((prev) => ({ ...prev, displayName: newDisplayName }));
        // Trigger event to refresh TopBar
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        const error = await response.json();
        console.error("Failed to update display name:", error);
        alert("Failed to update display name. Please try again.");
      }
    } catch (error) {
      console.error("Error updating display name:", error);
      alert("Error updating display name. Please try again.");
    }
  };

  // Save bio
  const handleSaveBio = async (newBio) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: newBio }),
      });

      if (response.ok) {
        setUserData((prev) => ({ ...prev, bio: newBio }));
      } else {
        const error = await response.json();
        console.error("Failed to update bio:", error);
        alert("Failed to update bio. Please try again.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("Error updating bio. Please try again.");
    }
  };

  // Save avatar
  const handleSaveAvatar = async (newAvatarUrl) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatarUrl: newAvatarUrl }),
      });

      if (response.ok) {
        setUserData((prev) => ({ 
          ...prev, 
          avatar: newAvatarUrl,
          avatarUrl: newAvatarUrl 
        }));
        // Trigger event to refresh TopBar
        window.dispatchEvent(new Event('avatarUpdated'));
      } else {
        const error = await response.json();
        console.error("Failed to update avatar:", error);
        alert("Failed to update avatar. Please try again.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Error updating avatar. Please try again.");
    }
  };

  return (
    <div className="profile-settings">
      
      <EditDisplayNameModal
        isOpen={activeModal === 'displayName'}
        onClose={closeModal}
        currentName={userData.displayName}
        onSave={handleSaveDisplayName}
      />
      
      <EditBioModal
        isOpen={activeModal === 'bio'}
        onClose={closeModal}
        currentBio={userData.bio}
        onSave={handleSaveBio}
      />
      
      <EditAvatarModal
        isOpen={activeModal === 'avatar'}
        onClose={closeModal}
        currentAvatar={userData.avatar || userData.avatarUrl}
        onSave={handleSaveAvatar}
      />

      <section className="settings-section">
        <div className="section-label">GENERAL</div>

        <div className="settings-card">
          <SettingRow
            title="Display name"
            description="Changing your display name won't change your username."
            onClick={openDisplayNameModal}
          />

          <SettingRow
            title="About description"
            description="A short description that appears on your profile."
            onClick={openBioModal}
          />

          <SettingRow
            title="Avatar"
            description="Edit your avatar or upload an image."
            onClick={openAvatarModal}
          />

          <SettingRow
            title="Banner"
            description="Upload a profile background image."
          />

          <SettingRow
            title="Social links"
            description="Add links to your social media accounts."
          />

          <div className="setting-row no-arrow">
            <div className="setting-row-text">
              <div className="setting-row-title">Mark as mature (18+)</div>
              <div className="setting-row-description">
                Label your profile as Not Safe for Work (NSFW) and ensure it's inaccessible to people under 18.
              </div>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-subtitle">Curate your profile</h2>
        <div className="settings-card">
          <SettingRow
            title="Content and activity"
            description="Posts, comments, and communities you're active in."
          />
          <SettingRow
            title="Profile visibility"
            description="Control who can see your profile content."
          />
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-subtitle">Advanced</h2>
        <div className="settings-card">
          <SettingRow
            title="Profile moderation tools"
            description="Access tools to help you moderate your profile."
          />
        </div>
      </section>

    </div>
  );
};

export default ProfileSettings;