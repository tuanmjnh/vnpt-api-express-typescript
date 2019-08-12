export default {
  dulieubkn: {
    // poolAlias: 'dulieubkn',
    user: "DULIEU_BKN",
    password: "vnpt123",
    connectString: "10.70.53.40/BACKAN",
    poolMin: 1, // let the pool shrink completely
    poolMax: 10, // maximum size of the pool
    poolIncrement: 1, // only grow the pool by one connection at a time
    poolTimeout: 0 // never terminate idle connections
    // externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  },
  ttkdbkn: {
    // poolAlias: 'ttkdbkn',
    user: "TTKD_BKN",
    password: "vnpt@2019",
    connectString: "10.70.53.40/BACKAN",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 1,
    // externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  }
  // // Knex
  // dulieubkn_knex: {
  //   host: "10.70.53.40",
  //   user: "DULIEU_BKN",
  //   password: "vnpt123",
  //   database: "BACKAN",
  //   pool: { min: 0, max: 1 }
  // },
  // ttkdbkn_knex: {
  //   host: "10.70.53.40",
  //   user: "TTKD_BKN",
  //   password: "vnpt@2019",
  //   database: "BACKAN",
  //   pool: { min: 0, max: 1 }
  // }
};
