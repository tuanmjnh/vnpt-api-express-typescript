import oracledb from "oracledb";

export const Select = function (table: any, model: any, condition: any = "") {
  let rs = "SELECT ";
  Object.keys(model).forEach(key => {
    rs += `${key} "${key}",`;
  });
  rs = `${rs.slice(0, rs.length - 1)} FROM ${table} ${condition}`;
  return rs;
};

export const Find = function (table: any, model: any, context: any = undefined) {
  let rs = "SELECT ";
  Object.keys(model).forEach(key => {
    rs += `${key} "${key}",`;
  });
  rs = `${rs.slice(0, rs.length - 1)} FROM ${table}`;
  if (context) {
    rs += " WHERE ";
    Object.keys(context).forEach(key => {
      rs += `${key}=:${key} AND`;
    });
    rs = rs.slice(0, rs.length - 4);
  }
  return rs;
};

export const Insert = function (table: any, model: any, extras: any = undefined) {
  const query = { key: "", value: "" };
  const returning = { key: "", value: "" };
  Object.keys(model).forEach(key => {
    if (model[key]) {
      if (model[key].dir !== oracledb.BIND_OUT && !model[key].type) {
        query.key += `${key},`;
        query.value += `:${key},`;
      } else {
        returning.key += ` ${key},`;
        returning.value += ` :${key},`;
      }
    }
  });
  if (extras) {
    Object.keys(extras).forEach(key => {
      if (extras[key]) {
        query.key += `${key},`;
        query.value += `${extras[key]},`;
      }
    });
  }
  let rs = `INSERT INTO ${table} (${query.key.slice(0, query.key.length - 1)}) VALUES (${query.value.slice(0, query.value.length - 1)})`;
  // returning
  if (returning.key && returning.value) {
    rs += `\nRETURNING${returning.key.slice(0, returning.key.length - 1)} INTO${returning.value.slice(0, returning.value.length - 1)}`;
  }
  // return query
  return rs;
};

export const Update = function (table: any, model: any, condition: any, extras: any = undefined) {
  let query = "";
  const returning = { key: "", value: "" };
  let where = "";
  Object.keys(model).forEach(key => {
    // if (model[key])
    if (model[key].dir !== oracledb.BIND_OUT && !model[key].type) {
      if (condition[key] === undefined) query += `${key}=:${key},`;
    } else {
      returning.key += ` ${key},`;
      returning.value += ` :${key},`;
    }
  });
  if (extras) {
    Object.keys(extras).forEach(key => {
      if (extras[key] !== undefined) {
        query += `${key}=${extras[key]},`;
      }
    });
  }
  if (condition) {
    Object.keys(condition).forEach(key => {
      if (condition[key] !== undefined) {
        where += `${key}=:${key} and`;
      }
    });
  }
  let rs = `UPDATE ${table} SET ${query.slice(0, query.length - 1)} WHERE ${where.slice(0, where.length - 4)}`;
  // returning
  if (returning.key && returning.value) {
    rs += `\nRETURNING${returning.key.slice(0, returning.key.length - 1)} INTO${returning.value.slice(0, returning.value.length - 1)}`;
  }
  // return query
  return rs;
};

export const Delete = function (table: any, condition: any) {
  let rs = "";
  if (condition) {
    Object.keys(condition).forEach(key => {
      if (condition[key] !== undefined) {
        rs += `${key}=:${key} and`;
      }
    });
  }
  rs = `DELETE ${table} WHERE ${rs.slice(0, rs.length - 4)}`;
  // return query
  return rs;
};
