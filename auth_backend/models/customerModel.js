import { connection } from "../config/db.js";


export const fetchCustomer = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM customers';
        connection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    })
}