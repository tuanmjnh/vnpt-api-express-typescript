import oracledb from "oracledb";
import model from "../models/navigation";
import * as db from "../services/oracle";
import * as tmdb from "../util/tm-db";

module.exports.all = async function (context: any) {
  const result = await db.execute(tmdb.Find(model.Table, model.Context, context), context) as any;
  return result.rows;
};

module.exports.find = async function (context: any) {
  const result = await db.execute(tmdb.Find(model.Table, model.Context, context), context) as any;
  return result.rows;
};

module.exports.create = async function (context: any) {
  // get created_by
  const created_by = context.created_by;
  // declare outBinds
  context[model.Key] = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
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
};

module.exports.update = async function (context: any) {
  // get updated_by
  const updated_by = context.updated_by;
  // declare outBinds
  context[model.Key] = { dir: oracledb.BIND_OUT, type: oracledb.NUMBER };
  context.updated_by = { dir: oracledb.BIND_OUT, type: oracledb.STRING };
  context.updated_at = { dir: oracledb.BIND_OUT, type: oracledb.DATE };
  // build query
  const sql = tmdb.Update(model.Table, context, {
    updated_by: `(select ma_nd from admin_bkn.nguoidung where nguoidung_id=${updated_by})`,
    updated_at: "SYSDATE"
  });
  console.log(sql);
  // execute query
  const result = await db.execute(sql, context) as any;
  // get outBinds
  context[model.Key] = result.outBinds[model.Key][0];
  context.updated_by = result.outBinds.updated_by[0];
  context.updated_at = result.outBinds.createupdated_atd_at[0];
  // return result
  if (result.rowsAffected) return context;
  else return undefined;
};
