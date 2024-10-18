export default (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      name: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false,  
        validate: {
          is: /^[0-9]+$/, 
        },
      },
      address: {
        type: DataTypes.STRING,  
        allowNull: true,
      },
    });
  
    return Doctor;
  };
  