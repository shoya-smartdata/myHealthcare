export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,  // Make sure name is required
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: 'email_unique_constraint', // Custom name for the unique constraint
          msg: 'Email address must be unique', // Custom error message if violated
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('doctor', 'patient'),
        allowNull: false,
      },
    });
  
    return User;
  };
  