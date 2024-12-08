import khachHangService from '../service/khachHangService.js';

export const getKhachHangList = async (req, res) => {
    try {
        const khachHangList = await khachHangService.getKhachHangList();
        res.status(200).json({ status: "success", message: 'Lấy danh sách khách hàng thành công', data: khachHangList });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Lấy danh sách khách hàng thất bại', error: error.message });
    }
};

export const searchKhachHang = async (req, res) => {
    const { id, tenkhachhang } = req.body;
    try {
        // Nếu không có cả id và tenkhachhang
        if (!id && !tenkhachhang) {
            const khachHangList = await khachHangService.getKhachHangList();
            return res.status(200).json({ status: "success", message: "Trả về toàn bộ danh sách khách hàng", data: khachHangList});
        }
        // Nếu có id, tìm theo ID
        if (id) {
            const khachHangById = await khachHangService.getKhachHangByID(id);
            if (!khachHangById) {
                return res.status(404).json({ status: "error", message: "Không tìm thấy khách hàng với ID được cung cấp " });
            }
            return res.status(200).json({ status: "success", message: "Tìm kiếm khách hàng theo ID thành công", data: khachHangById});
        }
        // Nếu có tenkhachhang, tìm theo tên
        if (tenkhachhang) {
            const khachHangByName = await khachHangService.searchNameKhachHang(tenkhachhang);
            if (!khachHangByName) {
                return res.status(404).json({ status: "error", message: "Không tìm thấy khách hàng với tên được cung cấp" });
            }
            return res.status(200).json({ status: "success", message: "Tìm kiếm khách hàng theo tên thành công", data: khachHangByName});
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Lỗi khi tìm kiếm', error: error.message });
    }
};

export const getKhachHangByName = async (req, res) => {
    const { tenkhachhang } = req.body;
    try {
        const khachHang = await khachHangService.getKhachHangByName(tenkhachhang);
        if (khachHang) {
            return res.status(400).json({ status: "error", message: 'Tên khách hàng đã tồn tại trong hệ thống' });
        }
        if (!khachHang) {
            return res.status(404).json({ status: "error", message: 'Không tìm thấy khách hàng' });
        }
        res.status(200).json({ status: "success", message: 'Tìm kiếm khách hàng thành công', data: khachHang });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Lỗi khi tìm kiếm', error: error.message });
    }
};

const validateKhachHang = (tenkhachhang, diachi, sdt) => {
    if (!tenkhachhang) {
        return { valid: false, message: 'Tên khách hàng không được để trống' };
    }
    if (!diachi) {
        return { valid: false, message: 'Địa chỉ không được để trống' };
    }
    if (!sdt) {
        return { valid: false, message: 'Số điện thoại không được để trống' };
    }

    if (sdt.length !== 10 || sdt[0] !== '0' || !/^\d+$/.test(sdt)) {
        return { valid: false, message: 'Số điện thoại phải đủ 10 chữ số, bắt đầu bằng số 0 và chỉ chứa ký tự số' };
    }
    return { valid: true };
};

export const addKhachHang = async (req, res) => {

    const { tenkhachhang, diachi, sdt } = req.body;
    const validation = validateKhachHang(tenkhachhang, diachi, sdt);
    if (!validation.valid) {
        return res.status(400).json({ status: "error", message: validation.message });
    }

    try {
        const existingKhachHangByName = await khachHangService.getKhachHangByName(tenkhachhang);
        if (existingKhachHangByName) {
            return res.status(400).json({ status: "error", message: 'Tên khách hàng đã tồn tại trong hệ thống' });
        }

        const existingKhachHangByPhone = await khachHangService.getKhachHangByPhone(sdt);
        if (existingKhachHangByPhone) {
            return res.status(400).json({ status: "error", message: 'Số điện thoại đã tồn tại trong hệ thống' });
        }

        await khachHangService.createNewKhachHang(tenkhachhang, diachi, sdt);
        res.status(201).json({ status: "success", message: 'Thêm khách hàng thành công' });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Thêm khách hàng thất bại', error: error.message });
    }
};

export const updateKhachHang = async (req, res) => {
    const { id } = req.params;
    const { tenkhachhang, diachi, sdt } = req.body;
    const validation = validateKhachHang(tenkhachhang, diachi, sdt);

    if (!validation.valid) {
        return res.status(400).json({ status: "error", message: validation.message });
    }
    try {
        const existingKhachHangByName = await khachHangService.getKhachHangByName(tenkhachhang);
        if (existingKhachHangByName && existingKhachHangByName.id !== id) {
            return res.status(400).json({ status: "error", message: 'Tên khách hàng đã tồn tại trong hệ thống' });
        }

        const existingKhachHangByPhone = await khachHangService.getKhachHangByPhone(sdt);
        if (existingKhachHangByPhone && existingKhachHangByPhone.id !== id) {
            return res.status(400).json({ status: "error", message: 'Số điện thoại đã tồn tại trong hệ thống' });
        }

        const updated = await khachHangService.updateKhachHang(id, tenkhachhang, diachi, sdt);
        if (updated) {
            res.status(200).json({ status: "success", message: 'Cập nhật khách hàng thành công' });
        } else {
            res.status(404).json({ status: "error", message: 'Không tìm thấy khách hàng' });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Cập nhật khách hàng thất bại', error: error.message });
    }
};

export const deleteKhachHang = async (req, res) => {
    const { id } = req.params;
    try {
        const existingKhachHang = await khachHangService.getKhachHangByID(id);
        if (!existingKhachHang) {
            return res.status(404).json({ status: "error", message: 'Không tìm thấy khách hàng' });
        }
        await khachHangService.deleteKhachHang(id);
        res.status(200).json({ status: "success", message: 'Xóa khách hàng thành công' });
    } catch (error) {
        console.error('Error deleting khachHang:', error);
        res.status(500).json({ status: "error", message: 'Xóa khách hàng thất bại', error: error.message });
    }
};
