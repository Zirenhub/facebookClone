import { useState } from 'react';
import { TProfile, TStrangerProfileMutations } from '../../../types/Profile';
import SingularPost from '../../Posts/SingularPost';
import Popup from '../../Popup';
import ProfileHeader from './ProfileHeader';
import useAuthContext from '../../../hooks/useAuthContext';
import ProfileRequestButton from '../ProfileRequestButton';
import { ModifiedPost } from '../../../types/Post';

type TPages = 'Posts' | 'About' | 'Photos' | 'Videos' | 'Mentions';
type Props = {
  profile: TProfile;
  posts: ModifiedPost[];
  mutations: TStrangerProfileMutations;
};

function StangerProfile({ profile, posts, mutations }: Props) {
  const [currentPage, setCurrentPage] = useState<TPages>('Posts');
  const [requestError, setRequestError] = useState<string | null>(null);

  const auth = useAuthContext();
  const { requestMutation, mutationReactPost } = mutations;
  const pages: TPages[] = ['Posts', 'About', 'Photos', 'Videos', 'Mentions'];

  return (
    <div>
      <ProfileHeader fullName={profile.fullName} />
      {requestError && (
        <Popup msg={requestError} close={() => setRequestError(null)} />
      )}
      <div className="flex gap-2 p-2">
        <ProfileRequestButton
          requestMutation={requestMutation}
          friendStatus={profile.friendStatus}
          myID={auth.user?._id || ''}
          btnClass="py-1 grow text-white font-bold rounded-md"
        />
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
      {currentPage === 'Posts' && posts && (
        <div className="p-2">
          {posts.map((post) => {
            return (
              <div key={post._id} className="mt-2 border-b-4 border-slate-400">
                <SingularPost
                  isMobile
                  post={post}
                  mutationReactPost={mutationReactPost}
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
