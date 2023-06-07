const gameService = require("../services/gameService");

const getAllGames = async (req, res) => {
    try {
        console.log("Get all games Controller")
        const allGames = await gameService.getAllGames();

        await res.send({ status: "OK", data: allGames });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneGame = async (req, res) => {
    console.log("Get one game Controller");
    const {
        params: { id },
    } = await req;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':id' can not be empty" },
        });
        return;
    }

    try {
        const Game = await gameService.getOneGame(id);
        res.send({ status: "OK", data: Game });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewGame = async (req, res) => {
    const { body } = req;
    if (!body.white_player || !body.black_player) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'white_player', 'black_player'",
            },
        });
        return;
    }

    const newGame = {
        white_player: body.white_player,
        black_player: body.black_player,
        date: new Date(body.date)
    };

    try {
        const createdGame = await gameService.createNewGame(newGame);
        res.status(201).send({ status: "OK", data: createdGame });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


const updateGame = async (req, res) => {
    const { body } =  req;
    const {
        params: { id },
    } = await req;
    console.log(body);

    if (!body.winner || !id || !body.white_player || !body.black_player || !body.date
        || (body.winner !== "WHITE" && body.winner !== "BLACK" && body.winner !== "DRAW")) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'winner', 'white_player', " +
                    "'black_player', 'date' or 'id' or 'winner' is not 'WHITE', 'BLACK' or 'DRAW'"
            },
        });
    }

    const newGame = {
        white_player: body.white_player,
        black_player: body.black_player,
        date: body.date,
        winner: body.winner,
        id: id
    };

    try {
        const updatedGame = gameService.updateGame(newGame);
        res.status(201).send({ status: "OK", data: updatedGame });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const deleteGame = async (req, res) => {
    const {
        params: { id },
    } = await req;
    if (!id) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter ':id' can not be empty" },
        });
        return;
    }

    try {
        const Game = await gameService.deleteGame(id);
        res.send({ status: "OK", data: Game });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    createNewGame,
    getAllGames,
    getOneGame,
    updateGame,
    deleteGame
};
