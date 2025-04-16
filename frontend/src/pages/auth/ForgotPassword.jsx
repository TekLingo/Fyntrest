import React, { useState, useEffect } from "react";
import LogoImg from "../../assets/Images/color-logo.png";
import { useNavigate } from "react-router-dom";

const ForgotResetPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("forgot"); // 'forgot' or 'reset'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add email validation or API call here
    if (email) setStep("reset");
  };

  const handleLogin = () => {
    console.log("Navigating to login...");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const validatePassword = (value) => {
    const hasCapital = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*\-+/=]/.test(value);
    const minLength = value.length >= 8;
    const notRepetitive = !/(.)\1{2,}/.test(value); // No 111 or aaa
    const notSequential = !/123|234|345|456|567|678|789|012/.test(value); // No simple sequences

    if (
      !minLength ||
      !hasCapital ||
      !hasNumber ||
      !hasSpecial ||
      !notRepetitive ||
      !notSequential
    ) {
      setPasswordError(
        "Minimum 8 characters must include at least one capital letter, number, and special character (eg -!@#$%^&*-+/=).",
        "Don't use consecutive or repetitive sequence (eg. 111 or 123)"
      );
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    console.log("Navigate is:", navigate);
  }, []);

  return (
    <div className="min-h-screen bg-primary-b flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={LogoImg} alt="logo" className="w-auto h-24" />
        </div>

        {step === "forgot" ? (
          <form onSubmit={handleEmailSubmit} className=" p-6">
            <h2 className="text-text-g text-2xl text-center mb-2 font-title">
              Forgot Password
            </h2>
            <p className="text-center text-sm text-gray-300 mb-6">
              Enter your registered email address we'll send you the email to
              reset your password
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 rounded bg-secondary-lt text-black focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-md text-md bg-secondary-l hover:bg-secondary-d transition-colors text-white"
              >
                Verify
              </button>
            </div>
            <p className="text-center text-sm text-gray-300 mt-4">
              Already have an account?
              <span className="text-secondary-lt cursor-pointer"> Login!</span>
            </p>
          </form>
        ) : (
          <form className=" p-6">
            <h2 className="text-white text-2xl font-bold text-center mb-6">
              Reset Password
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  className={`w-full mt-1 p-2 rounded focus:outline-none ${
                    passwordError ? "border border-red-500" : ""
                  } bg-secondary-lt text-black`}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              )}
              <div>
                <label className="text-sm text-gray-300 mt-4 block">
                  Re-enter Password
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 rounded bg-secondary-lt text-black focus:outline-none"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-md text-md bg-secondary-l hover:bg-secondary-d transition-colors text-black"
                disabled={
                  passwordError !== "" || !password || password !== rePassword
                }
              >
                Reset
              </button>
            </div>

            <p className="text-center text-base text-gray-300 mt-6">
              Already have an account?
              <span
                className="text-secondary-lt cursor-pointer select-none focus:outline-none"
                onClick={handleLogin}
              >
                Login!
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotResetPassword;
