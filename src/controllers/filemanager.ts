import { Request, Response, NextFunction } from "express";
import io from "../util/io";
import multer from "multer";

export const storage = multer.diskStorage({
  destination: async function (req: Request, file: any, cb: any) {
    const create_dir = await io.createDir({ dir: req.headers.path });
    cb(undefined, create_dir.path);
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(undefined, file.originalname);
  }
});

export const upload = multer({ storage: storage }).array("file-upload");

export const get = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const result = "File manager";
    if (result) res.status(201).json(result).end();
    else res.status(404).json({ msg: "exist", params: "data" }).end();
  } catch (err) {
    next(err);
  }
};

export const post = async function (req: any, res: Response, next: NextFunction) {
  try {
    const result = []; // await dbapi.create(body);
    for (const e of req.files) {
      result.push({
        path: req.headers.path,
        size: e.size,
        originalname: e.filename,
        filename: `${req.headers.path}/${e.filename}`,
        extension: io.getExtention(e.filename),
        mimetype: e.mimetype
      });
    }
    if (result) res.status(201).json(result).end();
    else res.status(404).json({ msg: "exist", params: "data" }).end();
  } catch (err) {
    next(err);
  }
};
