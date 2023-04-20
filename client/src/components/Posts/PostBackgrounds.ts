import postBgOne from '../../assets/post-bg-one.jpg';
import postBgTwo from '../../assets/post-bg-two.jpg';
import postBgThree from '../../assets/post-bg-three.jpg';
import postBgFour from '../../assets/post-bg-four.jpg';

type BackgroundsType = {
  desc: string;
  name: 'post-bg-one' | 'post-bg-two' | 'post-bg-three' | 'post-bg-four';
  src: string;
};

const postBackgrounds: BackgroundsType[] = [
  { desc: 'vinyl player background', name: 'post-bg-one', src: postBgOne },
  { desc: 'animal eyes background', name: 'post-bg-two', src: postBgTwo },
  { desc: 'rain drops background', name: 'post-bg-three', src: postBgThree },
  {
    desc: 'laughing emojis background',
    name: 'post-bg-four',
    src: postBgFour,
  },
];

export default postBackgrounds;
