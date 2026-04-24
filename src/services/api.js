import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api/public';

const api = axios.create({ baseURL: BASE_URL });

// Attach patient token to authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('patient_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('patient_token');
      localStorage.removeItem('patient_data');
      window.location.href = '/portal/login';
    }
    return Promise.reject(err);
  }
);

// ── Public endpoints ──────────────────────────────────
export const getServices      = ()           => api.get('/services');
export const getProviders     = ()           => api.get('/providers');
export const getAvailability  = (params)     => api.get('/availability', { params });
export const submitContact    = (data)       => api.post('/contact', data);
export const purchaseGiftCard = (data)       => api.post('/gift-cards', data);

// ── Patient auth ──────────────────────────────────────
export const registerPatient  = (data)       => api.post('/register', data);
export const loginPatient     = (data)       => api.post('/login', data);
export const getMe            = ()           => api.get('/me');

// ── Patient portal (requires token) ──────────────────
export const bookAppointment      = (data)   => api.post('/appointments', data);
export const getMyAppointments    = ()       => api.get('/appointments');
export const cancelMyAppointment  = (id, r)  => api.put(`/appointments/${id}/cancel`, { reason: r });

export default api;
