import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

console.log("Login component is being loaded");

const Login = () => {
  console.log("Login component mounted");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserNotFound(false);
    setErrorMessage("");
    setLoading(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" 
      });
      console.log("Response received from server:", response);
      if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
          setUserNotFound(true);
          return;
        }
        setErrorMessage(data.message || "Login failed");
        return;
      }
      navigate("/timeline");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {userNotFound && (
          <p className="text-red-500 text-sm mt-2 mb-2">
            User not found. <Link to="/Signup" className="text-blue-500">Sign up! here</Link>
          </p>
        )}
        <p className="text-gray-600 text-sm mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
