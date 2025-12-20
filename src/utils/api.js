// src/utils/api.js
export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

// utils/api.js
export const authFetch = (path, token, opts = {}) => {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return fetch(`${API_BASE}${path}`, { ...opts, headers });
};

