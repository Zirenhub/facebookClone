import useAuthContext from '../../../hooks/useAuthContext';
import useMessages from '../../../hooks/useMessages';
import { TProfileDefault } from '../../../types/Profile';
import Pfp from '../../../assets/pfp-two.svg';
import ChatMessages from '../ChatMessages';
import ChatFooter from '../ChatFooter';

type Props = {
  profile: TProfileDefault;
  closeChat: (profileID: string) => void;
  minimizeChat: (profile: TProfileDefault) => void;
};

function Chat({ profile, closeChat, minimizeChat }: Props) {
  const auth = useAuthContext();

  const {
    handleLoadPrevious,
    messages,
    handleSend,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useMessages('private', profile._id);

  return (
    <div className="flex flex-col bg-white h-[450px] min-w-[350px] grow rounded-t-lg shadow-lg border">
      <div className="flex justify-between p-2 border-b shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8">
            <Pfp height="100%" width="100%" />
          </div>
          <p>{profile.fullName}</p>
        </div>
        <div className="flex gap-4 text-lg">
          <button type="button" onClick={() => minimizeChat(profile)}>
            -
          </button>
          <button type="button" onClick={() => closeChat(profile._id)}>
            x
          </button>
        </div>
      </div>
      <ChatMessages
        userID={auth.user?._id}
        messages={messages}
        queryStatus={{
          hasNextPage,
          isFetchingNextPage,
          isFetching,
          handleLoadPrevious,
        }}
      />
      <ChatFooter send={handleSend} />
    </div>
  );
}

export default Chat;
