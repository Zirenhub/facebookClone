type TNotification = {
  type: 'message' | 'post' | 'comment' | 'reaction';
  message: string;
  sender: string;
};

export default TNotification;
