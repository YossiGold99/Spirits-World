import logo from '../assets/logo.svg'; // Imports myshow  custom vector

export default function Navbar() {
    return (
        <nav className="main-nav">
            <div className="nav-brand">
                <img src={logo} alt="SpiritsBase Logo" className="nav-logo" />
                <span className="brand-text">SpiritsBase</span>
            </div>
            <div className="nav-links">
                <a href="#collection">My Collection</a>
                <a href="#explore">Explore</a>
            </div>
        </nav>
    );
}