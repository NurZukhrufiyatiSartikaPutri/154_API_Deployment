module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
       id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'genres',
        timestamps: true
    });

    Genre.associate = (models) => {
        Genre.belongsToMany(models.Komik, {
            through: 'KomikGenres',
            foreignKey: 'genreId',
            otherKey: 'komikId',
            as: 'komiks'
        }); 
    };

    return Genre;
      
};