import express from "express";
import { getXuatXuList, addXuatXu, updateXuatXu, deleteXuatXu } from '../controller/xuatxuController.js';
import { getKhachHangList, addKhachHang, updateKhachHang, deleteKhachHang } from '../controller/khachHangController.js';

const router = express.Router();

const initApiRoutes = (app) => {
    // XuatXu routes
    router.get('/xuatxu', getXuatXuList); // API để lấy danh sách xuatxu
    router.post('/xuatxu/add', addXuatXu); // API để thêm xuatxu
    router.put('/update-xuatxu/:maxuatxu', updateXuatXu); // API để cập nhật xuatxu
    router.delete('/delete-xuatxu/:maxuatxu', deleteXuatXu); // API để xóa xuatxu

    // KhachHang routes
    router.get('/khachhang', getKhachHangList); // API để lấy danh sách khách hàng
    router.post('/khachhang/add', addKhachHang); // API để thêm khách hàng
    router.put('/update-khachhang/:id', updateKhachHang); // API để cập nhật khách hàng
    router.delete('/delete-khachhang/:id', deleteKhachHang); // API để xóa khách hàng

    app.use("/api", router);
}

export default initApiRoutes;