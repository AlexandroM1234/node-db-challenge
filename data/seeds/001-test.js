exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Projects")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Projects").insert([
        { Projects: "wowow", Description: "WOW", Complete: 0 },
      ]);
    });
};
