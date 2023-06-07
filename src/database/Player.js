const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

/**
 * @openapi
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         username:
 *           type: varchar
 *           example: Xavi
 *         fullname:
 *           type: varchar
 *           example: Xavi Hernandez
 *         createdAt:
 *           type: datetime
 *           example: 2021-10-13T09:00:00.000Z
 *         updatedAt:
 *           type: datetime
 *           example: 2021-10-13T09:00:00.000Z
 */
class Player extends Model { }

Player.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "player",
        tableName: "Player",
        timestamps: false,
    }
);

const createNewPlayer = (newPlayer) => {
    try {
        Player.create(newPlayer);
        return newPlayer;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updatePlayer = (updatedPlayer) => {
    try {
        Player.update({
            username: updatedPlayer.username,
            fullname: updatedPlayer.fullname,
            updatedAt: new Date(),
        }, {
            where: { id: updatedPlayer.id }
        });
        return updatedPlayer;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getAllPlayers = async (filterParams) => {
    try {
        const players = await Player.findAll({ where: {} });

        return players;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOnePlayer = async (id) => {
    try {
        const player = await Player.findOne({ where: { id } });
        if (!player) {
            throw {
                status: 400,
                message: `Can't find player with the id '${id}'`,
            };
        }

        return player;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deletePlayer = async (id) => {
    try {
        const playerDelete = await Player.destroy({ where: { id } });
        if (!playerDelete) {
            throw {
                status: 400,
                message: `Can't find player with the nom '${id}'`,
            };
        }
        return playerDelete;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    Player,
    createNewPlayer,
    getAllPlayers,
    getOnePlayer,
    updatePlayer,
    deletePlayer
};
