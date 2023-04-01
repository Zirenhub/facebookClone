import moment from 'moment';
import { useEffect } from 'react';
import TMessage from '../../types/Message';

type Props = {
  messages: TMessage[];
  userID: string | undefined;
};

function ChatMessages({ userID, messages }: Props) {
  useEffect(() => {
    const chatMessagesElement = document.getElementById('chatMessages');
    const lastMessage = chatMessagesElement?.lastElementChild;
    lastMessage?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="grow flex flex-col p-3" id="chatMessages">
      {messages.map((m) => {
        const ago = moment(m.createdAt).fromNow();
        const isMyMessage = m.sender === userID;

        return (
          <div
            key={m._id}
            className={`flex flex-col ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
          >
            <div
              className={`p-2 max-w-[280px] w-max flex justify-center rounded-lg text-white ${
                isMyMessage ? 'bg-blue-600 self-end' : 'bg-green-600'
              }`}
            >
              <p>{m.message}</p>
            </div>
            <p
              className={`text-dimGray w-fit ${
                isMyMessage ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {ago}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
