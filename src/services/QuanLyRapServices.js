import { GROUP_ID, http } from "../util/setting";


export class QuanLyRapServices {

    layDanhSachHeThongRap = () => {
        return http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
    }

    layThongTinLichChieuPhim = (maPhim) => {
        return http.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    layThongTinHeThongRap = () => {
        return http.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
    }

    layThongTinCumRap = (maHeThongRap) => {
        return http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }

}

export const quanLyRapServices = new QuanLyRapServices()