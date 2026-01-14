import React, { useState, useEffect } from 'react';
import './App.css';

// Use relative paths - Vercel serverless function will proxy to your API
const API_URL = '/api/proxy';

function App() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      console.log('API Health:', data);
    } catch (error) {
      console.error('API Health check failed:', error);
    }
  };

  const fetchTokens = async (pageNum = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const limit = 20;
      const offset = (pageNum - 1) * limit;
      
      const url = searchQuery 
        ? `${API_URL}/api/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}`
        : `${API_URL}/api/tokens?limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTokens(data.data.tokens || data.data.results || []);
        setTotal(data.data.pagination?.total || data.data.tokens?.length || 0);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Fetch tokens failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTokens(1, search);
  };

  // Check API health on load
  useEffect(() => {
    checkHealth();
    fetchTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup WebSocket for real-time updates (disabled on HTTPS)
  useEffect(() => {
    // WebSocket won't work on HTTPS with HTTP endpoint
    // Uncomment if you setup WSS or run on HTTP
    /*
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket');
      setConnected(true);
      ws.send(JSON.stringify({
        action: 'subscribe',
        channels: ['tokens', 'pools']
      }));
    };

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      console.log('Real-time update:', update);
      setRealtimeUpdates(prev => [update, ...prev].slice(0, 5));
      
      // Refresh tokens if new token created
      if (update.type === 'token_created') {
        fetchTokens(page, search);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
      setConnected(false);
    };

    return () => ws.close();
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">🪙</div>
            <div>
              <h1>X1 Token Explorer</h1>
              <p>Live Production API • {total} Tokens Indexed</p>
            </div>
          </div>
          
          <div className="status-badges">
            <div className="badge online">
              <div className="status-dot"></div>
              API Connected
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search tokens by name, symbol, or mint address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '🔍 Searching...' : '🔍 Search'}
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  fetchTokens(1, '');
                }}
                className="btn-secondary"
              >
                Clear
              </button>
            )}
          </form>
          
          <button
            onClick={() => fetchTokens(page, search)}
            className="btn-refresh"
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Tokens</div>
            <div className="stat-value">{total.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Showing</div>
            <div className="stat-value">{tokens.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Page</div>
            <div className="stat-value">{page} / {totalPages || 1}</div>
          </div>
        </div>

        {/* Token Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading tokens from production API...</p>
          </div>
        ) : tokens.length > 0 ? (
          <>
            <div className="tokens-grid">
              {tokens.map((token) => (
                <div key={token.mint} className="token-card">
                  {token.logo_uri && (
                    <img
                      src={token.logo_uri}
                      alt={token.name}
                      className="token-image"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  
                  <div className="token-header">
                    <h3>{token.name || 'Unknown Token'}</h3>
                    <div className="badges">
                      <span className="badge-symbol">{token.symbol || '???'}</span>
                      {token.verification_count > 0 && (
                        <span className="badge-verified">✓ Verified</span>
                      )}
                      {token.is_scam && (
                        <span className="badge-scam">⚠️ Scam</span>
                      )}
                    </div>
                  </div>

                  <div className="token-info">
                    <div className="info-row">
                      <span className="label">Mint:</span>
                      <code className="mint-address">
                        {token.mint.substring(0, 8)}...{token.mint.slice(-6)}
                      </code>
                    </div>
                    
                    <div className="info-row">
                      <span className="label">Decimals:</span>
                      <span>{token.decimals}</span>
                    </div>

                    {token.created_by && (
                      <div className="info-row">
                        <span className="label">Creator:</span>
                        <code className="creator-address">
                          {token.created_by.substring(0, 8)}...
                        </code>
                      </div>
                    )}

                    {token.created_at && (
                      <div className="info-row">
                        <span className="label">Created:</span>
                        <span>{new Date(token.created_at).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div className="info-row">
                      <span className="label">Verifications:</span>
                      <span className="verification-count">{token.verification_count || 0}</span>
                    </div>
                  </div>

                  <div className="token-links">
                    {token.website && (
                      <a href={token.website} target="_blank" rel="noopener noreferrer" className="link-btn">
                        🌐 Website
                      </a>
                    )}
                    {token.twitter && (
                      <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="link-btn">
                        🐦 Twitter
                      </a>
                    )}
                    <a
                      href={`https://explorer.mainnet.x1.xyz/address/${token.mint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-btn primary"
                    >
                      🔍 Explorer
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => fetchTokens(page - 1, search)}
                disabled={page === 1 || loading}
                className="btn-page"
              >
                ← Previous
              </button>
              
              <span className="page-info">
                Page {page} of {totalPages}
              </span>
              
              <button
                onClick={() => fetchTokens(page + 1, search)}
                disabled={page >= totalPages || loading}
                className="btn-page"
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No tokens found</h3>
            <p>Try a different search or check back later</p>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>
            Connected to Production API: <code>{API_URL}</code>
          </p>
          <p>
            Data updates in real-time • {total} tokens indexed • Last updated: {new Date().toLocaleString()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
