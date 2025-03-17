import { resetPassword } from "../api/authApi";
import { useState } from "react";

export default function RequestReset() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleReset = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(null); // Reset previous error message
        setSuccess(null); // Reset previous success message

        try {
            const response = await resetPassword(email); // Call API with email
            
            // Handle response from the resetPassword function
            if (response.success) {
                setSuccess("Password reset link sent to your email.");
            } else {
                setError(response.error || "Password reset failed. Please try again.");
            }
        } catch (err) {
            console.error("Error in password reset process:", err); // Log the error for debugging
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <form action="" onSubmit={handleReset}>
                <h2>Input email address associated with account</h2>
                <button type="submit">Submit</button>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />
            </form>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        </div>
    );
}