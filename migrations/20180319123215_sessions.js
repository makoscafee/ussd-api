exports.up = (knex, Promise) => {
    return knex.schema.createTable('sessions', table => {
        table.string('id');
        table.string('sessionid');
        table.string('name');
        table.string('currentmenu');
        table.json('datastore');
        table.integer('retries');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('sessions');
};
