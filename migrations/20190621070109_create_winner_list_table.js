exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('winner_list')
    return await knex.schema.createTable('winner_list',table=>{
    table.uuid('winner_listId').primary();
    table.integer('winnerId');
    table.integer('bidId');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('winner_list')
};

