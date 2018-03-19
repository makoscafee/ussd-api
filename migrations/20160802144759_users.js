exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('phoneNumber');
        table.string('sessionid');
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
