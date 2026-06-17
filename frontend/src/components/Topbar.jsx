import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="topbar">
      <form className="search-bar" onSubmit={handleSearch}>
        <i className="fa-solid fa-search"></i>
        <input 
          type="text" 
          placeholder="Search concepts, patterns, or tags..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      
      <div className="user-actions">
        <button className="icon-btn"><i className="fa-regular fa-bell"></i></button>
        <div className="profile-pic">
          <img src="https://ui-avatars.com/api/?name=User&background=6c5ce7&color=fff" alt="User Profile" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
