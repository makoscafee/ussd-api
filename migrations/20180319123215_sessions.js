exports.up = (knex, Promise) => {
    return knex.schema.createTable('sessions', table => {
        table.increments('id').primary();
        table.string('sessionid');
        table.string('name');
        table.string('currentmenu');
        table.string('number_of_retries');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('sessions');
};
