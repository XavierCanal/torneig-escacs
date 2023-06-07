const Game = require("../database/Game");
const { v4: uuid } = require("uuid");
const playerService = require("./playersService");

const createNewGame = async (newGame) => {
    try {
        const whitePlayerExists = await playerService.playerExists(newGame.white_player);
        const blackPlayerExists = await playerService.playerExists(newGame.black_player);

        if (whitePlayerExists && blackPlayerExists) {
            const gameToInsert = {
                ...newGame,
                id: uuid(),
                winner: "NONE",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            return await Game.createNewGame(gameToInsert);
        }
    } catch (error) {
        throw error;
    }
};

const updateGame = (newGame) => {
    const GameToUpdate = {
        ...newGame,
        updatedAt: new Date()
    };
    try {
        return Game.updateGame(GameToUpdate);
    } catch (error) {
        throw error;
    }
};

const getAllGames = (filterParams) => {
    try {
        console.log("Get all games Service");
        return Game.getAllGames(filterParams);
    } catch (error) {
        throw error;
    }
};

const getOneGame = (id) => {
    try {
        return Game.getOneGame(id);
    } catch (error) {
        throw error;
    }
};

const deleteGame = (id) => {
    try {
        return Game.deleteGame(id);
    } catch (error) {
        throw error;
    }
};
module.exports = {
    createNewGame,
    getAllGames,
    getOneGame,
    updateGame,
    deleteGame
};
