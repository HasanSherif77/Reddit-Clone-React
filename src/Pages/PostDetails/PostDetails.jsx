import React from 'react';
import './PostDetails.css';
import PostHeader from '../../Components/PostDetails/PostHeader';
import PostImage from '../../Components/PostDetails/PostImage';
import PostInteractions from '../../Components/PostDetails/PostInteractions';
import CommentsSection from '../../Components/PostDetails/CommentsSection';

const PostDetails = () => {
  const postData = {
    subreddit: 'r/hazbin',
    timeAgo: '1h ago',
    author: 'Tyranical5623',
    authorFlair: '(Lucifer, King of Hell, Duck God)',
    title: 'HEEEY, Lucifer here, Ask me ANYTHING',
    imageUrl: 'https://picsum.photos/600/400',
    voteCount: 130,
    commentCount: 286,
  };

  const comments = [
    {
      id: 1,
      author: 'CharlieMorningstarFan',
      timeAgo: '45m ago',
      content: 'OMG Lucifer! What\'s your favorite thing about running Hell? Also, can you please talk to Charlie more often? She really misses you!',
      voteCount: 42,
      isOP: false,
      replies: [
        {
          id: 11,
          author: 'Tyranical5623',
          timeAgo: '40m ago',
          content: 'Hello there! My favorite thing is definitely the creative torture methods. As for Charlie... well, we have different visions for Hell\'s future.',
          voteCount: 25,
          isOP: true
        },
        {
          id: 12,
          author: 'HuskerGrumpy',
          timeAgo: '35m ago',
          content: 'Leave the old man alone, kid. He\'s got better things to do than family therapy.',
          voteCount: 18,
          isOP: false
        }
      ]
    },
    {
      id: 2,
      author: 'VaggieTheBodyguard',
      timeAgo: '38m ago',
      content: 'Sir, with all due respect, you should visit the hotel more often. Charlie is doing amazing work here.',
      voteCount: 28,
      isOP: false,
      replies: [
        {
          id: 21,
          author: 'AngelDusty',
          timeAgo: '30m ago',
          content: 'Yeah! Come visit! We could use some more daddy energy around here 😉',
          voteCount: 15,
          isOP: false
        }
      ]
    },
    {
      id: 3,
      author: 'AlastorSmiles',
      timeAgo: '30m ago',
      content: '*radio static* Well hello there, Your Majesty! Care for a deal? I do so love making arrangements with royalty. *static continues*',
      voteCount: 67,
      isOP: false,
      replies: [
        {
          id: 31,
          author: 'Tyranical5623',
          timeAgo: '25m ago',
          content: 'Alastor. Still making deals, I see. I\'ll pass - I prefer to keep my soul, thank you very much.',
          voteCount: 32,
          isOP: true
        },
        {
          id: 32,
          author: 'AlastorSmiles',
          timeAgo: '20m ago',
          content: '*static* Such a shame! The offer stands anytime, Your Highness! *maniacal laughter*',
          voteCount: 22,
          isOP: false
        }
      ]
    },
    {
      id: 4,
      author: 'CherriBomb666',
      timeAgo: '25m ago',
      content: 'Hey Luci! When\'s the next hell-wide party? The last one was BLAST! Literally! 😂',
      voteCount: 19,
      isOP: false,
      replies: []
    }
  ];

  return (
    <div className="post-details-page">
      <div className="post-details-container">
        <div className="post-content">
          <PostHeader 
            subreddit={postData.subreddit}
            timeAgo={postData.timeAgo}
            author={postData.author}
            authorFlair={postData.authorFlair}
          />

          <h2 className="post-title">{postData.title}</h2>

          <PostImage imageUrl={postData.imageUrl} />

          <PostInteractions 
            voteCount={postData.voteCount}
            commentCount={postData.commentCount}
          />

          <CommentsSection comments={comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;