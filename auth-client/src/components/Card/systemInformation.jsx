import React, { useEffect, useState } from 'react';
import { getAllSystemInformation } from '../../Service/systemApi';

const SystemInfo = () => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await getAllSystemInformation();
                console.log(data);
                setInfo(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch system info');
            }
        };

        fetchInfo();
    }, []);

    if (error) {
        return <div className="text-red-600 p-4">Error: {error}</div>;
    }

    if (!info) {
        return <div className="p-4">Loading system information...</div>;
    }

    const { system = {}, cpu = {}, os = {}, memory = {} } = info;

    return (
        <div className="p-2 space-y-4">
            <h2 className="text-base font-bold text-gray-700">Device Information</h2>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">System</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Manufacturer: {system.manufacturer}</li>
                    <li>Model: {system.model}</li>
                    <li>Version: {system.version}</li>
                </ul>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Operating System</h3>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Platform: {os.platform}</li>
                    <li>Distro: {os.distro}</li>
                    <li>Release: {os.release}</li>
                    <li>Architecture: {os.arch}</li>
                </ul>
            </div>
            {/**
            <div>
                <h3 className="text-xl font-semibold text-gray-700">Memory</h3>
                <ul className="list-disc pl-5 text-gray-600">
                    <li>Total: {(memory.total / (1024 ** 3)).toFixed(2)} GB</li>
                    <li>Free: {(memory.free / (1024 ** 3)).toFixed(2)} GB</li>
                </ul>
            </div>
            */}
        </div>
    );
};

export default SystemInfo;
