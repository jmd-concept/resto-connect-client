import { DataTypes, Model } from 'sequelize';

class Utilisateur extends Model { }

Utilisateur.init({
    id_utilisateur: {
        type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    motdepasse: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('admin', 'client'),
        defaultValue: 'client'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: false,
    tableName: "utilisateur",
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
    hooks: {
        beforeUpdate: async (user) => {
            if (user.changed('motdepasse')) {
                user.motdepasse = await bcrypt.hash(user.motdepasse, 10);
            }
        }
    },

});

export default Utilisateur;
