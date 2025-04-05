import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setPasswordMismatch(false);

  
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message || "Signup failed");
        return;
      }
      
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        {passwordMismatch && <p className="text-red-500 text-sm mb-2">Passwords do not match</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Re-enter your password" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
