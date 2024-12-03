import xuatxuService from '../service/xuatxuService.js';

export const getXuatXuList = async (req, res) => {
    try {
        const xuatXuList = await xuatxuService.getXuatXuList();
        res.status(200).json({ status: "success", message: 'Lấy danh sách xuất xứ thành công', data: xuatXuList });
    } catch (error) {
        console.error('Error fetching XuatXu list:', error);
        res.status(500).json({ status: "error", message: 'Lấy danh sách xuất xứ thất bại', error: error.message });
    }
};

export const addXuatXu = async (req, res) => {
    const { tenxuatxu } = req.body;
    if (!tenxuatxu) {
        return res.status(400).json({ status: "error", message: 'Tên xuất xứ không được để trống' });
    }

    try {
        const existingXuatXu = await xuatxuService.getXuatXuByName(tenxuatxu);
        if (existingXuatXu) {
            return res.status(400).json({ status: "error", message: 'Tên xuất xứ đã tồn tại trong hệ thống' });
        }

        await xuatxuService.createNewXuatXu(tenxuatxu);
        res.status(201).json({ status: "success", message: 'Thêm xuất xứ thành công' });
    } catch (error) {
        console.error('Error adding XuatXu:', error);
        res.status(500).json({ status: "error", message: 'Thêm xuất xứ thất bại', error: error.message });
    }
};

export const updateXuatXu = async (req, res) => {
    const { maxuatxu } = req.params;
    console.log('id:', maxuatxu);
    const { tenxuatxu } = req.body;
    if (!tenxuatxu) {
        return res.status(400).json({ status: "error", message: 'Tên xuất xứ không được để trống' });
    }
    try {
        const existingXuatXu = await xuatxuService.getXuatXuByName(tenxuatxu);
        if (existingXuatXu) {
            return res.status(400).json({ status: "error", message: 'Tên xuất xứ đã tồn tại trong hệ thống' });
        }
        const updated = await xuatxuService.updateXuatXu(maxuatxu, tenxuatxu);
        if (updated) {
            res.status(200).json({ status: "success", message: 'Cập nhật xuất xứ thành công' });
        } else {
            res.status(404).json({ status: "error", message: 'Không tìm thấy xuất xứ' });
        }
    } catch (error) {
        console.error('Error updating XuatXu:', error);
        res.status(500).json({ status: "error", message: 'Cập nhật xuất xứ thất bại', error: error.message });
    }
};

export const deleteXuatXu = async (req, res) => {
    const { maxuatxu } = req.params;
    try {
        const existingXuatXu = await xuatxuService.getXuatXuByID(maxuatxu);
        if (!existingXuatXu) {
            return res.status(404).json({ status: "error", message: 'Không tìm thấy xuất xứ' });
        }
        await xuatxuService.deleteXuatXu(maxuatxu);
        res.status(200).json({ status: "success", message: 'Xóa xuất xứ thành công' });
    } catch (error) {
        console.error('Error deleting XuatXu:', error);
        res.status(500).json({ status: "error", message: 'Xóa xuất xứ thất bại', error: error.message });
    }
};
