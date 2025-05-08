import { useEffect, useState } from 'react';

const StatCard = ({
    title,
    apiCall,
    icon: Icon,
    iconName,
    cardColor = 'bg-white',
    link = '/listuser',
    linkStyle
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        apiCall().then(setCount).catch(console.error);
    }, [apiCall]);

    return (
        <div className={`p-4 rounded-md shadow-sm ${cardColor}`}>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <p className="text-sm text-gray-600 font-semibold">{title}</p>
                    <p className="text-xl font-semibold text-gray-700">{count}</p>
                </div>
                {Icon && <Icon name={iconName} className="text-xl text-blue-700" />}
            </div>
            <a href={link} className={`text-gray-600 font-semibold ${linkStyle}`}>
                View More
            </a>
        </div>
    );
};

export default StatCard;
