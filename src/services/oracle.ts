import oracledb from "oracledb";
import oracleConfig from "../config/oracle";
//
// oracledb.maxRows = 10000;

export async function initialize() {
  await oracledb.createPool(oracleConfig.dulieubkn);
}

// module.exports.initialize = initialize;

export async function closePool() {
  await oracledb.getPool().close();
}

// module.exports.close = close;

export function execute(statement: any, binds = [] as any, opts = {} as any) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

export function executeMany(statement: any, binds = [] as any, opts = {} as any) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    opts.batchErrors = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.executeMany(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

export function executeCursor(statement: any, binds = [] as any, opts = {} as any) {
  return new Promise(async (resolve, reject) => {
    let conn: any;
    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;
    // opts.resultSet = true;
    binds.cursor = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT };
    // // add cursor to query
    // statement = `${statement.trim().substr(0, statement.length - 1)},:cursor)`;
    // // build query
    // statement = ` ${statement}; END;`;
    let sql = "";
    Object.keys(binds).forEach(e => {
      sql += `:${e},`;
    });
    sql = `BEGIN\n${statement}(${sql.substr(0, sql.length - 1)});\nEND;`;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(sql, binds, opts);
      result.outBinds.cursor.getRow().then((rs: any) => {
        resolve(rs);
        conn.close();
      });
    } catch (err) {
      reject(err);
    } finally { }
  });
}

export function executeCursors(statement: any, binds = [] as any, opts = {} as any) {
  return new Promise(async (resolve, reject) => {
    opts.outFormat = oracledb.OBJECT;
    binds.cursor = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT };
    // oracledb.fetchAsString = [oracledb.CLOB];
    let conn;
    let sql = "";
    Object.keys(binds).forEach(e => { sql += `:${e},`; });
    sql = `BEGIN\n${statement}(${sql.substr(0, sql.length - 1)});\nEND;`;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(sql, binds, opts) as any;
      const rows = [];
      let row;
      while ((row = await result.outBinds.cursor.getRow())) {
        rows.push(row);
      }
      resolve(rows);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
}

export function GetOutBinds(result: any) {
  const rs = {} as any;
  Object.keys(result.outBinds).forEach(e => {
    rs[e.toLowerCase()] = result.outBinds[e] !== undefined && result.outBinds[e].length > 0 ? result.outBinds[e][0] : undefined;
  });
  return rs;
}

export async function fetchRowsFromRS(connection: any, resultSet: any, numRows: any) {
  return resultSet.getRows( // get numRows rows
    numRows,
    function (err: any, rows: any) {
      if (err) {
        console.log(err);
        doClose(connection, resultSet); // always close the ResultSet
      } else if (rows.length === 0) { // no rows, or no more rows
        doClose(connection, resultSet); // always close the ResultSet
      } else if (rows.length > 0) {
        console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
        console.log(rows);
        fetchRowsFromRS(connection, resultSet, numRows);
      }
    });
}

export function doRelease(connection: any) {
  connection.close(
    function (err: any) {
      if (err) { console.error(err.message); }
    });
}

export function doClose(connection: any, resultSet: any) {
  resultSet.close(
    function (err: any) {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}

// knex
// export const knex = require("knex")({
//   client: "oracledb",
//   connection: {
//     host: oracleConfig.dulieubkn_knex.host,
//     user: oracleConfig.dulieubkn_knex.user,
//     password: oracleConfig.dulieubkn_knex.password,
//     database: oracleConfig.dulieubkn_knex.database
//   },
//   pool: oracleConfig.dulieubkn_knex.pool
// });

// var knex = require("knex")({
//   client: "oracledb",
//   connection: {
//     user: "DULIEU_BKN",
//     password: "vnpt123",
//     database: "BACKAN",
//     host: "10.70.53.40"
//   }
// });
// knex
//   .raw("select * from ttkd_bkn.kehoach_th")
//   .then(data => console.log(JSON.stringify(data)))
//   .catch(err => console.log(err));

// knex.destroy();
