import createConnection from '../config/config';

const getXuatXuList = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM xuatxu WHERE trangthai = 1');
        await connection.end();
        return rows;
    } catch (err) {
        console.error("Error fetching XuatXu: ", err);
        throw new Error(`Error fetching XuatXu: ${err.message}`);
    }
};

const getXuatXuByName = async (tenxuatxu) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM xuatxu WHERE tenxuatxu = ? AND trangthai = 1', [tenxuatxu]);
        await connection.end();
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`Error fetching XuatXu by name: ${err.message}`);
    }
};
const getXuatXuByID = async (id) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM xuatxu WHERE maxuatxu = ? AND trangthai = 1', [id]);
        await connection.end();
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        console.error("Error fetching XuatXu by ID: ", err);
        throw new Error(`Error fetching XuatXu by ID: ${err.message}`);
    }
};

const createNewXuatXu = async (tenxuatxu) => {
    try {
        const connection = await createConnection();
        const query = 'INSERT INTO xuatxu (tenxuatxu, trangthai) VALUES (?, 1)';
        await connection.execute(query, [tenxuatxu]);
        await connection.end();
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateXuatXu = async (maxuatxu, tenxuatxu) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE xuatxu SET tenxuatxu = ? WHERE maxuatxu = ?';
        const [result] = await connection.execute(query, [tenxuatxu, maxuatxu]);
        await connection.end();
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteXuatXu = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE xuatxu SET trangthai = 0 WHERE maxuatxu = ?';
        await connection.execute(query, [id]);
        await connection.end();
    } catch (err) {
        throw new Error(err.message);
    }
};

export default { getXuatXuList, getXuatXuByName, getXuatXuByID, createNewXuatXu, updateXuatXu, deleteXuatXu };