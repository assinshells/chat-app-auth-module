import { useState } from "react";
import { useRegisterStore } from "@features/auth/register/model/useRegisterStore.js";

export function RegisterForm({ onSuccess, onBack }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error, register, clearError } = useRegisterStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    register({ login, password, email }, onSuccess);
  };

  return (
    <>
      {error && <p className="text-danger text-center mb-3">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            id="floatingLoginInput"
            type="text"
            className="form-control"
            placeholder=" "
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <label htmlFor="floatingLoginInput">Login</label>
        </div>
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
          <label htmlFor="floatingPasswordInput">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            id="floatingEmailInput"
            type="email"
            className="form-control"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingEmailInput">Email (optional)</label>
        </div>
        <label className="mb-2 text-muted small">GENDER</label>
        <div className="d-flex align-items-center mb-3 px-0">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="male" />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check mx-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="female" />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="not" defaultChecked />
            <label className="form-check-label" htmlFor="not">
              Prefer not to say
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 text-decoration-none rounded-4 py-3 fw-bold text-uppercase m-0"
        >
          {loading ? "Registering..." : "Register"}
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