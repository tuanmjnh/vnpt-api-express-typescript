import fs from "fs";

const public_path = `${process.env.ROOT}\\public`; // `${__dirname}\\..\\public\\`;
const createDir = async function (opts: any) {
  try {
    const list_dir = opts.dir.replace(/^\/|\/$/g, "").split("/");
    const result = {
      path: public_path,
      list: [] as any
    };
    // create public if not exist
    if (!fs.existsSync(result.path)) await fs.mkdirSync(result.path);
    // loop list path to create
    for await (const e of list_dir) {
      result.path = `${result.path}/${e}/`;
      if (!fs.existsSync(result.path)) {
        await fs.mkdirSync(result.path);
        result.list.push(e);
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const getExtention = function (path: any, dot: boolean = true) {
  if (!path) return "";
  const regx = /(?:\.([^.]+))?$/;
  path = regx.exec(path);
  return path ? (dot ? path[0] : path[1]) : "";
};

export default { createDir, getExtention };
