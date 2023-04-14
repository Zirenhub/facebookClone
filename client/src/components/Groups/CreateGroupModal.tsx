import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createGroup } from '../../api/messages';
import { getFriends } from '../../api/profile';
import { TProfileDefault } from '../../types/Profile';
import Loading from '../Loading';
import InviteFriendCard from './InviteFriendCard';

type TFormData = {
  groupName: string;
  invited: TProfileDefault[];
};

type Props = {
  isMobile: boolean;
  close: () => void;
};

function CreateGroupModal({ isMobile, close }: Props) {
  const [formData, setFormData] = useState<TFormData>({
    groupName: '',
    invited: [],
  });
  const [formError, setFormError] = useState<string | null>(null);

  const { isLoading, isError, data, error } = useQuery<
    TProfileDefault[],
    Error
  >({
    queryKey: ['friends'],
    queryFn: getFriends,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (formData.groupName) {
      try {
        const ids = formData.invited.map((x) => x._id);
        await createGroup({ groupName: formData.groupName, invited: ids });
        close();
      } catch (err) {
        if (err instanceof Error) {
          setFormError(err.message);
        }
      }
    }
  }

  function handleInvite(friend: TProfileDefault) {
    setFormData({
      ...formData,
      invited: [...formData.invited, friend],
    });
  }

  function handleRemove(friend: TProfileDefault) {
    const updatedInvites = formData.invited.filter((x) => x._id !== friend._id);
    setFormData({ ...formData, invited: updatedInvites });
  }

  return (
    <form
      className={`${
        !isMobile
          ? 'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 min-w-[380px] min-h-[380px] bg-white'
          : 'bg-gray-200'
      } p-3  rounded-md m-4 flex flex-col justify-center gap-5`}
      onSubmit={handleSubmit}
    >
      {!isMobile && (
        <button
          type="button"
          onClick={close}
          className="text-dimBlack ml-auto text-lg"
        >
          &#120;
        </button>
      )}
      <label className="sr-only" htmlFor="groupName">
        Group Name
      </label>
      <input
        name="groupName"
        placeholder="Group Name"
        type="text"
        maxLength={25}
        onChange={(e: React.SyntheticEvent) => {
          const target = e.target as HTMLInputElement;
          setFormData({ ...formData, groupName: target.value });
        }}
        className="py-1 px-3 rounded-lg w-full font-bold border-2 border-gray-300"
      />
      <div className="flex flex-col p-2 border-2">
        {formData.invited.length > 0 && (
          <div>
            <p className="text-lg">Invited</p>
            <div className="flex gap-3 overflow-scroll">
              {formData.invited.map((inv) => {
                return (
                  <div key={inv._id} className="bg-gray-100 rounded-md p-2">
                    <p>{inv.fullName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <p className="text-lg">Invite</p>
        <div className="flex gap-3 overflow-scroll">
          {data?.map((f) => {
            return (
              <div key={f._id}>
                <InviteFriendCard
                  friend={f}
                  handleInvite={() => handleInvite(f)}
                  handleRemove={() => handleRemove(f)}
                  isInvited={formData.invited.some((x) => x._id === f._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white rounded-lg w-full py-1 font-bold"
      >
        Create Group
      </button>
      {formError && <p className="text-center">{formError}</p>}
    </form>
  );
}

export default CreateGroupModal;
