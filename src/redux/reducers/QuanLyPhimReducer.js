import { GET_DANH_SACH_PHIM, GET_PHIM_DANG_CHIEU, GET_PHIM_SAP_CHIEU, GET_THONG_TIN_PHIM } from "../types/QuanLyPhimType";
import { GET_CHI_TIET_PHIM } from "../types/QuanLyRapType";



const stateDefault = {
    arrPhim: [
        {
            biDanh: "red-notice",
            dangChieu: false,
            danhGia: 9,
            hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/red-notice_gp01.jpg",
            hot: false,
            maNhom: "GP01",
            maPhim: 8575,
            moTa: "In the world of international crime, an Interpol agent attempts to hunt down and capture the world's most wanted art thief.",
            ngayKhoiChieu: "2022-03-10T00:00:00",
            sapChieu: true,
            tenPhim: "red notice",
            trailer: "https://www.youtube.com/watch?v=Pj0wz7zu3Ms"
        },
    ],
    dangChieu: true,
    sapChieu: true,
    arrPhimDefault: [],
    phimDetail: {},
    thongTinPhim: {}

}

export const QuanLyPhimReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case GET_DANH_SACH_PHIM: {
            state.arrPhim = action.arrPhim;
            state.arrPhimDefault = state.arrPhim;
            return { ...state }
        }
        case GET_PHIM_DANG_CHIEU: {
            state.arrPhim = state.arrPhimDefault.filter(film => film.dangChieu === state.dangChieu);
            return { ...state }
        }
        case GET_PHIM_SAP_CHIEU: {
            state.arrPhim = state.arrPhimDefault.filter(film => film.sapChieu === state.sapChieu);
            return { ...state }
        }
        case GET_CHI_TIET_PHIM: {
            state.phimDetail = action.phimDetail
            return { ...state }
        }
        case GET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim
            return { ...state }
        }
        default: return { ...state }
    }
}