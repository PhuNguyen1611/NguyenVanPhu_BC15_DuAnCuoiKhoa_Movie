import { http } from "../util/setting";

export class QuanLyNguoiDungServices {

    dangNhap = (thongTinDangNhap) => {
        return http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    dangKy = (thongTinDangKy) => {
        return http.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }

    layThongTinTaiKhoan = () => {
        return http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    capNhatThongTinTaiKhoan = (thongTinCapNhat) => {
        return http.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinCapNhat)
    }

    layDanhSachNguoiDung = (tuKhoa) => {
        if (tuKhoa.trim() !== '') {
            return http.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`)
        }
        return http.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP00`)
    }

    layDanhSachLoaiNguoiDung = () => {
        return http.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    themNguoiDung = (thongTinDangKy) => {
        return http.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinDangKy)
    }

    xoaNguoiDung = (taiKhoan) => {
        return http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    layThongTinNguoiDung = (taiKhoan) => {
        return http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    }

    capNhatThongTinNguoiDung = (thongTinCapNhat) => {
        return http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinCapNhat)
    }
}

export const quanLyNguoiDungServices = new QuanLyNguoiDungServices()