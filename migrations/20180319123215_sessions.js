exports.up = (knex, Promise) => {
    return knex.schema.createTable('sessions', table => {
        table.increments('id').primary();
        table.string('sessionid');
        table.string('currentmenu');
        table.string('nextmenu');
        table.string('prevmenu');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('sessions');
};
