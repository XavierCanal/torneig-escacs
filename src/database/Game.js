const { Model, DataTypes, Op} = require("sequelize");
const sequelize = require("./database");

/**
 * @openapi
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         white_player:
 *           type: varchar
 *           example: 1234-1234-1234-1234
 *         black_player:
 *           type: varchar
 *           example: 1234-1234-1234-1234
 *         winner:
 *           type: varchar
 *           example: WHITE
 *         date:
 *           type: datetime
 *           example: 2021-10-13T09:00:00.000Z
 *         createdAt:
 *           type: datetime
 *           example: 2021-10-13T09:00:00.000Z
 *         updatedAt:
 *           type: datetime
 *           example: 2021-10-13T09:00:00.000Z
 */
class Game extends Model { }

Game.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        white_player: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        black_player: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        winner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
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
        modelName: "game",
        tableName: "Game",
        timestamps: false,
    }
);

const createNewGame = (newGame) => {
    try {
        Game.create(newGame);
        return newGame;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updateGame = (updatedGame) => {
    try {
        Game.update({
            winner: updatedGame.winner,
            updatedAt: new Date(),
            white_player: updatedGame.white_player,
            black_player: updatedGame.black_player,
            date: updatedGame.date
        }, {
            where: { id: updatedGame.id }
        });
        return updatedGame;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getAllGames = async (filterParams) => {
    try {
        const games = await Game.findAll({ where: {} });

        return games;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneGame = async (id) => {
    try {
        const game = await Game.findOne({ where: { id } });
        if (!game) {
            throw {
                status: 400,
                message: `Can't find game with the id '${id}'`,
            };
        }

        return game;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteGame = async (id) => {
    try {
        const gameDelete = await Game.destroy({ where: { id } });
        if (!gameDelete) {
            throw {
                status: 400,
                message: `Can't find game with the nom '${id}'`,
            };
        }
        return gameDelete;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const getGamesFromPlayer = async (playerId) => {
    try {
        return await Game.findAll({
            where: {
                [Op.or]: [{white_player: playerId}, {black_player: playerId}],
            },
        });
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getGamesFromPlayerByPosition = async (playerId, position) => {
    try {
        console.log(position);
        return await Game.findAll({
            where: {
                [position]: playerId
            }
        });
    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getGamesFromPlayerByDate = async (playerId, date) => {
    try {
        console.log("date ",new Date(date));
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return await Game.findAll({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay],
                },
                [Op.or]: [{ white_player: playerId }, { black_player: playerId }],
            },
        });

    } catch (error) {
        throw { status: 500, message: error };
    }
}

const getGamesFromPlayerByPositionAndDate = async (playerId, position, date) => {
    try {
        console.log("date ",new Date(date));
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return await Game.findAll({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay],
                },
                [position]: playerId
            }
        });
    } catch (error) {
        throw { status: 500, message: error };
    }
}

module.exports = {
    Game,
    createNewGame,
    getAllGames,
    getOneGame,
    updateGame,
    deleteGame,
    getGamesFromPlayer,
    getGamesFromPlayerByPosition,
    getGamesFromPlayerByDate,
    getGamesFromPlayerByPositionAndDate
};
