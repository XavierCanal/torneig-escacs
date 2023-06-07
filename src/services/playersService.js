const Player = require("../database/Player");
const { v4: uuid } = require("uuid");
const Game = require("../database/Game");

const createNewPlayer = (newPlayer) => {
    const PlayerToInsert = {
        ...newPlayer,
        id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    try {
        return Player.createNewPlayer(PlayerToInsert);
    } catch (error) {
        throw error;
    }
};

const updatePlayer = (newPlayer) => {
    const PlayerToUpdate = {
        ...newPlayer,
        updatedAt: new Date()
    };
    try {
        return Player.updatePlayer(PlayerToUpdate);
    } catch (error) {
        throw error;
    }
};

const getAllPlayers = (filterParams) => {
    try {
        console.log("Get all players Service");
        return Player.getAllPlayers(filterParams);
    } catch (error) {
        throw error;
    }
};

const getOnePlayer = (id) => {
    try {
        return Player.getOnePlayer(id);
    } catch (error) {
        throw error;
    }
};

const deletePlayer = (id) => {
    try {
        return Player.deletePlayer(id);
    } catch (error) {
        throw error;
    }
};

const getPlayerGames = (id) => {
    try {
        return Game.getGamesFromPlayer(id);
    } catch (error) {
        throw error;
    }
}

const getPlayerGamesByPosition = (id, position) => {
    try {
        console.log(position, "position");
        if (position === "WHITE") {
            position = "white_player";
        } else {
            position = "black_player";
        }
        return Game.getGamesFromPlayerByPosition(id, position);
    } catch (error) {
        throw error;
    }
}

const getPlayerGamesByDate = (id, date) => {
    try {
        return Game.getGamesFromPlayerByDate(id, date);
    } catch (error) {
        throw error;
    }
}

const getPlayerGamesByPositionAndDate = (id, position, date) => {
    try {
        if (position === "WHITE") {
            position = "white_player";
        } else {
            position = "black_player";
        }
        return Game.getGamesFromPlayerByPositionAndDate(id, position, date);
    } catch (error) {
        throw error;
    }
}
const playerExists = async (id) => {
    try {

        const player = await Player.getOnePlayer(id);
        return !!player;
    } catch (error) {
        throw error;
    }
};



module.exports = {
    createNewPlayer,
    getAllPlayers,
    getOnePlayer,
    updatePlayer,
    deletePlayer,
    playerExists,
    getPlayerGames,
    getPlayerGamesByPosition,
    getPlayerGamesByDate,
    getPlayerGamesByPositionAndDate
};
