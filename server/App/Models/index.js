const path = require("path");
const Sequelize = require("sequelize");

const config = use("configs/database.js");


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    logging: false,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

let DB = {};

DB.Sequelize = Sequelize;
DB.sequelize = sequelize;

require("fs")
    .readdirSync(path.join(__dirname, "/"))
    .forEach((file) => {
        if (file !== path.basename(__filename) && path.extname(file) === ".js") {
            DB[path.parse(file).name] = require(path.join(__dirname, file))(
                sequelize,
                Sequelize
            );
        }
    });

module.exports = DB;