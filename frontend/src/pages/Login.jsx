import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { UserData } from "../context/UserContext";
import { PinData } from "../context/PinContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const {fetchPins} = PinData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPins);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-2">
          <img
            src="https://s.pinimg.com/webapp/logo_transparent_144x144-3da7a67b.png"
            className="h-18"
            alt="Pinterest Logo"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Login to see more</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-5 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="commom-btn">
            {btnLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="my-6 text-center text-sm text-gray-500">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative inline-block px-4 bg-white text-gray-500">
              OR
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="w-12 h-12 flex justify-center items-center border rounded-md shadow-md 
          transition-all duration-400 text-red-600 border-red-500 hover:bg-red-500 hover:text-white">
            <FaGoogle size={24} />
          </button>

          <button className="w-12 h-12 flex justify-center items-center border rounded-md shadow-md 
          transition-all duration-400 text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white">
            <FaFacebook size={24} />
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <span>
            By continuing, you agree to Pinterest's{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and acknowledge you've read our{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </div>

        <div className="mt-4 text-center text-sm">
          <span>
            Not on Pinterest yet?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
