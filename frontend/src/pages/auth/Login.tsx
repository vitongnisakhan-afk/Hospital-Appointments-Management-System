import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
hjkhkjhjkklhjkjhljkhhkh
import "./Login.css";

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL || "https://localhost:7001/api"}/auth/login`,
        {
          email,
          password,
        }
      );

      const { accessToken, user } = response.data;

      if (rememberMe) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("authUser", JSON.stringify(user));
      }

      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Invalid email or password. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Section */}
        <div className="login-banner">
          <div className="banner-logo">
            <HeartPulse size={35} />
            <span>MediCare</span>
          </div>

          <div className="banner-content">
            <div className="banner-icon">
              <Stethoscope size={55} />
            </div>

            <h1>
              Your Health,
              <br />
              Our Priority.
            </h1>

            <p>
              Manage your healthcare appointments easily.
              Connect with doctors and receive quality care
              whenever you need it.
            </p>
          </div>

          <div className="banner-footer">
            © 2026 MediCare Hospital Management System
          </div>
        </div>

        {/* Right Section */}
        <div className="login-form-section">
          <div className="login-form-wrapper">

            <div className="mobile-logo">
              <HeartPulse size={30} />
              <span>MediCare</span>
            </div>

            <div className="form-heading">
              <span className="welcome-label">WELCOME BACK</span>
              <h2>Sign In</h2>
              <p>Please enter your account details to continue.</p>
            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <div className="input-wrapper">
                  <Mail size={19} />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="input-wrapper">
                  <Lock size={19} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="login-options">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>

                <a href="/forgot-password">
                  Forgot Password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="login-error" role="alert">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>

            <div className="login-divider">
              <span>SECURE HEALTHCARE ACCESS</span>
            </div>

            <p className="login-footer">
              Don't have an account?{" "}
              <a href="/register">Contact Administrator</a>
            </p>

            <p className="khmer-footer">
              ប្រព័ន្ធគ្រប់គ្រងការណាត់ជួបមន្ទីរពេទ្យ
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}