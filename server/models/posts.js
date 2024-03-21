module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
    });

    Posts.associate = (models)=>{
        Posts.belongsTo(models.Users, {
            foreignKey: 'userId', 
            onDelete: 'cascade'
        });
        Posts.hasMany(models.Comments,{
            onDelete:"cascade"
        })
        Posts.hasMany(models.Likes,{
            onDelete:"cascade"
        })
    }

    return Posts;
};
