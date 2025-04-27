const ErrorMessage = ({ message }) => {
    return (
        <div className="text-red-600 bg-red-100 border border-red-300 rounded p-4">
            <h2 className="font-semibold text-lg mb-1">Something went wrong</h2>
            <p>{message || "Unable to fetch data. Please try again later."}</p>
        </div>
    );
};

export default ErrorMessage;
