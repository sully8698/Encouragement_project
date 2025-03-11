import React, { useState, useEffect } from 'react';
import { resetPasswordConfirm } from '../api/authApi';
import { useParams, useNavigate } from 'react-router-dom';

export default function PasswordReset(){
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
        if (!uidb64 || !token) {
            setError('Invalid reset link');
            return;
          }
    }, [uidb64, token]);
  
    const handlePasswordReset = async (e) => {
      e.preventDefault();
      
      if (password !== confirmPassword) {
          setError("Passwords don't match!");
          return;
      }
  
      const response = await resetPasswordConfirm(uidb64, token, password, confirmPassword);
  
      if (!response.success) {
          setError(response.error);  // Display the error returned by the backend
      } else {
          setSuccess("Password has been reset.");
          navigate("/login");
      }
  };
  
    return (
      <div>
        <h1>Reset Your Password</h1>
        <form onSubmit={handlePasswordReset}>
          <input
            type="password"
            id='password'
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            id='confirmPassword'
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    );
}