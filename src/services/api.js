/**
 * CivicConnect API Service Foundation
 * 
 * Provides base configuration and endpoint definitions for future API integrations.
 * Environment variables are used to set the base URL dynamically.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic API request handler template
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('civic_auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('[API Service] Call failed (Backend may not be running yet):', error.message);
    throw error;
  }
}

// API Endpoints Catalog for Future Backend Integration
export const api = {
  // Auth endpoints placeholder
  auth: {
    login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    logout: () => request('/auth/logout', { method: 'POST' }),
    me: () => request('/auth/me'),
  },

  // Citizen Complaint endpoints placeholder
  complaints: {
    getAll: (params = '') => request(`/complaints?${params}`),
    getById: (id) => request(`/complaints/${id}`),
    create: (formData) => request('/complaints', { method: 'POST', body: formData }),
    getUserComplaints: () => request('/complaints/user'),
  },

  // Officer endpoints placeholder
  officer: {
    getAssignedComplaints: () => request('/officer/complaints'),
    updateStatus: (id, statusData) => request(`/officer/complaints/${id}/status`, { method: 'PATCH', body: JSON.stringify(statusData) }),
  },

  // Admin endpoints placeholder
  admin: {
    getStats: () => request('/admin/stats'),
    getDepartments: () => request('/admin/departments'),
    getOfficers: () => request('/admin/officers'),
    getHotspots: () => request('/admin/hotspots'),
  },
};

export default api;
