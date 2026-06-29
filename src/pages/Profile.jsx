import { useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { MOCK_ORDERS } from "../data/products";
import "./Profile.css";

const Profile = () => {
  const { user, isLoggedIn, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h1>👤 Please Login First</h1>
          <p>You need to be logged in to view your profile</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
            style={{ marginTop: "20px" }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-info-header">
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
          <button
            className={`tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 Orders
          </button>
          <button
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="tab-content profile-tab">
            <div className="profile-card">
              <div className="card-header">
                <h2>Personal Information</h2>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  {isEditingProfile ? "Cancel" : "Edit"}
                </button>
              </div>

              {!isEditingProfile ? (
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Name</label>
                    <p>{user?.name}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{user?.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <p>{user?.phone || "Not provided"}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="tab-content orders-tab">
            <div className="profile-card">
              <h2>Order History</h2>
              {MOCK_ORDERS.length > 0 ? (
                <div className="orders-list">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <h4>{order.id}</h4>
                          <p>{order.date}</p>
                        </div>
                        <div className={`status ${order.status.toLowerCase()}`}>
                          {order.status}
                        </div>
                      </div>
                      <div className="order-card-items">
                        {order.items.map((item, idx) => (
                          <p key={idx}>
                            {item.name} x {item.quantity}
                          </p>
                        ))}
                      </div>
                      <div className="order-card-total">
                        ₹{order.total.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-message">No orders yet</p>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="tab-content settings-tab">
            <div className="profile-card">
              <h2>Account Settings</h2>
              <div className="settings-options">
                <div className="setting-item">
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your password regularly for security</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">Change</button>
                </div>
                <div className="setting-item">
                  <div>
                    <h4>Notifications</h4>
                    <p>Manage email and SMS notifications</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-item">
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">Enable</button>
                </div>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button
                  className="btn btn-outline logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
