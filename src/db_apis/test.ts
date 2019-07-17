import oracledb from "oracledb";
import * as db from "../services/oracle";
import model from "../models/navigation";
import * as tmdb from "../util/tm-db";

export default {
  all: async function (context?: any) {
    const result = await db.execute(tmdb.Find(model.Table, model.Context, context), context) as any;
    return result.rows;
  },
  find: async function (context: any) {
    const result = await db.execute(tmdb.Find(model.Table, model.Context, context), context) as any;
    return result.rows;
  },
  create: async function (context: any) {
    // get created_by
    const created_by = context.created_by;
    // declare outBinds
    context[model.Key] = { dir: oracledb.BIND_OUT, type: oracledb.STRING };
    context.created_by = { dir: oracledb.BIND_OUT, type: oracledb.STRING };
    context.created_at = { dir: oracledb.BIND_OUT, type: oracledb.DATE };
    // build query
    const sql = tmdb.Insert(model.Table, context, {
      created_by: `(select ma_nd from admin_bkn.nguoidung where nguoidung_id=${created_by})`,
      created_at: "SYSDATE"
    });
    // execute query
    const result = await db.execute(sql, context) as any;
    // get outBinds
    context[model.Key] = result.outBinds[model.Key][0];
    context.created_by = result.outBinds.created_by[0];
    context.created_at = result.outBinds.created_at[0];
    // return result
    if (result.rowsAffected) return context;
    else return undefined;
  },
  update: async function (context: any) {
    // get updated_by
    const updated_by = context.updated_by;
    // declare outBinds
    context.updated_by = { dir: oracledb.BIND_OUT, type: oracledb.STRING };
    context.updated_at = { dir: oracledb.BIND_OUT, type: oracledb.DATE };
    // build query
    const sql = tmdb.Update(model.Table, context, { id: context.id }, {
      updated_by: `(select ma_nd from admin_bkn.nguoidung where nguoidung_id=${updated_by})`,
      updated_at: "SYSDATE"
    });
    // execute query
    const result = await db.execute(sql, context) as any;
    console.log(result);
    // get outBinds
    context.updated_by = result.outBinds.updated_by[0];
    context.updated_at = result.outBinds.updated_at[0];
    // return result
    if (result.rowsAffected && result.rowsAffected === 1) return context;
    else return undefined;
  },
  updateFlag: async function (context: any, deleted_by: any) {
    // build query
    const sql = tmdb.Update(model.Table, context[0], { id: "" }, {
      updated_by: `(select ma_nd from admin_bkn.nguoidung where nguoidung_id=${deleted_by})`,
      updated_at: "SYSDATE"
    });
    // let sql = `UPDATE ttkd_bkn.test SET
    // flag=:flag,
    // deleted_by=(select ma_nd from admin_bkn.nguoidung where nguoidung_id=${deleted_by}),
    // deleted_at=SYSDATE
    // WHERE id=:id`;
    // RETURNING deleted_by,deleted_at INTO :deleted_by,:deleted_at`
    // execute query
    // const opts = {
    //   bindDefs: {
    //     id: { type: oracledb.STRING, maxSize: 36 },
    //     flag: { type: oracledb.NUMBER },
    //     deleted_by: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    //     deleted_at: { dir: oracledb.BIND_OUT, type: oracledb.DATE },
    //     // { dir: oracledb.BIND_OUT, type: oracledb.DATE }
    //   }
    // }
    const result = await db.executeMany(sql, context) as any;
    // return result
    if (result.rowsAffected && result.rowsAffected > 0) return result.rowsAffected;
    else return undefined;
  },
  delete: async function (context: any) {
    // build query
    const sql = tmdb.Delete(model.Table, { id: "" });
    // execute query
    const result = await db.executeMany(sql, context) as any;
    // return result
    if (result.rowsAffected && result.rowsAffected > 0) return result.rowsAffected;
    else return undefined;
  }
};
