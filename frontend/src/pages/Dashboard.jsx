import { useState, useEffect } from 'react';
import ConceptCard from '../components/ConceptCard';
import NewConceptModal from '../components/NewConceptModal';
import { CAIA_API } from '../api';

function Dashboard() {
  const [stats, setStats] = useState({ count: 0 });
  const [latestConcepts, setLatestConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [statsRes, latestRes] = await Promise.all([
        CAIA_API.getTotalConcepts(),
        CAIA_API.getLatestConcepts()
      ]);
      
      setStats({ count: statsRes.data?.total || statsRes.count || 0 });
      setLatestConcepts(latestRes.data || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateConcept = async (payload) => {
    await CAIA_API.createConcept(payload);
    // Refresh dashboard data after creation
    await fetchData();
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Overview</h1>
          <p>Welcome to CAIA System Design Concepts</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          style={{ padding: '10px 20px', background: 'var(--gradient-primary)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }}
        >
          <i className="fa-solid fa-plus"></i> New Concept
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fa-solid fa-layer-group"></i></div>
          <div className="stat-info">
            <h3>Total Concepts</h3>
            <p>{stats.count}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-secondary)', background: 'rgba(0, 206, 201, 0.1)' }}><i className="fa-solid fa-fire"></i></div>
          <div className="stat-info">
            <h3>Trending Now</h3>
            <p>12</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ color: 'var(--accent-tertiary)', background: 'rgba(255, 118, 117, 0.1)' }}><i className="fa-solid fa-users"></i></div>
          <div className="stat-info">
            <h3>Active Learners</h3>
            <p>2.4k</p>
          </div>
        </div>
      </div>

      <div className="section-title">
        <i className="fa-solid fa-clock-rotate-left" style={{ color: 'var(--accent-primary)' }}></i> Recently Added
      </div>
      <div className="concepts-grid">
        {latestConcepts.map(concept => (
          <ConceptCard key={concept._id || concept.id} concept={concept} />
        ))}
      </div>

      <NewConceptModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onCreated={handleCreateConcept} 
      />
    </>
  );
}

export default Dashboard;
