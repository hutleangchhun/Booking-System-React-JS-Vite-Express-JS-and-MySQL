import StatCard from '../../components/Card/StateCard';
import { countAllUsers } from '../../Service/userApi';
import { countAllUnits, fetchAllUnits, fetchAvailableUnits } from '../../Service/unitApi.jsx';
import { countAllBooking } from '../../Service/bookingApi.jsx';
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
                    link='/listuser'
                    linkStyle="text-sm cursor-pointer"
                />
                <StatCard
                    title="Total Units"
                    apiCall={countAllUnits}
                    icon={Icon}
                    iconName="unit"
                    cardColor="border-2 rounded-lg"
                    link='unit-list'
                    linkStyle="text-sm cursor-pointer"

                />
                <StatCard
                    title="Total Booked"
                    apiCall={countAllBooking}
                    icon={Icon}
                    iconName="taxi"
                    cardColor="border-2 rounded-lg"
                    link='/bookinglist'
                    linkStyle="text-sm cursor-pointer"
                />

            </div>
        </>
    );
};

export default Dashboard;
