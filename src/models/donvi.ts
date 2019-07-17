export default {
  Table: "TTKD_BKN.NAVIGATION",
  Key: "ID",
  Context: {
    ma_dvi: "MA_DVI",
    donvi_id: "DONVI_ID",
    donvi_ql_id: "DONVI_QL_ID",
    ten_dv: "TEN_DV",
    ten_dv_ql: "TEN_DV_QL",
    stk: "STK",
    sdt: "SDT",
    ma_dv: "MA_DV"
  },
  getContext: function (req: any) {
    return {
      ma_dvi: req.body.ma_dvi,
      donvi_id: req.body.donvi_id,
      donvi_ql_id: req.body.donvi_ql_id,
      ten_dv: req.body.ten_dv,
      ten_dv_ql: req.body.ten_dv_ql,
      stk: req.body.stk,
      sdt: req.body.sdt,
      ma_dv: req.body.ma_dv
    };
  }
};