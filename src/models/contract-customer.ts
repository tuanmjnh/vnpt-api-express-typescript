export default {
  Table: "TTKD_BKN.CONTRACT_CUSTOMER",
  Key: "ID",
  Context: {
    id: "ID",
    hdkh_id: "HDKH_ID",
    attach: "ATTACH",
    descs: "DESCS",
    created_by: "CREATED_BY",
    created_at: "CREATED_AT",
    updated_by: "UPDATED_BY",
    updated_at: "UPDATED_AT",
    deleted_by: "DELETED_BY",
    deleted_at: "DELETED_AT",
    flag: "FLAG"
  },
  getContext: function (req: any) {
    return {
      app_key: req.body.app_key,
      hdkh_id: req.body.hdkh_id,
      attach: req.body.attach,
      descs: req.body.descs,
      flag: req.body.flag
    };
  }
};
