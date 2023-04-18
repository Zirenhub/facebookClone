import { useEffect, useState } from 'react';
import { TProfile, TProfileFriend } from '../../../types/Profile';
import SingularPost from '../../HomePage/Mobile/SingularPost';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';
import { ModifiedPost, ReactionTypes } from '../../../types/Post';
import useAuthContext from '../../../hooks/useAuthContext';

type TPages = 'Posts' | 'About' | 'Photos' | 'Videos' | 'Mentions';

type Props = {
  profileProps: {
    profile: TProfile;
    requestMutation: () => void;
    friendStatus: TProfileFriend | null;
  };
  postsProps: {
    posts: ModifiedPost[];
    mutationReactPost: {
      isLoading: boolean;
      isError: boolean;
      error: unknown;
      reactPost: (postId: string, r: ReactionTypes | null) => void;
    };
  };
};

function StangerProfile({ profileProps, postsProps }: Props) {
  const [currentPage, setCurrentPage] = useState<TPages>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);

  const auth = useAuthContext();
  const pages: TPages[] = ['Posts', 'About', 'Photos', 'Videos', 'Mentions'];

  function getRequestButton() {
    const { friendStatus } = profileProps;
    const btnProps = {
      class: 'bg-blue-500',
      text: 'Add friend',
    };
    if (friendStatus) {
      const { status, friend } = friendStatus;
      if (status === 'Accepted') {
        btnProps.text = 'Unfriend';
        btnProps.class = 'bg-red-500';
      } else if (status === 'Pending' && friend === auth.user?._id) {
        btnProps.class = 'bg-red-500';
        btnProps.text = 'Cancel Request';
      } else {
        btnProps.class = 'bg-green-500';
        btnProps.text = 'Accept Friend Request';
      }
    }
    return (
      <button
        type="button"
        onClick={() => profileProps.requestMutation()}
        className={`${btnProps.class} text-white font-bold py-1 rounded-md grow`}
      >
        {btnProps.text}
      </button>
    );
  }

  return (
    <div>
      <ProfileHeader fullName={profileProps.profile.fullName} />
      {requestError && (
        <Popup msg={requestError} close={() => setRequestError(null)} />
      )}
      <div className="flex gap-2 p-2">
        {getRequestButton()}
        <button
          type="button"
          className="bg-gray-200 text-black font-bold py-1 rounded-md grow"
        >
          Message
        </button>
        <button type="button" className="bg-gray-200 px-3 rounded-md font-bold">
          ...
        </button>
      </div>
      <div className="flex justify-between text-dimGray border-b-2">
        {pages.map((page) => {
          return (
            <button
              type="button"
              key={page}
              className={`p-2 ${currentPage === page ? 'text-blue-500' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
      {currentPage === 'Posts' && postsProps.posts && (
        <div className="p-2">
          {postsProps.posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            )
            .map((post) => {
              return (
                <div
                  key={post._id}
                  className="mt-2 border-b-4 border-slate-400"
                >
                  <SingularPost
                    post={post}
                    mutationReactPost={postsProps.mutationReactPost}
                  />
                </div>
              );
            })}
        </div>
      )}
      {/* {status === 'loading' && <p className="text-center">Loading...</p>} */}
    </div>
  );
}

export default StangerProfile;
