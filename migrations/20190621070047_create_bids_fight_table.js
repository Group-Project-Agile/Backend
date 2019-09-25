exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('bids_fight')
    return await knex.schema.createTable('bids_fight',table=>{
        table.increments('bid_fightId').primary();
    table.integer('bidId');
    table.integer('bidderId');
    table.string('bidAmount');
    table.string('status');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('bids_fight')
};
