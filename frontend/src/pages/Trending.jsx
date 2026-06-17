import { useState, useEffect } from 'react';
import ConceptCard from '../components/ConceptCard';
import { CAIA_API } from '../api';

function Trending() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CAIA_API.getPopularConcepts();
        setConcepts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch trending data:", error);
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
        <p>Loading Trending Concepts...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Trending <i className="fa-solid fa-fire" style={{ color: 'var(--accent-tertiary)' }}></i></h1>
          <p>What the community is reading right now.</p>
        </div>
      </div>
      <div className="concepts-grid">
        {concepts.map(concept => (
          <ConceptCard key={concept._id || concept.id} concept={concept} />
        ))}
      </div>
    </>
  );
}

export default Trending;
