import { useState, useEffect } from 'react';
import ConceptCard from '../components/ConceptCard';
import { CAIA_API } from '../api';

function Roadmaps() {
  const [activeTrack, setActiveTrack] = useState('system-design');
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tracks = [
    { id: 'system-design', name: 'System Design', icon: 'fa-sitemap' },
    { id: 'backend', name: 'Backend', icon: 'fa-server' },
    { id: 'frontend', name: 'Frontend', icon: 'fa-desktop' },
    { id: 'devops', name: 'DevOps', icon: 'fa-infinity' }
  ];

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      try {
        const res = await CAIA_API.getRoadmap(activeTrack);
        // The backend might return the roadmap list under data.roadmap or data depending on structure
        setConcepts(res.roadmap || res.data || []);
      } catch (error) {
        console.error(`Failed to fetch ${activeTrack} roadmap:`, error);
        setConcepts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [activeTrack]);

  return (
    <>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1>Learning Roadmaps <i className="fa-solid fa-map" style={{ color: 'var(--accent-primary)' }}></i></h1>
          <p>Structured paths to master engineering concepts.</p>
        </div>
      </div>

      <div className="roadmap-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {tracks.map(track => (
          <button
            key={track.id}
            onClick={() => setActiveTrack(track.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '30px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: activeTrack === track.id ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
              color: activeTrack === track.id ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            <i className={`fa-solid ${track.icon}`}></i> {track.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading {tracks.find(t => t.id === activeTrack)?.name} Roadmap...</p>
        </div>
      ) : concepts.length > 0 ? (
        <div className="roadmap-timeline" style={{ position: 'relative', paddingLeft: '24px' }}>
          <div style={{ position: 'absolute', left: '7px', top: '0', bottom: '0', width: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {concepts.map((concept, index) => (
              <div key={concept._id || concept.id} style={{ position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', left: '-30px', top: '24px', width: '16px', height: '16px', 
                  borderRadius: '50%', background: 'var(--bg-primary)', border: '4px solid var(--accent-primary)', zIndex: 1 
                }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', color: 'var(--text-muted)' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Step {index + 1}</span>
                </div>
                <ConceptCard concept={concept} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
           <i className="fa-solid fa-person-digging" style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--text-muted)' }}></i>
           <h2>Roadmap Under Construction</h2>
           <p>We are currently building out the {tracks.find(t => t.id === activeTrack)?.name} roadmap. Check back soon!</p>
        </div>
      )}
    </>
  );
}

export default Roadmaps;
