import { v4 as uuidv4 } from 'uuid';
import { TSection, TSectionButtons } from '../types/Desktop';
import friendsSVG from '../assets/find-friends.svg';
import liveSVG from '../assets/live.svg';
import feedsSVG from '../assets/feeds.svg';
import groupsSVG from '../assets/groups.svg';
import marketplaceSVG from '../assets/marketplace.svg';
import watchSVG from '../assets/watch.svg';
import memoriesSVG from '../assets/memories.svg';
import savedSVG from '../assets/saved.svg';
import pagesSVG from '../assets/pages.svg';
import eventsSVG from '../assets/events.svg';
import adCenterSVG from '../assets/ads.svg';
import adsMangerSVG from '../assets/chart.svg';
import climateSVG from '../assets/earth.svg';
import crisisSVG from '../assets/alert.svg';
import heartSVG from '../assets/heart.svg';
import gamingVideoSVG from '../assets/gaming.svg';
import messengerSVG from '../assets/messenger.svg';
import ordersSVG from '../assets/orders.svg';
import playGamesSVG from '../assets/play-games.svg';
import recentSVG from '../assets/recent.svg';

function useBookmars() {
  const homepageBookmarks = [
    { section: 'Find friends', _id: uuidv4(), svg: friendsSVG },
    { section: 'Live videos', _id: uuidv4(), svg: liveSVG },
    { section: 'Feeds', _id: uuidv4(), svg: feedsSVG },
    { section: 'Groups', _id: uuidv4(), svg: groupsSVG },
    { section: 'Marketplace', _id: uuidv4(), svg: marketplaceSVG },
    { section: 'Watch', _id: uuidv4(), svg: watchSVG },
    { section: 'Memories', _id: uuidv4(), svg: memoriesSVG },
    { section: 'Saved', _id: uuidv4(), svg: savedSVG },
    { section: 'Pages', _id: uuidv4(), svg: pagesSVG },
    { section: 'Events', _id: uuidv4(), svg: eventsSVG },
    { section: 'Ad Center', _id: uuidv4(), svg: adCenterSVG },
    { section: 'Ads Manager', _id: uuidv4(), svg: adsMangerSVG },
    { section: 'Climate Science Center', _id: uuidv4(), svg: climateSVG },
    { section: 'Crisis response', _id: uuidv4(), svg: crisisSVG },
    { section: 'Fundraisers', _id: uuidv4(), svg: heartSVG },
    { section: 'Gaming Video', _id: uuidv4(), svg: gamingVideoSVG },
    { section: 'Messenger', _id: uuidv4(), svg: messengerSVG },
    { section: 'Orders and payments', _id: uuidv4(), svg: ordersSVG },
    { section: 'Play Games', _id: uuidv4(), svg: playGamesSVG },
    { section: 'Recent ad activity', _id: uuidv4(), svg: recentSVG },
  ];

  const menuBookmarks: TSectionButtons[] = [
    {
      section: 'Social',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Events',
          _id: uuidv4(),
          description:
            'Organize or find events and other things to do online and nearby.',
        },
        {
          name: 'Find Friends',
          _id: uuidv4(),
          description: 'Search for friends or people you may know.',
        },
        {
          name: 'Groups',
          _id: uuidv4(),
          description: 'Connect with people who share your interests.',
        },
        {
          name: 'News Feed',
          _id: uuidv4(),
          description: 'See relevant posts from people and Pages you follow.',
        },
        {
          name: 'Feeds',
          _id: uuidv4(),
          description:
            'See the most recent posts from your friends, groups, Pages and more.',
        },
        {
          name: 'Pages',
          _id: uuidv4(),
          description: 'Discover and connect with businesses on Facebook.',
        },
      ],
    },
    {
      section: 'Entertainment',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Gaming Video',
          _id: uuidv4(),
          description:
            'Watch and connect with your favorite games and streamers.',
        },
        {
          name: 'Play Games',
          _id: uuidv4(),
          description: 'Play your favorite games.',
        },
        {
          name: 'Watch',
          _id: uuidv4(),
          description:
            'A video destination personalized to your interests and connections.',
        },
        {
          name: 'Live videos',
          _id: uuidv4(),
          description: 'Watch popular live videos from around the world.',
        },
      ],
    },
    {
      section: 'Shopping',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Orders and payments',
          _id: uuidv4(),
          description:
            'A seamless, secure way to pay on the apps you already use.',
        },
        {
          name: 'Marketplace',
          _id: uuidv4(),
          description: 'Buy and sell in your community.',
        },
      ],
    },
    {
      section: 'Personal',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Recent ad activity',
          _id: uuidv4(),
          description: 'See all the ads you interacted with on Facebook.',
        },
        {
          name: 'Memories',
          _id: uuidv4(),
          description: 'Browse your old photos, videos and posts on Facebook.',
        },
        {
          name: 'Saved',
          _id: uuidv4(),
          description:
            'Find posts, photos and videos that you saved for later.',
        },
      ],
    },
    {
      section: 'Professional',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Ads Manager',
          _id: uuidv4(),
          description: 'Create, manage and track the performance of your ads.',
        },
        {
          name: 'Ad Center',
          _id: uuidv4(),
          description:
            'Manage all the ads you create in Pages, with streamlined features.',
        },
      ],
    },
    {
      section: 'Community Resources',
      _id: uuidv4(),
      buttons: [
        {
          name: 'Climate Science Center',
          _id: uuidv4(),
          description: 'Learn about climate change and its effects.',
        },
        {
          name: 'Crisis response',
          _id: uuidv4(),
          description:
            'Find the latest updates for recent crises happening around the world.',
        },
        {
          name: 'Fundraisers',
          _id: uuidv4(),
          description:
            'Donate and raise money for nonprofits and personal causes.',
        },
      ],
    },
  ];

  const menuCreate: TSection[] = [
    { section: 'Post', _id: uuidv4() },
    { section: 'Story', _id: uuidv4() },
    { section: 'Life Event', _id: uuidv4() },
    { section: 'Page', _id: uuidv4() },
    { section: 'Ad', _id: uuidv4() },
    { section: 'Group', _id: uuidv4() },
    { section: 'Event', _id: uuidv4() },
    { section: 'Marketplace listing', _id: uuidv4() },
    { section: 'Fundraiser', _id: uuidv4() },
  ];

  return { homepageBookmarks, menuBookmarks, menuCreate };
}

export default useBookmars;
