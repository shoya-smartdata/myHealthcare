import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './patientSchema.js';
import Doctor from './doctorSchema.js';

const Consultation = sequelize.define('Consultation', {
  status: {
    type: DataTypes.ENUM('Accepted', 'Confirmed', 'Completed', 'Pending'),
    defaultValue: 'Pending',
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skinImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Explicitly define the table name if it differs from the default
  tableName: 'Consultations',
  timestamps: true, // Assuming you want createdAt and updatedAt
});

// Associations with the correct foreign key names
Consultation.belongsTo(Patient, { foreignKey: 'PatientId', onDelete: 'CASCADE' });
Consultation.belongsTo(Doctor, { foreignKey: 'DoctorId', onDelete: 'CASCADE' });

export default Consultation;
