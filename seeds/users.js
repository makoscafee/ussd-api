exports.seed = function(knex, Promise) {
    return knex('users')
        .del()
        .then(function() {
            return knex('users').insert([
                {
                    id: 99901,
                    name: 'Ambitious Aardvark',
                    phoneNumber: '255755300989',
                    sessionid: 99901
                },
                {
                    id: 99902,
                    name: 'Bamboozled Baboon',
                    email: 'baboon@example.org',
                    sessionid: 99902
                }
            ]);
        });
};
