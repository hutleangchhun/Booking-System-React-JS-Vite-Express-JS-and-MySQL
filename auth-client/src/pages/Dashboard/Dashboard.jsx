import StatCard from '../../components/Card/StateCard';
import { countAllUsers } from '../../Service/userApi';
import { fetchAvailableUnits } from '../../Service/unitApi.jsx';
import Icon from '../../assets/Icons/icons.jsx';
import Welcome from '../../components/Welcome/Welcome.jsx'

const Dashboard = () => {
    return (
        <>
            <Welcome />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    apiCall={countAllUsers}
                    icon={Icon}
                    iconName="user"
                    cardColor="border-2 rounded-lg"
                    linkStyle="text-sm cursor-pointer"
                />
                <StatCard
                    title="Available Units"
                    apiCall={fetchAvailableUnits}
                    icon={Icon}
                    iconName="unit"
                    cardColor="border-2 rounded-lg"
                    linkStyle="text-sm cursor-pointer"

                />
                <StatCard
                    title="Booked"
                    apiCall={countAllUsers}
                    icon={Icon}
                    iconName="taxi"
                    cardColor="border-2 rounded-lg"
                    linkStyle="text-sm cursor-pointer"
                />

            </div>
        </>
    );
};

export default Dashboard;
