export default {
  hrPool: {
    user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },
  dulieubkn: {
    // poolAlias: 'dulieubkn',
    user: "DULIEU_BKN",
    password: "vnpt123",
    connectString: "10.70.53.40/BACKAN",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  },
  ttkdbkn: {
    // poolAlias: 'ttkdbkn',
    user: "TTKD_BKN",
    password: "vnpt@2019",
    connectString: "10.70.53.40/BACKAN",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  },
  // Knex
  dulieubkn_knex: {
    host: "10.70.53.40",
    user: "DULIEU_BKN",
    password: "vnpt123",
    database: "BACKAN",
    pool: { min: 0, max: 1 }
  },
  ttkdbkn_knex: {
    host: "10.70.53.40",
    user: "TTKD_BKN",
    password: "vnpt@2019",
    database: "BACKAN",
    pool: { min: 0, max: 1 }
  }
};
