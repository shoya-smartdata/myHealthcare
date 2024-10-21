import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatusUpdateModal from '../components/StatusUpdateModal';

const Dashboard = () => {
  const [role, setRole] = useState('patient');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (role === 'doctor') {
      fetchDoctorConsultations();
    } else if (role === 'patient') {
      fetchPatientConsultations();
    }
  }, [role]);

  const fetchDoctorConsultations = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3030/api/doctor/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultations(response.data.consultations);
    } catch (err) {
      setError('Failed to load consultation requests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientConsultations = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3030/api/patient/allConsultations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConsultations(response.data.consultations);
    } catch (err) {
      setError('Failed to load consultations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdateClick = (consultationId) => {
    setSelectedConsultationId(consultationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConsultationId(null);
  };

  const handleUpdateStatus = async (consultationId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3030/api/doctor/consultation/status', {
        consultationId,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh consultations after updating status
      if (role === 'doctor') {
        fetchDoctorConsultations();
      } else {
        fetchPatientConsultations();
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {/* Role Switcher */}
        <div className="mb-4">
          <button
            className={`mr-2 py-2 px-4 rounded-lg ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setRole('patient')}
          >
            Patient Dashboard
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setRole('doctor')}
          >
            Doctor Dashboard
          </button>
        </div>

        {/* Conditional rendering based on role */}
        {role === 'patient' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Consultation Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : consultations.length === 0 ? (
              <p>No consultation requests at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white p-4 shadow-md rounded-lg">
                    <p><strong>Doctor:</strong> {consultation.Doctor.name}</p>
                    <p><strong>Time Slot:</strong> {new Date(consultation.timeSlot).toLocaleString()}</p>
                    <p><strong>Status:</strong> {consultation.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Incoming Consultation Requests</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : consultations.length === 0 ? (
              <p>No consultation requests at the moment.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="bg-white p-4 shadow-md rounded-lg">
                    <p><strong>Patient:</strong> {consultation.Patient.name} ({consultation.Patient.email})</p>
                    <p><strong>Time Slot:</strong> {new Date(consultation.timeSlot).toLocaleString()}</p>
                    <p><strong>Status:</strong> {consultation.status}</p>
                    <button
                      className="bg-green-600 text-white py-1 px-2 my-2 mx-2 rounded-lg hover:bg-green-700 transition duration-300"
                      onClick={() => handleStatusUpdateClick(consultation.id)}
                    >
                      Update Status
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <StatusUpdateModal
          consultationId={selectedConsultationId}
          onClose={handleCloseModal}
          onSubmit={handleUpdateStatus}
        />
      )}
    </>
  );
};

export default Dashboard;
