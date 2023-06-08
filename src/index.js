const express = require("express");
const v1PlayerRoutes = require("./v1/routes/playerRoutes");
const v1GameRoutes = require("./v1/routes/gameRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const sequelize = require("./database/database");

sequelize.sync().then(() => console.log('db is ready'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/jugadors", v1PlayerRoutes);
app.use("/api/v1/partides", v1GameRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});
