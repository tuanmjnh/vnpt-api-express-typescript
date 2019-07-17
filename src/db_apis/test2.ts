// const db = require("../services/oracle");
// const model = require("../models/test");
// const helpers = require("../util/helpers");
import * as db from "../services/oracle";
import model from "../models/navigation";
import { ToUpperCase } from "../util/helpers";

export default {
  all: async function (context: any) {
    const result = db.knex
      // .withSchema('TTKD_BKN')
      .select(model.Context) // { id: 'ID' }, { name: 'NAME' }
      .from(model.Table);
    return result;
  },
  find: async function (context: any) {
    const result = db.knex
      .select(model.Context)
      .from(model.Table)
      .where(model.Context.id, context.id);
    return result;
  },
  create: async function (context: any) {
    const result = db
      .knex(model.Table)
      .insert(ToUpperCase(context))
      .returning([model.Key, model.Context.created_by, model.Context.created_at]); // .toSQL()
    return result;
  },
  update: async function (id: any, context: any) {
    const result = db
      .knex(model.Table)
      .update(ToUpperCase(context))
      .where(model.Key, id)
      .returning([model.Key, model.Context.updated_by, model.Context.updated_at]); // .toSQL()
    return result;
  },
  patch: async function (id: any, context: any) {
    const result = await db
      .knex(model.Table)
      .where(model.Key, id)
      .update(ToUpperCase(context));
    return result;
  },

  // module.exports.updateFlag = async function (context) {
  //   let result = 0;
  //   for await (const e of context) {
  //     await db.knex(model.Table)
  //       .where(model.Key, '=', e.id)
  //       .update(ToUpperCase(e))
  //       .then((x) => { result += x });
  //   }
  //   return result;
  // };
  delete: async function (id: any) {
    const result = await db
      .knex(model.Table)
      .where(model.Key, "=", id)
      .del();
    return result;
  }
};
