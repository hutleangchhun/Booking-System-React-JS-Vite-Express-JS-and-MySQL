import { connection } from "../config/db.js";

export const getUnitById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM units WHERE id = ? ';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return reject('Units not found');
            resolve(results[0]);
        });
    })
}

export const countAllUnits = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS total FROM units';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                resolve(results);
            } else {
                resolve([{ total: 0 }]);
            }
        });
    });
};

export const avialableUnits = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS total FROM units WHERE availability = true';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


export const fetchAllUnit = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM units";
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            if (results && results.length > 0) {
                resolve(results);
            } else {
                resolve([{ total: 0 }]);
            }
        });
    })
};
export const createUnit = (unit_name, unit_type, price_per_night, capacity, availability, image_url, description) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO units 
            (unit_name, unit_type, price_per_night, capacity, availability, image_url, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(query, [unit_name, unit_type, price_per_night, capacity, availability, image_url, description], (err, result) => {
            if (err) {
                console.error('Error in createUnit:', err); // helpful logging
                return reject(err);
            }
            resolve(result.insertId);
        });
    });
};

// Update units
export const updateUnit = (id, unit_name, unit_type, price_per_night, capacity, availability, image_url, description) => {
    return new Promise((resolve, reject) => {

        const query = 'UPDATE units SET unit_name = ?, unit_type = ?, price_per_night = ?, capacity = ?, availability = ?, image_url = ?, description = ? WHERE id = ?';
        connection.query(query, [unit_name, unit_type, price_per_night, capacity, availability, image_url, description, id], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) return reject('Unit not found');
            resolve();
        });

    });
};

export const deleteUnit = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM units WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            if (results.affectedRows === 0) return reject('Units deleted!');
            resolve();
        })
    })
}
