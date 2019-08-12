import oracledb from "oracledb";
import * as db from "../services/oracle";
import model from "../models/navigation";
import { ToUpperCase, ToLowerCase } from "../util/helpers";

// export default {
//   all: async function (context: any) {
//     const result = await db.knex
//       .select(model.Context)
//       .from(model.Table);
//     // .where(model.Context.flag, context.flag);
//     return result;
//   },
//   find: async function (context: any) {
//     const result = await db.knex
//       .select(model.Context)
//       .from(model.Table)
//       .where(model.Key, context.id);
//     return result;
//   },
//   create: async function (context: any) {
//     const result = await db
//       .knex(model.Table)
//       .insert(ToUpperCase(context))
//       .returning([model.Key, model.Context.created_by, model.Context.created_at]);
//     return ToLowerCase(result[0]);
//   },
//   update: async function (id: any, context: any) {
//     const result = await db
//       .knex(model.Table)
//       .update(ToUpperCase(context))
//       .where(model.Key, id)
//       .returning([model.Key, model.Context.updated_by, model.Context.updated_at]);
//     return ToLowerCase(result[0]);
//   },
//   patch: async function (id: any, context: any) {
//     const result = await db
//       .knex(model.Table)
//       .where(model.Key, id)
//       .update(ToUpperCase(context))
//       .returning([model.Key, model.Context.deleted_by, model.Context.deleted_at]);
//     return ToLowerCase(result[0]);
//   },
//   delete: async function (id: any) {
//     const result = await db
//       .knex(model.Table)
//       .where(model.Key, id)
//       .del();
//     return result;
//   }
// };