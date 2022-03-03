import { http } from "../util/setting";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";


export class QuanLyDatVeServices {

    layChiTietPhongVe = (maLichChieu) => {
        return http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    // thongTinDatVe = {
    //     "maLichChieu": 0,
    //     "danhSachVe": [
    //         {
    //             "maGhe": 0,
    //             "giaVe": 0
    //         }
    //     ]
    // }
    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return http.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }
    taoLichChieu = (thongTinLichChieu) => {
        return http.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
    }

}

export const quanLyDatVeServices = new QuanLyDatVeServices()