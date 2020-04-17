exports.up = function (knex) {
  return knex.schema
    .createTable("Projects", (tbl) => {
      tbl.increments();
      tbl.string("ProjectName").notNullable();
      tbl.string("Description");
      tbl.boolean("Completed").defaultTo(false);
    })
    .createTable("Resources", (tbl) => {
      tbl.increments();
      tbl.string("ResourceName").notNullable();
      tbl.string("Description");

      tbl
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("Projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("Tasks", (tbl) => {
      tbl.increments();
      tbl.string("Description").notNullable();
      tbl.string("Notes");
      tbl.boolean("Completed").defaultTo(false);

      tbl
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("Projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Projects")
    .dropTableIfExists("Resources")
    .dropTableIfExists("Tasks");
};
