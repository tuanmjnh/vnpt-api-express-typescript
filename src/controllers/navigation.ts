import { Request, Response, NextFunction } from "express";
import authapi from "../db_apis/auth";
import dbapi from "../db_apis/navigation";
import model from "../models/navigation";
// import helpers from "../util/helpers";

export default {
  get: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check req data
      if (!req.params.id) {
        if (!req.query.flag) req.query = { flag: 1 };
        const result = await dbapi.all(req.query);
        if (result && result.length > 0) {
          res.status(200).json(result).end();
        } else {
          res.status(404).json({ msg: "exist", params: "data" }).end();
        }
      } else {
        req.params.id = parseInt(req.params.id, 10);
        const result = await dbapi.find({ id: req.params.id });
        if (result && result.length > 0) {
          res.status(200).json(result[0]).end();
        } else {
          res.status(404).json({ msg: "exist", params: "data" }).end();
        }
      }
    } catch (err) {
      next(err);
    }
  },
  post: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check token
      const user = await authapi.getUserFromToken({ v_token: req.headers.authorization }) as any;
      if (!user) {
        res.status(401).json({ msg: "exist", params: "token" }).end();
        return;
      }
      // binds
      const binds = model.getContext(req) as any;
      binds.code = req.body.code;
      binds.created_by = user.ma_nd;
      // call api
      const result = await dbapi.create(binds);
      if (result) {
        res.status(201).json(result).end();
      } else {
        res.status(404).json({ msg: "exist", params: "data" }).end();
      }
    } catch (err) {
      next(err);
    }
  },
  put: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check params id
      req.params.id = parseInt(req.params.id, 10);
      if (!req.params.id) {
        res.status(404).json({ msg: "exist", params: "id" }).end();
        return;
      }
      // check token
      const user = await authapi.getUserFromToken({ v_token: req.headers.authorization }) as any;
      if (!user) {
        res.status(401).json({ msg: "exist", params: "token" }).end();
        return;
      }
      // binds
      const binds = model.getContext(req) as any;
      binds.id = req.params.id;
      binds.updated_by = user.ma_nd;
      // call api
      const result = await dbapi.update(binds);
      if (result) {
        res.status(200).json({ ...result, ...req.body }).end();
      } else {
        res.status(404).json({ msg: "exist", params: "data" }).end();
      }
    } catch (err) {
      next(err);
    }
  },
  patch: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authapi.getUserFromToken({ v_token: req.headers.authorization }) as any;
      if (!user) {
        res.status(401).json({ msg: "exist", params: "token" }).end();
        return;
      }
      if (!Array.isArray(req.body)) req.body = [req.body];
      if (req.body.length < 1) {
        res.status(404).json({ msg: "exist", params: "data" }).end();
        return;
      }
      const result = [] as any;
      for await (const e of req.body) {
        e.flag = parseInt(e.flag, 10);
        if (e.id && e.deleted_by) {
          await dbapi.patch(e.id, {
            id: e.id,
            flag: e.flag,
            deleted_by: user.ma_nd
          }).then((x) => {
            if (x) result.push(x);
          });
        }
      }
      if (result) {
        res.status(200).json(result).end();
      } else {
        res.status(404).json({ msg: "exist", params: "data" }).end();
      }
    } catch (err) {
      next(err);
    }
  },
  delete: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.params.id) {
        const result = await dbapi.delete(req.params.id);
        if (result) {
          res.status(200).json(result).end();
        } else {
          res.status(404).json({ msg: "exist", params: "data" }).end();
        }
      } else {
        res.status(404).json({ msg: "exist", params: "id" }).end();
      }
    } catch (err) {
      next(err);
    }
  }
};
