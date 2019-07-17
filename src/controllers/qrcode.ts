import { Request, Response, NextFunction } from "express";
import dbapi from "../db_apis/qrcode";
import { ToDate } from "../util/helpers";

export default {
  getHDDT: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check req data
      if (!req.body.kyhoadon) {
        res.status(404).json({ msg: "exist", params: "kydoadon" });
      }
      req.body.kyhoadon = ToDate(req.body.kyhoadon, "YYYYMM01");
      // console.log(req.query)
      const result = await dbapi.getHDDT(req.body);
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "exist", params: "data" });
      }
    } catch (err) {
      next(err);
    }
  },
  getKyHoaDon: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await dbapi.getKyHoaDon();
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "exist", params: "data" });
      }
    } catch (err) {
      next(err);
    }
  },
  getHDDTOld: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check req data
      if (!req.body.kyhoadon || req.body.kyhoadon.length < 3) {
        res.status(404).json({ msg: "exist", params: "kydoadon" });
      }
      const context = {
        nam: parseInt(req.body.kyhoadon[0]),
        thang: parseInt(req.body.kyhoadon[1]),
        chuky: parseInt(req.body.kyhoadon[2])
      };
      // console.log(context)
      const result = await dbapi.getHDDTOld(context);
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ msg: "exist", params: "data" });
      }
    } catch (err) {
      next(err);
    }
  }
};
