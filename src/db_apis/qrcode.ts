import * as db from "../services/oracle";

export default {
  getHDDT: async function (context: any) {
    let sql = `select THANG "thang",
    NAM "nam",
    CHUKY "chuky",
    TEN_TT "ten_tt",
    MS_THUE "ms_thue",
    DONVI_ID "donvi_id",
    DIACHI_TT "diachi_tt",
    SODAIDIEN "sodaidien",
    DIENTHOAI_LH "dienthoai_lh",
    MA_TT "ma_tt",
    CUOC_CTHUE "cuoc_cthue",
    CUOC_KTHUE "cuoc_kthue",
    TIEN_KM "tien_km",
    CKTM "cktm",
    HT_VTCI "ht_vtci",
    TIEN "tien",
    VAT "vat",
    TONG "tong",
    css_bkn.doisosangchu(TONG) "tong_chu",
    CANTRU "cantru",
    TONG_PT "tong_pt",
    MANV_TC "manv_tc",
    THANHTOAN_ID "thanhtoan_id",
    TUYENTHU "tuyenthu",
    MA_TT_NEO "ma_tt_neo",
    FKEY "fkey",
    HINHTHUC_TT "hinhthuc_tt",
    STT "stt",
    SERI "seri",
    KH_SERI "kh_seri",
    QRCODE "qrcode",
    TEN_DONVI "ten_donvi",
    TEN_DONVI_QL "ten_donvi_ql",
    STK "stk",
    PATTERN "pattern"
from bcss_bkn.hddt_ezpay_${context.kyhoadon}`;
    if (context.ma_tt && context.ma_tt.length > 0) {
      sql += ` where ma_tt in("${context.ma_tt.join("\",\"")}")`;
    }
    // console.log(context.ma_tt)
    const result = await db.execute(sql) as any;
    return result.rows;
  },
  getKyHoaDon: async function () {
    const sql = `select decode(SIGN(thang-10),-1,("0"||thang),thang)||"/"||nam||" - Chu kỳ "||decode(SIGN(chuky-10),-1,("0"||chuky),chuky) "kyhoadon",
  nam "nam",decode(SIGN(thang-10),-1,("0"||thang),thang) "thang",decode(SIGN(chuky-10),-1,("0"||chuky),chuky) "chuky"
  from(
  select DISTINCT chuky,thang,nam from ttkd_bkn.hddt_ezpay
  ) order by nam,thang,chuky`;
    const result = await db.execute(sql) as any;
    return result.rows;
  },
  getHDDTOld: async function (context: any) {
    let sql = `select THANG "thang",
    NAM "nam",
    CHUKY "chuky",
    TEN_TT "ten_tt",
    MS_THUE "ms_thue",
    DONVI_ID "donvi_id",
    DIACHI_TT "diachi_tt",
    SODAIDIEN "sodaidien",
    DIENTHOAI_LH "dienthoai_lh",
    MA_TT "ma_tt",
    CUOC_CTHUE "cuoc_cthue",
    CUOC_KTHUE "cuoc_kthue",
    TIEN_KM "tien_km",
    CKTM "cktm",
    HT_VTCI "ht_vtci",
    TIEN "tien",
    VAT "vat",
    TONG "tong",
    css_bkn.doisosangchu(TONG) "tong_chu",
    CANTRU "cantru",
    TONG_PT "tong_pt",
    MANV_TC "manv_tc",
    THANHTOAN_ID "thanhtoan_id",
    TUYENTHU "tuyenthu",
    MA_TT_NEO "ma_tt_neo",
    FKEY "fkey",
    HINHTHUC_TT "hinhthuc_tt",
    STT "stt",
    SERI "seri",
    KH_SERI "kh_seri",
    QRCODE "qrcode",
    TEN_DONVI "ten_donvi",
    TEN_DONVI_QL "ten_donvi_ql",
    STK "stk",
    PATTERN "pattern"
from ttkd_bkn.hddt_ezpay where nam=:nam and thang=:thang and chuky=:chuky`;
    if (context.ma_tt && context.ma_tt.length > 0) {
      sql += ` and ma_tt in("${context.ma_tt.join("\",\"")}")`;
    }
    // console.log(context.ma_tt)
    const result = await db.execute(sql, context) as any;
    return result.rows;
  }
};
