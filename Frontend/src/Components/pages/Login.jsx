import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

console.log("Login component is being loaded");

const Login = () => {
  console.log("Login component mounted");  
  const [loginCredentials, setLoginCredentials] = useState({email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
  
    try {
      await axios.post("http://localhost:5000/api/users/login", 
        loginCredentials,
        { withCredentials: true }
      );
      navigate("/profile");
    } catch (err) {
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }    
  

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
              name="email"
              placeholder="Enter your email" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginCredentials.email} 
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              name ="password"
              placeholder="Enter your password" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginCredentials.password} 
              onChange={handleChange}
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
        <p className="text-gray-600 text-sm mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
