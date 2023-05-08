import { useState } from 'react';
import {
  DesktopHeaderButtons,
  MutationReactPost,
  TOwnProfileMutations,
  TProfile,
  TStrangerProfileMutations,
} from '../../../types/Profile';
import ProfileHeader from './ProfileHeader';
import ProfilePostsPage from './ProfilePostsPage';
import { ModifiedPost } from '../../../types/Post';

type Props = {
  profile: TProfile;
  posts: ModifiedPost[];
  isMe: boolean;
  mutations: {
    ownProfile: TOwnProfileMutations;
    strangerProfile: TStrangerProfileMutations;
    mutationReactPost: MutationReactPost;
  };
};

function Profile({ profile, posts, isMe, mutations }: Props) {
  const [currentPage, setCurrentPage] = useState<DesktopHeaderButtons>('Posts');
  const width = 1200;
  const { strangerProfile, ownProfile, mutationReactPost } = mutations;

  return (
    <div className="flex flex-col h-full">
      <div className="w-full shadow-sm flex justify-center z-20">
        <div className="relative" style={{ width }}>
          <ProfileHeader
            fullName={profile.fullName}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            friendStatus={profile.friendStatus}
            requestMutation={isMe ? undefined : strangerProfile.requestMutation}
          />
        </div>
      </div>
      <div className="w-full flex justify-center bg-gray-100 h-full">
        <div
          className="py-4 px-6 flex gap-5 relative overflow-scroll"
          style={{ width }}
        >
          {currentPage === 'Posts' && (
            <ProfilePostsPage
              posts={posts}
              isMe={isMe}
              mutations={{ ownProfile, mutationReactPost }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
