/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('blogs').del()
    .then(() => {
      return knex('blogs').insert([
        { title: 'First Blog', content: 'This is the first blog', image: 'https://source.unsplash.com/random' },
        { title: 'Second Blog', content: 'This is the second blog', image: 'https://source.unsplash.com/random' }
      ]);
    });
};
