import { Request, Response, NextFunction } from "express";
import dbapi from "../db_apis/test";
import model from "../models/test";
import { getBody } from "../util/helpers";

export default {
  get: async function (req: Request, res: Response, next: NextFunction) {
    try {
      // check req data
      if (!req.params.id) {
        if (!req.query.flag) req.query = { flag: 1 };
        const result = await dbapi.all(req.query);
        if (!result || result.length < 1) res.status(404).end();
        else res.status(200).json(result).end();
      } else {
        // req.params.id = paresulteInt(req.params.id, 10);
        const result = await dbapi.find({ id: req.params.id });
        if (!result || result.length < 1) res.status(404).end();
        else res.status(200).json(result[0]).end();
      }
    } catch (err) {
      next(err);
    }
  },
  post: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = getBody(model.Context, req);
      if (!body.created_by) {
        res.status(404).json({ msg: "created_by" }).end();
        return;
      }
      if (body.time) body.time = new Date(body.time);
      const result = await dbapi.create(body);
      if (result) res.status(201).json(result).end();
      else res.status(404).end();
    } catch (err) {
      next(err);
    }
  },
  put: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const body = getBody(model.Context, req);
      if (!body.updated_by) {
        res.status(404).json({ msg: "updated_by" }).end();
        return;
      }
      const result = await dbapi.update(body);
      if (result !== null) res.status(200).json(result).end();
      else res.status(404).end();
    } catch (err) {
      next(err);
    }
  },
  patch: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!Array.isArray(req.body)) req.body = [req.body];
      if (req.body.length < 1) {
        res.status(404).json({ msg: "exist" }).end();
        return;
      }
      if (!req.body[0].deleted_by) {
        res.status(404).json({ msg: "deleted_by" }).end();
        return;
      }
      const context = [] as any;
      req.body.forEach((e: any) => {
        if (e.id && e.flag !== undefined) context.push({ id: e.id, flag: e.flag });
      });
      if (context.length < 1) {
        res.status(404).end();
        return;
      }
      const result = await dbapi.updateFlag(context, req.body[0].deleted_by);
      if (result) res.status(200).json(result).end();
      else res.status(404).end();
    } catch (err) {
      next(err);
    }
  },

  delete: async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!Array.isArray(req.body)) req.body = [req.body];
      if (req.body.length < 1) {
        res.status(404).json({ msg: "exist" }).end();
        return;
      }
      if (!req.body[0].deleted_by) {
        res.status(404).json({ msg: "deleted_by" }).end();
        return;
      }
      const context = [] as any;
      req.body.forEach((e: any) => {
        if (e.id) context.push({ id: e.id });
      });
      if (context.length < 1) {
        res.status(404).end();
        return;
      }
      const result = await dbapi.delete(context);
      if (result) res.status(200).json(result).end();
      else res.status(404).end();
    } catch (err) {
      next(err);
    }
  }
};
