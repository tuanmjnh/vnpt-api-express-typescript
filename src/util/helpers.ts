const moment = require("moment");

export const getBody = function (obj: any, req: any) { // req: Request
  const rs = {} as any;
  Object.keys(obj).forEach(e => {
    if (req.body && req.body[e] !== undefined) rs[e] = req.body[e];
  });
  return rs;
};

export const toTimestamp = function (strDate: any) {
  const datum = Date.parse(strDate);
  return datum / 1000;
};

export const ToUpperCase = function (obj: any) {
  const rs = {} as any;
  Object.keys(obj).forEach(e => {
    rs[e.toUpperCase()] = obj[e];
  });
  return rs;
};

export const ToLowerCase = function (obj: any) {
  const rs = {} as any;
  Object.keys(obj).forEach(e => {
    rs[e.toLowerCase()] = obj[e];
  });
  return rs;
};

export const RandomDate = function (start: any, end: any) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const NewGuid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const ToDate = function (timestamp: any, format: string = undefined) {
  timestamp = parseInt(timestamp);
  if (format) {
    return moment(timestamp).format(format);
  } else {
    return moment(timestamp).toDate();
  }
};
