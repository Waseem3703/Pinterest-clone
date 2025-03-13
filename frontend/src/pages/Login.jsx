import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {loginUser, btnLoading} = UserData();
  const navigate = useNavigate();
   
   const submitHandler = e => {
    e.preventDefault();
    loginUser(email, password, navigate);
   }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold">Login to see more</h2>
        <form onSubmit={submitHandler}>
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

        <div className="mt-6 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t justify-center border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">OR</span>
              </div>
            </div>
            </div>

        <button type="submit" className="commom-btn-social-login">
            Continue With Google
          </button>
          <button type="submit" className="commom-btn-social-login">
            Continue With Facebook
          </button>
          <div className="mt-4 text-center text-[12px] text-gray-500">
          <span>
          By continuing, you agree to Pinterest's {" "}
          <Link to="/register" className="disclaimer">
          Terms of Service {" "}
            </Link> and acknowledge you've 
          read our  {" "}
          <Link to="/register" className="disclaimer">
          Privacy Policy{" "}
            </Link>.{" "}
            <Link to="/register" className="disclaimer">
            Notice at collection
            </Link> 
            
          </span>
          </div>
          <div className="mt-4 text-center text-sm">
          <span>
            Not on Pinterest yet?{" "}
            <Link to="/register" className="hover:text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );

}
export default Login;
