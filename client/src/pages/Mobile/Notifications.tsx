/* eslint-disable react/no-array-index-key */
import NotificationMsg from '../../components/HOC/getNotificationMsg';
import { useNotifications } from '../../components/HOC/MobileHeader';

function Notifications() {
  const { notifications, clearNotifications } = useNotifications();

  return (
    <div className="flex flex-col h-full text-center">
      <div className="grow">
        {notifications.map((n, i) => {
          return (
            <div key={i} className="border-2 p-2  bg-gray-100">
              <NotificationMsg notification={n} />
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={clearNotifications}
        className="m-2 ml-auto bg-blue-400 text-white font-bold p-3 w-fit h-8 flex justify-center items-center rounded-full"
      >
        Clear all notifications
      </button>
      <p>Notification are implemented using socket.io.They are not saved.</p>
    </div>
  );
}

export default Notifications;
