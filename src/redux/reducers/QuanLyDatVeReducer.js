import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe"
import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, GET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType"

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu,
    danhSachGheDangDat: [],
    danhSachGheKhachDangDat: [],
    tabActive: '1',
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case GET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe
            return { ...state }
        }
        case DAT_VE: {
            // console.log(action);
            //Cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe)
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = []
            return { ...state }
        }
        case CHUYEN_TAB: {
            state.tabActive = '2'
            return { ...state }
        }
        case CHANGE_TAB_ACTIVE: {
            state.tabActive = action.number
            return { ...state }
        }
        default: return { ...state }
    }
}