import { createContext, useContext, useState, useCallback } from 'react';

const PatientAuthContext = createContext(null);

export function PatientAuthProvider({ children }) {
  const [patient, setPatient] = useState(() => {
    try {
      const stored = localStorage.getItem('patient_data');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((token, patientData) => {
    localStorage.setItem('patient_token', token);
    localStorage.setItem('patient_data', JSON.stringify(patientData));
    setPatient(patientData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('patient_token');
    localStorage.removeItem('patient_data');
    setPatient(null);
  }, []);

  const isAuthenticated = !!patient && !!localStorage.getItem('patient_token');

  return (
    <PatientAuthContext.Provider value={{ patient, login, logout, isAuthenticated }}>
      {children}
    </PatientAuthContext.Provider>
  );
}

export function usePatientAuth() {
  const ctx = useContext(PatientAuthContext);
  if (!ctx) throw new Error('usePatientAuth must be used inside PatientAuthProvider');
  return ctx;
}
