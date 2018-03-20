exports.up = function(knex, Promise) {
    return knex.schema.createTable('datastores', table => {
        table.increments('id').primary();
        table.string('sessionid');
        table.json('menus');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('datastores');
};
