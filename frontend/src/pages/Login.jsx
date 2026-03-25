import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import AuthImagePattern from "../component/AuthImagePattern.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Email is invalid");
    }
    if (!formData.password) return toast.error("Password is required");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success) {
      await login(formData);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(135deg,_#cad2c5_0%,_#e0e1dd_30%,_#c6ac8f_100%)] text-[#0d1b2a] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="relative flex items-center justify-center overflow-hidden px-6 py-10 sm:px-10 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(129,178,154,0.5),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(76,149,108,0.22),_transparent_36%),radial-gradient(circle_at_center_right,_rgba(198,172,143,0.28),_transparent_28%)]" />

        <div className="relative z-10 w-full max-w-xl">
          <div className="rounded-[32px] border border-[#cad2c5] bg-[#e0e1dd]/88 p-6 shadow-[0_30px_80px_rgba(13,27,42,0.16)] backdrop-blur-xl sm:p-8">
            <div className="mb-8 flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-full bg-[#0d1b2a] px-4 py-2 text-sm font-semibold text-[#e0e1dd] transition-transform hover:-translate-y-0.5"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#c6ac8f,_#81b29a)] text-[#0d1b2a] shadow-[0_10px_24px_rgba(129,178,154,0.28)]">
                  <MessageSquare className="size-4" />
                </span>
                AexaConnect
              </Link>

              <div className="rounded-full border border-[#81b29a] bg-[#cad2c5] px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-[#4c956c]">
                Login
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-[#0d1b2a]">
                Welcome back
              </h1>
              <p className="max-w-md text-sm leading-7 text-[#3d405b] sm:text-base">
                Step into your conversations, pick up where you left off, and
                keep the momentum going.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-[#1b263b]">
              <span className="rounded-full border border-[#81b29a] bg-[#cad2c5] px-3 py-1.5 text-[#4c956c]">
                Fast sign in
              </span>
              <span className="rounded-full border border-[#5b8e7d] bg-[#81b29a]/20 px-3 py-1.5 text-[#3d405b]">
                Secure session
              </span>
              <span className="rounded-full border border-[#c6ac8f] bg-[#f4e285] px-3 py-1.5 text-[#3d405b]">
                Real-time chat ready
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1b263b]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#5b8e7d]" />
                  <input
                    type="email"
                    className="h-14 w-full rounded-2xl border border-[#cad2c5] bg-[#e0e1dd] pl-12 pr-4 text-[#0d1b2a] outline-none transition focus:border-[#81b29a] focus:ring-4 focus:ring-[#cad2c5]"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1b263b]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#5b8e7d]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="h-14 w-full rounded-2xl border border-[#cad2c5] bg-[#e0e1dd] pl-12 pr-14 text-[#0d1b2a] outline-none transition focus:border-[#81b29a] focus:ring-4 focus:ring-[#cad2c5]"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5b8e7d] transition hover:text-[#3d405b]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,_#3d405b,_#4c956c)] text-sm font-semibold text-[#e0e1dd] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-[#cad2c5] bg-[#cad2c5]/70 px-4 py-4 text-sm text-[#3d405b]">
              New here?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#4c956c] underline decoration-[#c6ac8f] underline-offset-4"
              >
                Create your account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Everything important stays in motion."
        subtitle="From quick check-ins to deeper conversations, AexaConnect keeps your communication clear, fast, and beautifully organized."
      />
    </div>
  );
};

export default Login;
