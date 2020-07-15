'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoutesSchema extends Schema {
    up() {
        this.create('routes', (table) => {
            table.increments()
            table.string('start')
            table.string('end')
            table.string('speed')
            table.string('angle')
            table.integer('distance')
            table.string('begin_date')
            table.string('begin_time')
            table.string('finish_date')
            table.string('finish_time')
            table.timestamps()
        })
    }

    down() {
        this.drop('routes')
    }
}

module.exports = RoutesSchema
