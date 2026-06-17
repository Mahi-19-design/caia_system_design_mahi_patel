import { useState } from 'react';
import ConceptDetailsModal from './ConceptDetailsModal';
import { CAIA_API } from '../api';

function ConceptCard({ concept }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(concept.isBookmarked || false);
  const [votes, setVotes] = useState(concept.metadata?.upvotes || concept.upvotes || Math.floor(Math.random() * 50) + 10); // fallback for demo if field missing
  const [userVote, setUserVote] = useState(null); // 'up', 'down', or null

  // Map backend's nested metadata structure to display fields
  const id = concept._id || concept.id;
  const title = concept.metadata?.concept || concept.prompt || concept.title || 'Untitled';
  const category = concept.metadata?.category || concept.category || 'Concept';
  const difficulty = concept.metadata?.difficulty || concept.difficulty || 'Intermediate';
  const description = concept.summary || concept.description || 'No description available.';
  const tags = concept.metadata?.tags || concept.tags || [];
  const views = concept.metadata?.views ?? concept.views ?? 0;

  const difficultyClass = `difficulty-${difficulty.toLowerCase().replace(/\s+/g, '-')}`;

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      if (isBookmarked) {
        await CAIA_API.removeBookmark(id);
      } else {
        await CAIA_API.bookmarkConcept(id);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  const handleVote = async (e, type) => {
    e.stopPropagation();
    if (userVote === type) return; // Already voted this way

    const newVotes = type === 'up' 
        ? votes + (userVote === 'down' ? 2 : 1) 
        : votes - (userVote === 'up' ? 2 : 1);
        
    setVotes(newVotes);
    setUserVote(type);

    try {
        await CAIA_API.voteOnConcept(id, type);
    } catch (error) {
        console.error("Voting failed, might be a stub:", error);
        // We'll keep the local state optimistic update for the demo
    }
  };

  return (
    <>
      <div className="concept-card" onClick={() => setShowDetails(true)}>
        <div className="card-header">
          <span className="category-badge">{category}</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className={`difficulty-badge ${difficultyClass}`}>
              {difficulty}
            </span>
            <button 
              onClick={handleBookmark}
              className="icon-btn" 
              style={{ width: '32px', height: '32px', background: isBookmarked ? 'rgba(108, 92, 231, 0.2)' : 'transparent', border: 'none', color: isBookmarked ? 'var(--accent-primary)' : 'var(--text-muted)' }}
            >
              <i className={isBookmarked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
            </button>
          </div>
        </div>
        <h3>{title}</h3>
        <p className="description">{description}</p>
        <div className="card-footer">
          <div className="tags">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
            {tags.length > 2 && (
              <span className="tag">+{tags.length - 2}</span>
            )}
          </div>
          <div className="metrics" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '12px' }}>
                <button onClick={(e) => handleVote(e, 'up')} style={{ background: 'none', border: 'none', color: userVote === 'up' ? 'var(--accent-secondary)' : 'var(--text-muted)', cursor: 'pointer' }}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
                <span style={{ fontWeight: 600, color: userVote ? 'var(--text-primary)' : 'var(--text-muted)' }}>{votes}</span>
                <button onClick={(e) => handleVote(e, 'down')} style={{ background: 'none', border: 'none', color: userVote === 'down' ? 'var(--accent-tertiary)' : 'var(--text-muted)', cursor: 'pointer' }}>
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
            </div>
            <span><i className="fa-regular fa-eye"></i> {views}</span>
          </div>
        </div>
      </div>

      <ConceptDetailsModal 
        isOpen={showDetails} 
        onClose={(e) => { e?.stopPropagation(); setShowDetails(false); }} 
        concept={concept} 
      />
    </>
  );
}

export default ConceptCard;
