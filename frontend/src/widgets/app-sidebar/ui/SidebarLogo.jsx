import logo from "@shared/assets/logo/logo.svg";

export function SidebarLogo() {
  return (
    // ===== ЛОГО =====
    <div className="navbar-brand-box">
      <a href="/" className="logo logo-dark">
        <span className="logo-sm">
          <img src={logo} alt="Logo" height="30" />
        </span>
      </a>

      <a href="/" className="logo logo-light">
        <span className="logo-sm">
          <img src={logo} alt="Logo" height="30" />
        </span>
      </a>
    </div>
  );
}
