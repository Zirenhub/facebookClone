import { ModifiedPost } from '../../../types/Post';
import {
  MutationReactPost,
  TOwnProfileMutations,
} from '../../../types/Profile';
import ProfilePosts from './ProfilePosts';

type Props = {
  posts: ModifiedPost[];
  isMe: boolean;
  mutations: {
    ownProfile: TOwnProfileMutations;
    mutationReactPost: MutationReactPost;
  };
};

function ProfilePostsPage({ posts, isMe, mutations }: Props) {
  const cardClass = 'bg-white p-3 shadow-md rounded-lg';
  const introButtons = [
    'Add bio',
    'Edit details',
    'Add hobies',
    'Add featured',
  ];

  return (
    <>
      <div className="flex flex-col grow gap-4 sticky top-0">
        <div className={`flex flex-col ${cardClass} gap-3`}>
          <p className="font-bold text-xl">Intro</p>
          {isMe ? (
            introButtons.map((b) => {
              return (
                <button
                  type="button"
                  key={b}
                  className="rounded-lg bg-gray-200 py-2 hover:bg-gray-300"
                >
                  {b}
                </button>
              );
            })
          ) : (
            <p className="text-center font-bold">
              This is empty space...for now
            </p>
          )}
        </div>
        {['Photos', 'Friends'].map((b) => {
          return (
            <div className={`${cardClass} flex justify-between`} key={b}>
              <button
                type="button"
                className="font-bold text-xl hover:underline"
              >
                {b}
              </button>
              <button
                type="button"
                className="text-blue-400 hover:bg-gray-100 rounded-md p-2"
              >
                See all {b}
              </button>
            </div>
          );
        })}
      </div>
      <ProfilePosts posts={posts} isMe={isMe} mutations={mutations} />
    </>
  );
}

export default ProfilePostsPage;
