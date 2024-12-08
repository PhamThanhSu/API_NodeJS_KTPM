import createConnection from '../config/config';

const getKhachHangList = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM khachhang WHERE trangthai = 1');
        await connection.end();
        return rows;
    } catch (err) {
        throw new Error(`Error fetching khachHang: ${err.message}`);
    }
};

const getKhachHangByName = async (tenKhachHang) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM khachhang WHERE tenkhachhang = ? AND trangthai = 1', [tenKhachHang]);
        await connection.end();
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`Error fetching khachHang by name: ${err.message}`);
    }
};

const getKhachHangByPhone = async (soDienThoai) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM khachhang WHERE sdt = ? AND trangthai = 1', [soDienThoai]);
        await connection.end();
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error fetching khachHang by phone: ", err);
        throw new Error(`Error fetching khachHang by phone: ${err.message}`);
    }
};

const getKhachHangByID = async (id) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM khachhang WHERE makh = ? AND trangthai = 1', [id]);
        await connection.end();
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error fetching khachHang by ID: ", err);
        throw new Error(`Error fetching khachHang by ID: ${err.message}`);
    }
};
const searchNameKhachHang = async (tenKhachHang) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM khachhang WHERE tenkhachhang LIKE ? AND trangthai = 1', [`%${tenKhachHang}%`] 
        );
        await connection.end();
        return rows.length > 0 ? rows : null; 
    } catch (err) {
        throw new Error(`Error fetching khachHang by name: ${err.message}`);
    }
};


const createNewKhachHang = async (tenKhachHang, diaChi, soDienThoai) => {
    try {
        const connection = await createConnection();
        const query = 'INSERT INTO khachhang (tenkhachhang, diachi, sdt, trangthai) VALUES (?, ?, ?, 1)';
        await connection.execute(query, [tenKhachHang, diaChi, soDienThoai]);
        await connection.end();
    } catch (err) {
        console.error("Error creating khachHang: ", err);
        throw new Error(err.message);
    }
};

const updateKhachHang = async (id, tenKhachHang, diaChi, soDienThoai) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE khachhang SET tenkhachhang = ?, diachi = ?, sdt = ? WHERE makh = ?';
        const [result] = await connection.execute(query, [tenKhachHang, diaChi, soDienThoai, id]);
        await connection.end();
        return result.affectedRows > 0;
    } catch (err) {
        console.error("Error updating khachHang: ", err);
        throw new Error(err.message);
    }
};

const deleteKhachHang = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE khachhang SET trangthai = 0 WHERE makh = ?';
        await connection.execute(query, [id]);
        await connection.end();
    } catch (err) {
        throw new Error(err.message);
    }
};



export default { getKhachHangList, getKhachHangByName, getKhachHangByPhone, getKhachHangByID, createNewKhachHang, updateKhachHang, deleteKhachHang, searchNameKhachHang };