import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="logo">
        <div className="logo-icon"><i className="fa-solid fa-layer-group"></i></div>
        <h2>CAIA Design</h2>
      </div>
      
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-solid fa-compass"></i> Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/roadmaps" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-solid fa-map"></i> Roadmaps
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-solid fa-fire"></i> Trending
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-regular fa-bookmark"></i> Bookmarks
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
            <i className="fa-solid fa-chart-line"></i> Analytics
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-bottom" style={{ marginTop: 'auto' }}>
        <a href="#" className="settings-link"><i className="fa-solid fa-gear"></i> Settings</a>
      </div>
    </nav>
  );
}

export default Sidebar;
