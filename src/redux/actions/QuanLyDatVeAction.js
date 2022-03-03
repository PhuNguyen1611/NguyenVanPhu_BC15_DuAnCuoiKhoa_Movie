import { useEffect } from "react";
import { quanLyDatVeServices } from "../../services/QuanLyDatVeServices";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { CHUYEN_TAB, DAT_VE_HOAN_TAT, GET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layChiTietPhongVeAction = (maLichChieu) => {

    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeServices.layChiTietPhongVe(maLichChieu)
            console.log('result', result);
            if (result.status === 200) {
                await dispatch({
                    type: GET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
            dispatch(hideLoadingAction)
        } catch (error) {
            console.log('error', error);
            console.log('errorresponedata', error.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeServices.datVe(thongTinDatVe)
            console.log('result', result.data.content);
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({ type: DAT_VE_HOAN_TAT })
            await dispatch(hideLoadingAction)
            dispatch({ type: CHUYEN_TAB })
        } catch (error) {
            console.log('error', error);
            console.log('errorresponedata', error.response?.data);
        }
    }
}