import { useState, useEffect } from 'react';
import ConceptCard from '../components/ConceptCard';
import { CAIA_API } from '../api';

function Bookmarks() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CAIA_API.getBookmarks();
        // Fallback for demo purposes if backend bookmarking isn't fully returning an array
        setConcepts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Bookmarks...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>My Bookmarks <i className="fa-solid fa-bookmark" style={{ color: 'var(--accent-primary)' }}></i></h1>
          <p>Concepts you've saved for later review.</p>
        </div>
      </div>
      
      {concepts.length > 0 ? (
        <div className="concepts-grid">
          {concepts.map(concept => (
            <ConceptCard key={concept._id || concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
           <div className="stat-icon" style={{ margin: '0 auto 16px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
              <i className="fa-regular fa-bookmark"></i>
           </div>
           <h2>No bookmarks yet</h2>
           <p>Click the bookmark icon on any concept card to save it here.</p>
        </div>
      )}
    </>
  );
}

export default Bookmarks;
