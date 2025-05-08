import si from 'systeminformation';

export const getSystemInfo = async (req, res) => {
    try {
        const data = await si.getStaticData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch system info', details: error.message });
    }
};
