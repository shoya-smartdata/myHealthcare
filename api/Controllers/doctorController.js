// Get consultations for the patient
export const viewPatientRequests = async (req, res) => {
  const patientId = req.user.id; // Extract the patient ID from authenticated user
  try {
    const consultations = await Consultation.findAll({
      where: { PatientId: patientId }, // Ensure filtering by PatientId
      include: ['Doctor'], // Include doctor information for display
    });
    res.json({ consultations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load consultations' });
  }
};

// Get consultations for the doctor
export const viewRequests = async (req, res) => {
  const doctorId = req.user.id;  // Extract the doctor ID from authenticated user
  try {
    const consultations = await Consultation.findAll({
      where: { DoctorId: doctorId }, // Ensure filtering by DoctorId
      include: ['Patient'], // Include patient information for display
    });
    res.json({ consultations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load consultations', err });
  }
};

// Update consultation status
export const updateStatus = async (req, res) => {
  const { consultationId, status } = req.body;
  try {
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

    consultation.status = status; // Update status
    await consultation.save();

    res.json({ message: 'Consultation updated', consultation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update consultation', err });
  }
};
