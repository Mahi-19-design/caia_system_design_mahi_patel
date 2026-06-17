import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Trending from './pages/Trending';
import SearchResults from './pages/SearchResults';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import Roadmaps from './pages/Roadmaps';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Topbar />
        <div className="view-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
