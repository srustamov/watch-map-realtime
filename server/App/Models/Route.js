module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define(
        "routes", {
            start: {
                type: Sequelize.STRING,
            },
            end: {
                type: Sequelize.STRING,
            },
            speed: {
                type: Sequelize.STRING,
            },
            angle: {
                type: Sequelize.STRING,
            },
            begin_date: {
                type: Sequelize.STRING,
            },
            begin_time: {
                type: Sequelize.STRING,
            },
            finish_date: {
                type: Sequelize.STRING,
            },
            finish_time: {
                type: Sequelize.STRING,
            },
            distance: {
                type: Sequelize.INTEGER,
            },
        }, {
            timestamps: false,
        }
    );

    Route.getByDate = (date) => {
        return Route.findAll({ where: { begin_date: date } });
    }

    return Route;
};