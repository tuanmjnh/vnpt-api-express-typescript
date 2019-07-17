import { Router } from "express";
const router: Router = Router();
// Controller
import common from "../controllers/common";
import * as filemanager from "../controllers/filemanager";
import auth from "../controllers/auth";
import navigation from "../controllers/navigation";
import contractCustomer from "../controllers/contract-customer";
import qrcode from "../controllers/qrcode";
import test from "../controllers/test";
// const test2 = require("../controllers/test2");
// const employees = require("../controllers/employees.js");

// common
router.route("/common/exist").get(common.exist);
router.route("/common/generation-query").post(common.GenerationSelect);
router.route("/common/generation-model").post(common.GenerationModel);
router.route("/common/get-column").post(common.getColumn);
router.route("/transaction/list").get(common.transactionList);
// router.route("/common/get-user-from-token").get(common.getUserFromToken);
// router.route("/common/cursor").get(common.cursor);

// upload data
router
  .route("/filemanager/")
  .get(filemanager.get)
  .post(filemanager.upload, filemanager.post);

// auth
router
  .route("/auth/:id?")
  .get(auth.get)
  .post(auth.post);
// .put(auth.put)
// .delete(auth.delete);

// navigation
router
  .route("/navigation/:id?")
  .get(navigation.get)
  .post(navigation.post)
  .put(navigation.put)
  .patch(navigation.patch);

// contract customer
router
  .route("/contract-customer/:id?")
  .get(contractCustomer.get)
  .post(contractCustomer.post)
  .put(contractCustomer.put)
  .patch(contractCustomer.patch);

// QRCode
router.route("/qrcode")
  .get(qrcode.getKyHoaDon)
  .post(qrcode.getHDDT);
router.route("/qrcode/old").post(qrcode.getHDDTOld);

// test
router
  .route("/test/:id?")
  .get(test.get)
  .post(test.post)
  .put(test.put)
  .patch(test.patch) // update flag
  .delete(test.delete);

// router
//   .route("/test2/:id?")
//   .get(test2.get)
//   .post(test2.post)
//   .put(test2.put)
//   .patch(test2.patch) // update flag
//   .delete(test2.delete);
// router
//   .route("/employees/:id?")
//   .get(employees.get)
//   .post(employees.post)
//   .put(employees.put)
//   .delete(employees.delete);

export default router;
