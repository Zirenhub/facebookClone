import FriendModel from '../models/friend';

async function getFriendsIds(userID: string) {
  const relationships = await FriendModel.find({
    $and: [
      {
        $or: [{ profile: userID }, { friend: userID }],
      },
      { status: 'Accepted' },
    ],
  });

  const friends = relationships.map((relationship) => {
    // if im the one that accepted the request,
    // give me the request profile id,
    // otherwise give me the id of the profile that accepted the request.
    return relationship.profile.toString() === userID.toString()
      ? relationship.friend
      : relationship.profile;
  });

  return friends;
}

export default getFriendsIds;
