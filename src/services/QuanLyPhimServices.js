import { GROUP_ID, http } from "../util/setting";

export class QuanLyPhimServices {
    layDanhSachBanner = () => {
        return http.get(`/api/QuanLyPhim/LayDanhSachBanner`)
    }
    layDanhSachPhim = (tenPhim) => {
        if (tenPhim.trim() !== '') {
            return http.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`)
        }
        return http.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
    themPhimUploadHinh = (formData) => {
        return http.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (maPhim) => {
        return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpload = (formData) => {
        return http.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimServices = new QuanLyPhimServices()