import { useState, useEffect } from 'react';
import { CAIA_API } from '../api';

function ConceptDetailsModal({ isOpen, onClose, concept }) {
  const [notes, setNotes] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Fetch existing notes when modal opens
  useEffect(() => {
    if (isOpen && concept) {
        const id = concept._id || concept.id;
        CAIA_API.getNotes(id)
            .then(res => {
                // Handle different potential backend responses
                const existingNote = res.data?.[0]?.content || res.note?.content || '';
                setNotes(existingNote);
            })
            .catch(err => console.error("Could not fetch notes:", err));
    }
  }, [isOpen, concept]);

  if (!isOpen || !concept) return null;

  const title = concept.metadata?.concept || concept.prompt || concept.title || 'Untitled';
  const category = concept.metadata?.category || concept.category || 'Concept';
  const difficulty = concept.metadata?.difficulty || concept.difficulty || 'Intermediate';
  const tags = concept.metadata?.tags || concept.tags || [];

  const difficultyClass = `difficulty-${difficulty.toLowerCase().replace(/\s+/g, '-')}`;

  const handleSaveNote = async () => {
    if (!notes.trim()) return;
    setIsSavingNote(true);
    setSaveMessage('');
    try {
        const id = concept._id || concept.id;
        await CAIA_API.addNote(id, notes);
        setSaveMessage('Note saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
        setSaveMessage('Failed to save note.');
    } finally {
        setIsSavingNote(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container details-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="details-header-content">
             <div className="card-header" style={{ marginBottom: '12px' }}>
                <span className="category-badge">{category}</span>
                <span className={`difficulty-badge ${difficultyClass}`}>
                  {difficulty}
                </span>
              </div>
              <h2>{title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="modal-content-scroll">
          <div className="details-section">
            <h3><i className="fa-regular fa-circle-question"></i> Prompt</h3>
            <div className="details-box prompt-box">
              <p>{concept.prompt}</p>
            </div>
          </div>

          <div className="details-section">
            <h3><i className="fa-regular fa-lightbulb"></i> Response</h3>
            <div className="details-box response-box">
              {concept.response.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {(concept.summary || concept.description) && (
             <div className="details-section">
              <h3><i className="fa-solid fa-align-left"></i> Summary</h3>
              <div className="details-box">
                <p>{concept.summary || concept.description}</p>
              </div>
            </div>
          )}

          {/* Personal Notes Section */}
          <div className="details-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3><i className="fa-solid fa-pen-to-square"></i> My Private Notes</h3>
                {saveMessage && <span style={{ fontSize: '0.85rem', color: saveMessage.includes('Failed') ? 'var(--accent-tertiary)' : 'var(--accent-secondary)' }}>{saveMessage}</span>}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--border-radius-sm)', padding: '16px' }}>
                <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your personal notes, thoughts, or reminders here... (These are only visible to you)"
                    style={{ width: '100%', minHeight: '100px', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', resize: 'vertical', outline: 'none' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                    <button 
                        onClick={handleSaveNote}
                        disabled={isSavingNote || !notes.trim()}
                        style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, opacity: (isSavingNote || !notes.trim()) ? 0.7 : 1 }}
                    >
                        {isSavingNote ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </div>
          </div>

          <div className="details-footer">
            <div className="tags">
              {tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
            <div className="metadata-grid">
               {concept.metadata?.language && (
                  <div className="meta-item">
                     <span className="meta-label">Language</span>
                     <span className="meta-value">{concept.metadata.language}</span>
                  </div>
               )}
               {concept.metadata?.design_pattern && (
                  <div className="meta-item">
                     <span className="meta-label">Pattern</span>
                     <span className="meta-value">{concept.metadata.design_pattern}</span>
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConceptDetailsModal;
