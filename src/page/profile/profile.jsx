import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  AiOutlineUser, 
  AiOutlineMail, 
  AiOutlineLock, 
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowLeft
} from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import './profile.css';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [usernameForm, setUsernameForm] = useState({
    currentUsername: '',
    newUsername: ''
  });
  const [emailForm, setEmailForm] = useState({
    currentEmail: '',
    newEmail: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // UI states
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Message states
  const [messages, setMessages] = useState({
    username: { type: '', text: '' },
    email: { type: '', text: '' },
    password: { type: '', text: '' },
    general: { type: '', text: '' }
  });

  // Check authentication on component mount
  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    if (loginStatus === "true" && user?.name) {
      setIsLoggedIn(true);
      // Initialize form with current user data
      setUsernameForm({
        currentUsername: user.name,
        newUsername: user.name
      });
      setEmailForm({
        currentEmail: user.email,
        newEmail: user.email
      });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Clear messages after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages({
        username: { type: '', text: '' },
        email: { type: '', text: '' },
        password: { type: '', text: '' },
        general: { type: '', text: '' }
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [messages]);

  const showMessage = (field, type, text) => {
    setMessages(prev => ({
      ...prev,
      [field]: { type, text }
    }));
  };

  // Username validation
  const validateUsername = (username) => {
    if (!username.trim()) {
      return "Username cannot be empty";
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long";
    }
    if (username.length > 20) {
      return "Username must be less than 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "Username can only contain letters, numbers, and underscores";
    }
    return null;
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    return null;
  };

  // Check if username exists (simulate API call)
  const checkUsernameExists = (username) => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    return registeredUser && registeredUser.name === username;
  };

  // Check if email exists (simulate API call)
  const checkEmailExists = (email) => {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    return registeredUser && registeredUser.email === email;
  };

  // Update username
  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validationError = validateUsername(usernameForm.newUsername);
      if (validationError) {
        showMessage('username', 'error', validationError);
        return;
      }

      // Check if username is different
      if (usernameForm.newUsername === usernameForm.currentUsername) {
        showMessage('username', 'info', 'Username is already set to this value');
        return;
      }

      // Check if username already exists
      if (checkUsernameExists(usernameForm.newUsername)) {
        showMessage('username', 'error', 'Username already exists. Please choose a different one.');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      const updatedUser = { ...user, name: usernameForm.newUsername };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update registered user data
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (registeredUser) {
        registeredUser.name = usernameForm.newUsername;
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
      }

      setUsernameForm(prev => ({
        currentUsername: usernameForm.newUsername,
        newUsername: usernameForm.newUsername
      }));

      showMessage('username', 'success', 'Username updated successfully!');
    } catch (error) {
      showMessage('username', 'error', 'Failed to update username. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validationError = validateEmail(emailForm.newEmail);
      if (validationError) {
        showMessage('email', 'error', validationError);
        return;
      }

      // Check if email is different
      if (emailForm.newEmail === emailForm.currentEmail) {
        showMessage('email', 'info', 'Email is already set to this value');
        return;
      }

      // Check if email already exists
      if (checkEmailExists(emailForm.newEmail)) {
        showMessage('email', 'error', 'Email already exists. Please use a different email address.');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user data
      const updatedUser = { ...user, email: emailForm.newEmail };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update registered user data
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (registeredUser) {
        registeredUser.email = emailForm.newEmail;
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
      }

      setEmailForm(prev => ({
        currentEmail: emailForm.newEmail,
        newEmail: emailForm.newEmail
      }));

      showMessage('email', 'success', 'Email updated successfully!');
    } catch (error) {
      showMessage('email', 'error', 'Failed to update email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify current password
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (!registeredUser || registeredUser.password !== passwordForm.currentPassword) {
        showMessage('password', 'error', 'Current password is incorrect');
        return;
      }

      // Validate new password
      const validationError = validatePassword(passwordForm.newPassword);
      if (validationError) {
        showMessage('password', 'error', validationError);
        return;
      }

      // Check if passwords match
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        showMessage('password', 'error', 'New passwords do not match');
        return;
      }

      // Check if new password is same as current
      if (passwordForm.newPassword === passwordForm.currentPassword) {
        showMessage('password', 'error', 'New password must be different from current password');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update password in registered user data
      if (registeredUser) {
        registeredUser.password = passwordForm.newPassword;
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
      }

      // Reset password form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordFields(false);

      showMessage('password', 'success', 'Password updated successfully!');
    } catch (error) {
      showMessage('password', 'error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear all user data
      localStorage.removeItem("user");
      localStorage.removeItem("login");
      localStorage.removeItem("registeredUser");
      localStorage.removeItem("cart");
      localStorage.removeItem("product");

      setUser({});
      setShowDeleteConfirm(false);
      
      showMessage('general', 'success', 'Account deleted successfully. Redirecting to home...');
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      showMessage('general', 'error', 'Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Message component
  const Message = ({ type, text }) => {
    if (!text) return null;
    
    const icon = type === 'success' ? <AiOutlineCheckCircle /> : <AiOutlineExclamationCircle />;
    const className = `message message-${type}`;
    
    return (
      <div className={className}>
        {icon}
        <span>{text}</span>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-auth-required">
        <div className="auth-message-content">
          <AiOutlineLock size={48} className="auth-icon" />
          <h2>Authentication Required</h2>
          <p>Please log in to access your profile</p>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header */}
        <div className="profile-header">
          <button className="back-button" onClick={() => navigate("/")}>
            <AiOutlineArrowLeft size={20} />
            Back to Home
          </button>
          <h1 className="profile-title">Profile Settings</h1>
          <p className="profile-subtitle">Manage your account information and preferences</p>
        </div>

        {/* General Messages */}
        <Message type={messages.general.type} text={messages.general.text} />

        <div className="profile-content">
          {/* Username Section */}
          <div className="profile-section">
            <div className="section-header">
              <div className="section-icon">
                <AiOutlineUser size={24} />
              </div>
              <div className="section-info">
                <h2 className="section-title">Username</h2>
                <p className="section-description">Update your display name</p>
              </div>
            </div>
            
            <form onSubmit={handleUsernameUpdate} className="section-form">
              <div className="form-group">
                <label htmlFor="newUsername">New Username</label>
                <input
                  type="text"
                  id="newUsername"
                  value={usernameForm.newUsername}
                  onChange={(e) => setUsernameForm(prev => ({ ...prev, newUsername: e.target.value }))}
                  className="input"
                  placeholder="Enter new username"
                  disabled={loading}
                />
              </div>
              
              <Message type={messages.username.type} text={messages.username.text} />
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || usernameForm.newUsername === usernameForm.currentUsername}
              >
                {loading ? 'Updating...' : 'Update Username'}
              </button>
            </form>
          </div>

          {/* Email Section */}
          <div className="profile-section">
            <div className="section-header">
              <div className="section-icon">
                <AiOutlineMail size={24} />
              </div>
              <div className="section-info">
                <h2 className="section-title">Email Address</h2>
                <p className="section-description">Update your email address</p>
              </div>
            </div>
            
            <form onSubmit={handleEmailUpdate} className="section-form">
              <div className="form-group">
                <label htmlFor="newEmail">New Email</label>
                <input
                  type="email"
                  id="newEmail"
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, newEmail: e.target.value }))}
                  className="input"
                  placeholder="Enter new email"
                  disabled={loading}
                />
              </div>
              
              <Message type={messages.email.type} text={messages.email.text} />
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || emailForm.newEmail === emailForm.currentEmail}
              >
                {loading ? 'Updating...' : 'Update Email'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="profile-section">
            <div className="section-header">
              <div className="section-icon">
                <AiOutlineLock size={24} />
              </div>
              <div className="section-info">
                <h2 className="section-title">Password</h2>
                <p className="section-description">Change your password</p>
              </div>
            </div>
            
            {!showPasswordFields ? (
              <button 
                className="btn btn-outline"
                onClick={() => setShowPasswordFields(true)}
                disabled={loading}
              >
                Change Password
              </button>
            ) : (
              <form onSubmit={handlePasswordUpdate} className="section-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="password-input">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      id="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="input"
                      placeholder="Enter current password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="password-input">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="input"
                      placeholder="Enter new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="input"
                      placeholder="Confirm new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </div>
                
                <Message type={messages.password.type} text={messages.password.text} />
                
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-ghost"
                    onClick={() => {
                      setShowPasswordFields(false);
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setMessages(prev => ({ ...prev, password: { type: '', text: '' } }));
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Delete Account Section */}
          <div className="profile-section profile-section-danger">
            <div className="section-header">
              <div className="section-icon section-icon-danger">
                <MdDelete size={24} />
              </div>
              <div className="section-info">
                <h2 className="section-title">Delete Account</h2>
                <p className="section-description">Permanently delete your account and all associated data</p>
              </div>
            </div>
            
            <div className="section-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Account</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.</p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button 
                className="btn btn-ghost"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;