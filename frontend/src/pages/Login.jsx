import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold">Login to see more</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 float-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="css-for-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 float-left">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="css-for-input pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 pt-5 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="commom-btn">
            Log in
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span>
            Not on Pinterest yet?{" "}
            <Link to="/register" className="hover:text-blue-600 hover:underline">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
