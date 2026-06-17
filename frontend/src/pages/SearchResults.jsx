import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ConceptCard from '../components/ConceptCard';
import { CAIA_API } from '../api';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const res = await CAIA_API.searchConcepts(query);
        setResults(res.data || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Search Results</h1>
          <p>
            {query 
              ? `Found ${results.length} results for "${query}"` 
              : "Enter a search query to find concepts."}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="concepts-grid">
          {results.map(concept => (
            <ConceptCard key={concept._id || concept.id} concept={concept} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
           <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '3rem', marginBottom: '16px', color: 'var(--text-muted)' }}></i>
           <h2>No results found</h2>
           <p>We couldn't find anything matching your search. Try different keywords.</p>
        </div>
      )}
    </>
  );
}

export default SearchResults;
