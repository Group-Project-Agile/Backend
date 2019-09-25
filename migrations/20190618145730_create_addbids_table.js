
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('bids')
    return await knex.schema.createTable('bids',table=>{
        table.increments('bidId').primary();
    table.integer('userId');
    table.string('bidImage');
    table.string('bidTitle');
    table.integer('startingPrice');
    table.integer('maxPrice');
    table.integer('marketValue');
    table.date('endingDate');
    table.string('category');
    table.integer('bidCount');
    table.string('status');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('bids')
};
