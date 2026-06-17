import { useState } from 'react';

function NewConceptModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    prompt: '',
    response: '',
    summary: '',
    category: '',
    subcategory: '',
    concept: '',
    question_type: 'Conceptual',
    difficulty: 'Intermediate',
    language: '',
    design_pattern: '',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.prompt || !formData.response || !formData.category || !formData.subcategory || !formData.concept) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);

    const payload = {
      prompt: formData.prompt,
      response: formData.response,
      summary: formData.summary,
      metadata: {
        category: formData.category,
        subcategory: formData.subcategory,
        concept: formData.concept,
        question_type: formData.question_type,
        generated_at: new Date().toISOString(),
        difficulty: formData.difficulty,
        language: formData.language,
        design_pattern: formData.design_pattern,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }
    };

    try {
      await onCreated(payload);
      // Reset form
      setFormData({
        prompt: '', response: '', summary: '', category: '', subcategory: '',
        concept: '', question_type: 'Conceptual', difficulty: 'Intermediate',
        language: '', design_pattern: '', tags: ''
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create concept.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i className="fa-solid fa-plus-circle"></i> New Concept</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {error && <div className="modal-error"><i className="fa-solid fa-triangle-exclamation"></i> {error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Left column */}
            <div className="form-column">
              <div className="form-group">
                <label>Concept Name <span className="required">*</span></label>
                <input name="concept" value={formData.concept} onChange={handleChange} placeholder="e.g. Load Balancing" />
              </div>

              <div className="form-group">
                <label>Prompt / Question <span className="required">*</span></label>
                <textarea name="prompt" value={formData.prompt} onChange={handleChange} placeholder="What question does this concept answer?" rows={3} />
              </div>

              <div className="form-group">
                <label>Response / Answer <span className="required">*</span></label>
                <textarea name="response" value={formData.response} onChange={handleChange} placeholder="The detailed response..." rows={5} />
              </div>

              <div className="form-group">
                <label>Summary</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief summary..." rows={2} />
              </div>
            </div>

            {/* Right column */}
            <div className="form-column">
              <div className="form-row">
                <div className="form-group">
                  <label>Category <span className="required">*</span></label>
                  <input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Backend" />
                </div>
                <div className="form-group">
                  <label>Subcategory <span className="required">*</span></label>
                  <input name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="e.g. Networking" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Question Type</label>
                  <select name="question_type" value={formData.question_type} onChange={handleChange}>
                    <option value="Conceptual">Conceptual</option>
                    <option value="Practical">Practical</option>
                    <option value="Design">Design</option>
                    <option value="Comparison">Comparison</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Language</label>
                  <input name="language" value={formData.language} onChange={handleChange} placeholder="e.g. JavaScript" />
                </div>
                <div className="form-group">
                  <label>Design Pattern</label>
                  <input name="design_pattern" value={formData.design_pattern} onChange={handleChange} placeholder="e.g. Observer" />
                </div>
              </div>

              <div className="form-group">
                <label>Tags <span className="hint">(comma separated)</span></label>
                <input name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. scalability, cloud, aws" />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? (
                <><div className="btn-spinner"></div> Creating...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Create Concept</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewConceptModal;
