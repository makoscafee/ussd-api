exports.up = function(knex, Promise) {
    return knex.schema.createTable('datavalues', table => {
        table.increments('id').primary();
        table.string('sessionid');
        table.string('period');
        table.string('year');
        table.string('datatype');
        table.json('dataValues').defaultTo('[]');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('datavalues');
};
