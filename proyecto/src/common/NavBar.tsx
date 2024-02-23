
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-primary navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <Link className="navbar-brand  fs-3" to="/">EduAsynchub</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
