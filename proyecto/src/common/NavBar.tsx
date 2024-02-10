
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <h1>Nombre de tu Página</h1>
      </div>
      <div className="navbar__right">
        <button><a href="/login">Login</a></button>
        <button>Register</button>
      </div>
    </nav>
  );
}

export default NavBar;
