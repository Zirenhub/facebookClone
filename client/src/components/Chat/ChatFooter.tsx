import { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import Send from '../../assets/send.svg';
import TMessage from '../../types/Message';

type Props = {
  send: UseMutationResult<TMessage, unknown, string, unknown>;
};

function ChatFooter({ send }: Props) {
  const [message, setMessage] = useState<string>('');

  function handleMessage(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setMessage(target.value);
  }

  return (
    <div className="p-2 sticky bottom-0 bg-white">
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          send.mutate(message);
          setMessage('');
        }}
        className="flex items-center"
      >
        <input
          type="text"
          autoComplete="off"
          className="bg-gray-200 p-2 rounded-full grow"
          onChange={handleMessage}
          value={message}
        />
        <button className="h-8 w-8" type="submit">
          <Send
            height="100%"
            width="100%"
            fill={message ? 'rgb(96 165 250)' : 'rgb(209 213 219)'}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatFooter;
