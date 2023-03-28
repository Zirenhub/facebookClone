import TNotification from '../../types/SocketIo';

function NotificationMsg({ notification }: { notification: TNotification }) {
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
    return '...';
  }

  return (
    <>
      <p className="font-bold">
        {notification.sender} {getType(notification.type)}
      </p>
      <p>{notification.message}</p>
    </>
  );
}

export default NotificationMsg;
