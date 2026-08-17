import { useState } from "react";
import { useLoginStore } from "@features/auth/login/model/useLoginStore.js";

/**
 * LoginForm — тупой компонент.
 * onSuccess(login) — вызывается с логином после успешного входа.
 */
export function LoginForm({ onSuccess, onRegister, onForgot }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login: doLogin, clearError } = useLoginStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    doLogin({ login, password }, () => onSuccess(login));
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

        <div className="form-floating mb-4">
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
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-100 text-decoration-none rounded-4 py-3 fw-bold text-uppercase m-0"
        >
          {loading ? "Заходимо..." : "Увійти"}
        </button>
      </form>
      <button
        type="button"
        onClick={onForgot}
        className="btn btn-outline-primary w-100 text-break rounded-4 py-3 fw-bold text-uppercase mt-3"
      >
        Забули пароль?
      </button>

      <button
        type="button"
        onClick={onRegister}
        className="btn btn-outline-primary w-100 text-break rounded-4 py-3 fw-bold text-uppercase mt-4"
      >
        Зареєструватися
      </button>
    </>
  );
}
