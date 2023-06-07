const playersService = require("../services/playersService");

const getAllPlayers = async (req, res) => {
    try {
        console.log("Get all players Controller")
        const allPlayers = await playersService.getAllPlayers();

        await res.send({ status: "OK", data: allPlayers });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOnePlayer = async (req, res) => {
    console.log("Get one player Controller");
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
        const Player = await playersService.getOnePlayer(id);
        res.send({ status: "OK", data: Player });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewPlayer = async (req, res) => {
    const { body } =  req;
    if (!body.username || !body.fullname) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'username', 'fullname'",
            },
        });
    }

    const newPlayer = {
        username: body.username,
        fullname: body.fullname,
    };

    try {
        const createdPlayer = playersService.createNewPlayer(newPlayer);
        res.status(201).send({ status: "OK", data: createdPlayer });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const updatePlayer = async (req, res) => {
    const { body } =  req;
    const {
        params: { id },
    } = await req;
    console.log(body);

    if (!body.username || !body.fullname) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'username', 'fullname'",
            },
        });
    }

    const newPlayer = {
        username: body.username,
        fullname: body.fullname,
        id: id
    };

    try {
        const updatedPlayer = playersService.updatePlayer(newPlayer);
        res.status(201).send({ status: "OK", data: updatedPlayer });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
};

const deletePlayer = async (req, res) => {
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
        const Player = await playersService.deletePlayer(id);
        res.send({ status: "OK", data: Player });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getPlayerGames = async (req, res) => {
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
        const filters = req.query;
        // Tenim aquests filtres:
        // GET /api/v1/jugadors/[ID]/partides?posicio=[WHITE|BLACK] // Filtrar les partides d'un jugador en funció de la posició en la que ha jugat
        // GET /api/v1/jugadors/[ID]/partides?data=[DATA] // Filtrar les partides d'un jugador en funció de la data d'aquestes
        // GET /api/v1/jugadors/[ID]/partides?posicio=[WHITE|BLACK]&data=[DATA] // Combinar els filtres anteriors per obtenir una llista de partides que compleixen ambdós filtres

        if (filters.posicio && filters.data) {
            console.log("Filtre per posicio i data")
            const position = filters.posicio.toUpperCase();
            if (!position || !(position !== "WHITE" || position !== "BLACK")) {
                res.status(400).send({
                    status: "FAILED",
                    data: { error: "Parameter ':position' can not be empty and must be WHITE or BLACK" },
                });
                return;
            }

            const Player = await playersService.getPlayerGamesByPositionAndDate(id, filters.posicio, filters.data);
            res.send({ status: "OK", data: Player });
        } else if (filters.posicio) {
            console.log("Filtre per posicio")
            const position = filters.posicio.toUpperCase();
            if (!position || !(position !== "WHITE" || position !== "BLACK")) {
                res.status(400).send({
                    status: "FAILED",
                    data: { error: "Parameter ':position' can not be empty and must be WHITE or BLACK" },
                });
                return;
            }

            const Player = await playersService.getPlayerGamesByPosition(id, filters.posicio);
            res.send({ status: "OK", data: Player });

        } else if (filters.data) {
            const Player = await playersService.getPlayerGamesByDate(id, filters.data);
            res.send({ status: "OK", data: Player });
        } else {
            const Player = await playersService.getPlayerGames(id);
            res.send({ status: "OK", data: Player });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    createNewPlayer,
    getAllPlayers,
    getOnePlayer,
    updatePlayer,
    deletePlayer,
    getPlayerGames
};
