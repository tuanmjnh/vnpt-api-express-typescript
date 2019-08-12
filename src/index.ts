import dotenv from "dotenv";
import * as webServer from "./services/web-server";
import * as oracleDB from "./services/oracle";
import oracleConfig from "./config/oracle";

// Load environment variables from .env file, where API keys and passwords are configured

if (process.env.NODE_ENV !== "production") {
  process.env.NODE_ENV = "development";
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config({ path: ".env" });
}

// import path from "path";
process.env.ROOT = __dirname; // Root path

const defaultThreadPoolSize = 4;

// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = (oracleConfig.dulieubkn.poolMax + defaultThreadPoolSize) as any;

/**
 * Start Express server.
 */
async function startup() {
  console.log("Starting application");

  try {
    console.log("Initializing database module");

    await oracleDB.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }

  try {
    console.log("Initializing web server module");

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

startup();

async function shutdown(e: any) {
  let err = e;

  console.log("Shutting down application");

  try {
    console.log("Closing web server module");

    await webServer.close();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  try {
    console.log("Closing database oracle module");
    await oracleDB.closePool();
  } catch (e) {
    console.error(e);

    err = err || e;
  }

  console.log("Exiting process");

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");

  shutdown(undefined);
});

process.on("SIGINT", () => {
  console.log("Received SIGINT");

  shutdown(undefined);
});

process.on("uncaughtException", err => {
  console.log("Uncaught exception");
  console.error(err);

  shutdown(err);
});

// const server = app.listen(app.get("port"), () => {
//   console.log(
//     "  App is running at http://localhost:%d in %s mode",
//     app.get("port"),
//     app.get("env")
//   );
//   console.log("  Press CTRL-C to stop\n");
// });

// export default server;
