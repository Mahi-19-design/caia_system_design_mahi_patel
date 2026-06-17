import { useState, useEffect, useMemo } from 'react';
import ConceptCard from '../components/ConceptCard';
import { CAIA_API } from '../api';

function Explore() {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CAIA_API.getAllConcepts();
        setConcepts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch explore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute unique categories and difficulties from the data
  const categories = useMemo(() => {
    const cats = concepts.map(c => c.metadata?.category || c.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [concepts]);

  const difficulties = useMemo(() => {
    const diffs = concepts.map(c => c.metadata?.difficulty || c.difficulty).filter(Boolean);
    return ['All', ...new Set(diffs)];
  }, [concepts]);

  // Apply filters
  const filteredConcepts = useMemo(() => {
    return concepts.filter(concept => {
      const cat = concept.metadata?.category || concept.category || '';
      const diff = concept.metadata?.difficulty || concept.difficulty || '';
      
      const matchCategory = categoryFilter === 'All' || cat === categoryFilter;
      const matchDifficulty = difficultyFilter === 'All' || diff === difficultyFilter;
      
      return matchCategory && matchDifficulty;
    });
  }, [concepts, categoryFilter, difficultyFilter]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading Concepts...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1>Explore Concepts</h1>
          <p>Discover system design patterns and principles.</p>
        </div>
      </div>

      <div className="filters-bar" style={{ display: 'flex', gap: '16px', marginBottom: '32px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><i className="fa-solid fa-layer-group"></i> Category:</label>
          <select 
            value={categoryFilter} 
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', outline: 'none' }}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div className="filter-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}><i className="fa-solid fa-signal"></i> Difficulty:</label>
          <select 
            value={difficultyFilter} 
            onChange={e => setDifficultyFilter(e.target.value)}
            style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '4px', outline: 'none' }}
          >
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredConcepts.length} concepts
        </div>
      </div>

      {filteredConcepts.length > 0 ? (
        <div className="concepts-grid">
          {filteredConcepts.map(concept => (
            <ConceptCard key={concept._id || concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
           <i className="fa-solid fa-filter-circle-xmark" style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--text-muted)' }}></i>
           <h2>No matches found</h2>
           <p>Try adjusting your filters to see more concepts.</p>
           <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>
             Debug info: concepts loaded: {Array.isArray(concepts) ? concepts.length : typeof concepts}
           </p>
        </div>
      )}
    </>
  );
}

export default Explore;
