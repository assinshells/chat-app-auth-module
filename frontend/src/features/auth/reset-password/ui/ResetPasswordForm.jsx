import { useState } from "react";
import { useResetPasswordStore } from "@features/auth/reset-password/model/useResetPasswordStore.js";

export function ResetPasswordForm({ verifiedToken, onSuccess, onBack }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, reset, clearError } = useResetPasswordStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    reset({ verifiedToken, password, confirmPassword }, onSuccess);
  };

  return (
    <>
      {error && <p className="text-danger text-center mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            id="floatingPasswordInput"
            type="password"
            className="form-control"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPasswordInput">New Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            id="floatingConfirmPasswordInput"
            type="password"
            className="form-control"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingConfirmPasswordInput">Confirm Password</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 text-decoration-none rounded-4 py-3 fw-bold text-uppercase m-0"
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>
      <p>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-link w-100 text-break fw-medium mt-4"
        >
          Back to Login
        </button>
      </p>
    </>
  );
}