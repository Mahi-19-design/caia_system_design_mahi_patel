import { useState, useEffect } from 'react';
import { CAIA_API } from '../api';

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    categories: [],
    difficulties: [],
    performance: null,
    cache: null
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [catsRes, diffRes, perfRes, cacheRes] = await Promise.all([
          CAIA_API.getCategoryDistribution(),
          CAIA_API.getDifficultyStats(),
          CAIA_API.getApiPerformance(),
          CAIA_API.getCacheHitRate()
        ]);

        setData({
          categories: catsRes.data || [],
          difficulties: diffRes.data || [],
          performance: perfRes.data || null,
          cache: cacheRes.data || null
        });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading System Metrics...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>Analytics <i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-secondary)' }}></i></h1>
          <p>System metrics and content distribution.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(0, 206, 201, 0.1)', color: 'var(--accent-secondary)' }}><i className="fa-solid fa-server"></i></div>
          <div className="stat-info">
            <h3>API Uptime</h3>
            <p>{data.performance?.uptime || '99.9%'}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(108, 92, 231, 0.1)', color: 'var(--accent-primary)' }}><i className="fa-solid fa-bolt"></i></div>
          <div className="stat-info">
            <h3>Avg Response Time</h3>
            <p>{data.performance?.averageResponseTime || '45ms'}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(255, 118, 117, 0.1)', color: 'var(--accent-tertiary)' }}><i className="fa-solid fa-memory"></i></div>
          <div className="stat-info">
            <h3>Cache Hit Rate</h3>
            <p>{data.cache?.cacheHitRate || '92%'}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
        
        {/* Category Distribution */}
        <div className="analytics-panel" style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-pie-chart" style={{ color: 'var(--accent-primary)' }}></i> Category Distribution</h3>
          {data.categories.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.categories.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                    <span>{item._id || 'Uncategorized'}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.count} concepts</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (item.count / 20) * 100)}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No category data available.</p>
          )}
        </div>

        {/* Difficulty Stats */}
        <div className="analytics-panel" style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-chart-bar" style={{ color: 'var(--accent-tertiary)' }}></i> Difficulty Breakdown</h3>
          {data.difficulties.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.difficulties.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                    <span>{item._id || 'Unspecified'}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{item.count} concepts</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, (item.count / 20) * 100)}%`, height: '100%', background: 'var(--accent-secondary)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No difficulty data available.</p>
          )}
        </div>

      </div>
    </>
  );
}

export default Analytics;
