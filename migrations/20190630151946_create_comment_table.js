exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('comment')
    return await knex.schema.createTable('comment', table=>{
        table.increments('comment_id').primary();
        table.integer('bidId');
        table.integer('userId');
        table.string('Comment');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('post_review')
};