exports.up = function (knex) {
  return knex.schema
    .createTable("Projects", (tbl) => {
      tbl.increments();
      tbl.string("ProjectName").notNullable();
      tbl.string("Description");
      tbl.boolean("Completed").notNullable().defaultTo(false);
    })
    .createTable("Resources", (tbl) => {
      tbl.increments();
      tbl.string("ResourceName").notNullable().unique();
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
      tbl.boolean("Completed").notNullable().defaultTo(false);

      tbl
        .integer("project_id")
        .notNullable()
        .references("id")
        .inTable("Projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .string("project_name")
        .notNullable()
        .references("ProjectName")
        .inTable("Projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .string("project_description")
        .notNullable()
        .references("Description")
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
