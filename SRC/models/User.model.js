// Criar um schema de usuario usando o sequelize

const { Sequelize } = require("sequelize");
const sequelize = require('../../db/conn')

const User = sequelize.define("User", {
    // Model attributes are defined here
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

User.createByCadastroDTO = (DTO) => {
    return User.create({
        firstName: DTO.firstName,
        lastName: DTO.lastName,
        email: DTO.email,
        password: DTO.password
    })
}


// `sequelize.define` also returns the model

module.exports = User;