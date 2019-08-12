import oracledb from "oracledb";
import * as db from "../services/oracle";
import model from "../models/navigation";
// import { ToUpperCase, ToLowerCase } from "../util/helpers";

const sql_select = `select ID "id",
CODE "code",
DEPENDENT "dependent",
LEVELS "levels",
TITLE "title",
ICON "icon",
IMAGE "image",
URL "url",
URL_PLUS "url_plus",
ORDERS "orders",
DESCS "descs",
CREATED_BY "created_by",
CREATED_AT "created_at",
UPDATED_BY "updated_by",
UPDATED_AT "updated_at",
DELETED_BY "deleted_by",
DELETED_AT "deleted_at",
FLAG "flag",
PUSH "push",
GO "go",
STORE "store",
APP_KEY "app_key"
from ttkd_bkn.navigation`;

export default {
  all: async function (binds?: any) {
    const result = await db.execute(sql_select, binds) as any;
    return result.rows;
  },
  find: async function (binds: any) {
    const sql = sql_select + ` where id=:id`;
    const result = await db.execute(sql, binds) as any;
    return result.rows;
  },
  create: async function (binds: any) {
    const sql = `insert into ttkd_bkn.navigation(
    code,dependent,levels,title,icon,image,url,url_plus,
    orders,descs,flag,push,go,store,app_key,created_by,created_at) values(
    :code,:dependent,:levels,:title,:icon,:image,:url,:url_plus,
    :orders,:descs,:flag,:push,:go,:store,:app_key,:created_by,sysdate)
    returning id into :id`;
    binds.id = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT };
    const result = await db.execute(sql, binds) as any;
    if (result.rowsAffected > 0) {
      binds.created_at = new Date();
      binds.id = result.outBinds.id[0];
    } else {
      binds = undefined;
    }
    return binds;
  },
  update: async function (binds: any) {
    const sql = `update ttkd_bkn.navigation set
    dependent=:dependent,levels=:levels,title=:title,icon=:icon,image=:image,
    url=:url,url_plus=:url_plus,orders=:orders,descs=:descs,flag=:flag,
    push=:push,go=:go,store=:store,app_key=:app_key,
    updated_by=:updated_by,updated_at=sysdate
    where id=:id`;
    // returning updated_at into :updated_at`
    const result = await db.execute(sql, binds) as any;
    if (result.rowsAffected > 0) {
      binds.updated_at = new Date();
    } else {
      binds = undefined;
    }
    return binds;
  },
  patch: async function (id: any, binds: any) {
    // checkAuth
    // query
    const sql = `update ttkd_bkn.navigation set
    flag=:flag,deleted_by=:deleted_by,deleted_at=sysdate
    where id=:id`;
    // returning id,flag,deleted_by,deleted_at into :id,:flag,:deleted_by,:deleted_at`;
    // binds
    // binds.id = { type: oracledb.NUMBER, dir: oracledb.BIND_INOUT, val: binds.id };
    // binds.flag = { type: oracledb.NUMBER, dir: oracledb.BIND_INOUT, val: binds.flag };
    // binds.deleted_by = { type: oracledb.STRING, dir: oracledb.BIND_INOUT, val: binds.deleted_by };
    // binds.deleted_at = { type: oracledb.DATE, dir: oracledb.BIND_OUT };
    const result = await db.execute(sql, binds) as any;
    if (result.rowsAffected > 0) {
      binds.deleted_at = new Date();
    } else {
      binds = undefined;
    }
    return binds;
  }
  // delete: async function (id: any) {
  //   const result = await db
  //     .knex(model.Table)
  //     .where(model.Key, id)
  //     .del();
  //   return result;
  // }
};