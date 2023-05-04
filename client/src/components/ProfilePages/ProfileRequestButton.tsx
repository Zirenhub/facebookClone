import { useEffect, useState } from 'react';
import { TProfileFriend } from '../../types/Profile';

type Props = {
  requestMutation: () => void;
  friendStatus: TProfileFriend | null;
  myID: string;
  btnClass?: string;
};

function ProfileRequestButton({
  requestMutation,
  friendStatus,
  myID,
  btnClass,
}: Props) {
  const [buttonProps, setButtonProps] = useState({
    class: 'bg-blue-500 hover:bg-blue-600',
    text: 'Add friend',
  });
  useEffect(() => {
    if (friendStatus) {
      const { status, friend } = friendStatus;
      if (status === 'Accepted') {
        setButtonProps({
          class: 'bg-red-500 hover:bg-red-600',
          text: 'Unfriend',
        });
      } else if (status === 'Pending' && friend === myID) {
        setButtonProps({
          class: 'bg-red-500 hover:bg-red-600',
          text: 'Cancel Request',
        });
      } else {
        setButtonProps({
          class: 'bg-green-500  hover:bg-green-600',
          text: 'Accept Friend Request',
        });
      }
    } else {
      setButtonProps({
        class: 'bg-blue-500 hover:bg-blue-600',
        text: 'Add friend',
      });
    }
  }, [friendStatus, myID]);

  return (
    <button
      type="button"
      onClick={requestMutation}
      className={`${buttonProps.class} ${btnClass || ''}`}
    >
      {buttonProps.text}
    </button>
  );
}

ProfileRequestButton.defaultProps = {
  btnClass: undefined,
};

export default ProfileRequestButton;
