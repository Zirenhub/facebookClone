export type TSectionButtons = {
  section: string;
  _id: string;
  buttons: {
    name: string;
    _id: string;
    description: string;
  }[];
};

const menuButtons: TSectionButtons[] = [
  {
    section: 'Social',
    _id: 'c9a0b9d8-d30e-11ed-afa1-0242ac120002',
    buttons: [
      {
        name: 'Events',
        _id: 'd5358148-d30e-11ed-afa1-0242ac120002',
        description:
          'Organize or find events and other things to do online and nearby.',
      },
      {
        name: 'Find Friends',
        _id: '8a94c11b-8546-46b3-b70c-0da102ef5601',
        description: 'Search for friends or people you may know.',
      },
      {
        name: 'Groups',
        _id: '6f3e69da-1297-4968-8f15-dc2ec814d01d',
        description: 'Connect with people who share your interests.',
      },
      {
        name: 'News Feed',
        _id: 'c58f4df1-d6e1-4957-aa7f-7ddca7392eb6',
        description: 'See relevant posts from people and Pages you follow.',
      },
      {
        name: 'Feeds',
        _id: '54a89cc1-23db-4702-a4ae-2cf113125f70',
        description:
          'See the most recent posts from your friends, groups, Pages and more.',
      },
      {
        name: 'Pages',
        _id: '3502f7ea-dfd8-4218-b424-eff6eb9f1aba',
        description: 'Discover and connect with businesses on Facebook.',
      },
    ],
  },
  {
    section: 'Entertainment',
    _id: '79a8411c-56ad-4e76-9644-b3df81fd7400',
    buttons: [
      {
        name: 'Gaming Video',
        _id: 'cdef0924-4f5d-4286-b265-fb7734535462',
        description:
          'Watch and connect with your favorite games and streamers.',
      },
      {
        name: 'Play Games',
        _id: '7741a978-80b8-4432-a50f-5fc23ac18a67',
        description: 'Play your favorite games.',
      },
      {
        name: 'Watch',
        _id: '972be13d-63a7-4d16-aa0a-a0a21e55e23e',
        description:
          'A video destination personalized to your interests and connections.',
      },
      {
        name: 'Live videos',
        _id: '0e66474f-2054-4b68-ab14-6aec894c7a4b',
        description: 'Watch popular live videos from around the world.',
      },
    ],
  },
  {
    section: 'Shopping',
    _id: 'ff700a8b-5e89-49e3-9078-173865d19071',
    buttons: [
      {
        name: 'Orders and payments',
        _id: '78d0825c-ec36-4776-916f-452079bf615d',
        description:
          'A seamless, secure way to pay on the apps you already use.',
      },
      {
        name: 'Marketplace',
        _id: '0ab5dfa9-7c40-4249-b4c4-68552aff9e15',
        description: 'Buy and sell in your community.',
      },
    ],
  },
  {
    section: 'Personal',
    _id: 'ea36c570-05d5-4e10-b450-615d86b83a19',
    buttons: [
      {
        name: 'Recent ad activity',
        _id: '9325ed1a-1d27-4b76-8708-03aa26308f38',
        description: 'See all the ads you interacted with on Facebook.',
      },
      {
        name: 'Memories',
        _id: '0f5c4c1b-6b9b-4ad0-9aec-6423555d4a1e',
        description: 'Browse your old photos, videos and posts on Facebook.',
      },
      {
        name: 'Saved',
        _id: '99a15b5a-1639-4ec8-97e8-19251ad8795e',
        description: 'Find posts, photos and videos that you saved for later.',
      },
    ],
  },
  {
    section: 'Professional',
    _id: 'b664c7f4-daea-444b-b664-2f7bfbf13590',
    buttons: [
      {
        name: 'Ads Manager',
        _id: '2b2b9e70-f858-46ff-a1e0-aa3b19872c4d',
        description: 'Create, manage and track the performance of your ads.',
      },
      {
        name: 'Ad Center',
        _id: 'f286ecbf-d58d-4124-9280-3dd408f05474',
        description:
          'Manage all the ads you create in Pages, with streamlined features.',
      },
    ],
  },
  {
    section: 'Community Resources',
    _id: 'e3c0cf4f-9299-45b2-a1e5-262a595d166b',
    buttons: [
      {
        name: 'Climate Science Center',
        _id: 'd00af709-0117-407a-9b18-13e6ab093c3f',
        description: 'Learn about climate change and its effects.',
      },
      {
        name: 'Crisis response',
        _id: 'e46cf050-3cbe-46b9-8351-2e93c516d58f',
        description:
          'Find the latest updates for recent crises happening around the world.',
      },
      {
        name: 'Fundraisers',
        _id: 'b6dca7d3-170d-43f8-ac64-da5f50f2b9a0',
        description:
          'Donate and raise money for nonprofits and personal causes.',
      },
    ],
  },
];

const createButtons = [
  { name: 'Post', _id: '5c24ef67-4330-4582-91a0-39511723e308' },
  { name: 'Story', _id: '080d187f-bd12-4287-b89c-ea87c555c0b9' },
  { name: 'Life Event', _id: 'ce45ed13-f18f-4b5e-bc11-9467c5fb860d' },
  { name: 'Page', _id: '40e481e1-b189-42aa-81c7-658f0648b879' },
  { name: 'Ad', _id: 'f332913e-1039-473b-b925-b3418e5735ae' },
  { name: 'Group', _id: 'b390d436-a333-40ec-9a07-a60493c97f51' },
  { name: 'Event', _id: 'd0f83687-48bb-4606-9c84-d18705cd9082' },
  { name: 'Marketplace listing', _id: '0a7c7dbe-6158-48ac-b3c6-87c77b7f1455' },
  { name: 'Fundraiser', _id: '3ad94081-7ced-4218-9213-db798a83b019' },
];

export { menuButtons, createButtons };
