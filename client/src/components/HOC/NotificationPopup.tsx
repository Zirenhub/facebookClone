import TNotification from '../../types/SocketIo';

function NotificationPopup({ notification }: { notification: TNotification }) {
  function getType(type: 'comment' | 'reaction' | 'message' | 'post') {
    if (type === 'comment') {
      return 'commented';
    }
    if (type === 'reaction') {
      return 'reacted';
    }
    if (type === 'message') {
      return 'sent you a message';
    }
    if (type === 'post') {
      return 'posted';
    }
    return 'Something went wrong';
  }

  return (
    <div className="absolute text-center z-50 top-10 p-3 bg-gray-200 rounded-full w-full left-2/4 -translate-x-2/4">
      <p>
        {notification.sender} {getType(notification.type)}
      </p>
      <p>{notification.message}</p>
    </div>
  );
}

export default NotificationPopup;
