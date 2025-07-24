import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

function OfflineScreen({ children }) {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return children;
  }

  return (
    <div className="fixed inset-0 bg-primary-500 bg-opacity-50 z-50 flex flex-col justify-center items-center text-center p-4">
      <div className="bg-white p-10 rounded-lg shadow-xl">
        <FontAwesomeIcon
          icon={faWifi}
          className="text-red-500 text-6xl mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          You're Currently Offline
        </h1>
        <p className="text-gray-600">
          Please check your internet connection to continue browsing.
        </p>
      </div>
    </div>
  );
}
export default OfflineScreen;