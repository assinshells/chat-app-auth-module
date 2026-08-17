import { useState } from "react";
import { useRegisterStore } from "@features/auth/register/model/useRegisterStore.js";
import { GENDER_OPTIONS } from "@shared/constants/auth.constants.js";

export function RegisterForm({ onSuccess, onBack }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const { loading, error, register, clearError } = useRegisterStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    register({ login, password, email, gender }, onSuccess);
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
          <label htmlFor="floatingLoginInput">Введіть нікнейм</label>
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
          <label htmlFor="floatingPasswordInput">Введіть пароль</label>
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
          <label htmlFor="floatingEmailInput">Введіть пошту (опціонально)</label>
        </div>
        <label className="mb-2 text-muted small">Як ви себе ідентифікуєте?</label>
        <div className="d-flex align-items-center mb-3 px-0">
          {GENDER_OPTIONS.map((option) => (
            <div className="form-check me-3" key={option.value}>
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id={`gender-${option.value}`}
                value={option.value}
                checked={gender === option.value}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor={`gender-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 text-decoration-none rounded-4 py-3 fw-bold text-uppercase m-0"
        >
          {loading ? "Реєструємо..." : "Зареєструватися"}
        </button>
      </form>
      <p>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-outline-primary w-100 text-break rounded-4 py-3 fw-bold text-uppercase mt-4"
        >
          Увійти
        </button>
      </p>
    </>
  );
}