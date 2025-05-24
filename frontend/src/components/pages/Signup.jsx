import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import {useThemeColors} from "../../utils/hooks/useThemeColors";


const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
    githubUsername: "",
    leetcodeUsername: "",
  });
 const { primary, background } = useThemeColors();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setPasswordMismatch(false);

    const { name, email, password, githubUsername, leetcodeUsername } = signupCredentials;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "/api/users/register",
        { name, email, password, githubUsername, leetcodeUsername },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      setErrorMessage(`${error?.response?.data?.message || "Signup failed"}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left branding panel */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-[#222] p-10"
      style={{backgroundColor : background}}>
        <h1 className="text-4xl font-bold mb-4">Welcome to HustleMap</h1>
        <p className="text-center max-w-sm text-lg font-light">
          Visualize your hustle. Track your growth. Share your journey.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 space-y-6 border border-[#F1EEE7]"
        >
          <h2 className="text-2xl font-bold text-center text-[#129990]">Create Your Account</h2>

          {errorMessage && (
            <div className="text-red-600 text-sm text-center">{errorMessage}</div>
          )}
          {passwordMismatch && (
            <div className="text-red-500 text-sm text-center">Passwords do not match</div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {[
              { label: "Full Name", name: "name", placeholder: "Jane Doe" },
              { label: "GitHub Username", name: "githubUsername", placeholder: "e.g., janedoe" },
              { label: "LeetCode Username", name: "leetcodeUsername", placeholder: "e.g., jane123" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, name, type = "text", placeholder }) => (
              <div key={name}>
                <label className="block text-sm text-gray-800 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={signupCredentials[name]}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#129990]"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-gray-800 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#129990]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#129990] hover:bg-[#85d539] text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#129990] hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
