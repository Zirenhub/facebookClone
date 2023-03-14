import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import TMessage from '../../types/Message';

type Props = {
  message: TMessage;
  isMyMessage: boolean;
};

function Message({ message, isMyMessage }: Props) {
  const [dateAgo, setDateAgo] = useState<string | null>(null);

  useEffect(() => {
    const ago = moment(message.createdAt).fromNow();
    setDateAgo(ago);
  }, [message]);

  // todo, escape html symbols: ` ' <  >

  return (
    <>
      <div
        className={`p-4 rounded-lg text-center text-white ${
          isMyMessage ? 'bg-blue-600' : 'bg-green-600'
        }`}
      >
        <p>{message.message}</p>
      </div>
      <p
        className={`text-dimGray w-fit ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
      >
        {dateAgo}
      </p>
    </>
  );
}

export default Message;
