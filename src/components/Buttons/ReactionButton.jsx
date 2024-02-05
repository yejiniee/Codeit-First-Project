/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import { useState } from 'react';
import thumbsUp from '../../assets/thumbs-up.svg';
import thumbsDown from '../../assets/thumbs-down.svg';
import storeReaction from '../../services/storeReaction';

export default function ReactionButton({ question: { id, like, dislike } }) {
  const [reaction, setReaction] = useState({
    like,
    dislike,
    likeIcon: thumbsUp,
    dislikeIcon: thumbsDown,
  });
  const handleEmotion = type => {
    if (type === 'like') {
      setReaction({
        like: reaction.like + 1,
        dislike: reaction.dislike,
        likeIcon: thumbsUp,
        dislikeIcon: thumbsDown,
      });
    } else {
      setReaction({
        like: reaction.like,
        dislike: reaction.dislike + 1,
        likeIcon: thumbsUp,
        dislikeIcon: thumbsDown,
      });
    }

    storeReaction({ id, type });
  };

  return (
    <S.ReactionBox>
      <S.LikeBox
        onClick={() => {
          handleEmotion('like');
        }}
        disabled={reaction.disabled}
      >
        <img src={reaction.likeIcon} alt="thumbs-up" />
        <span>좋아요</span>
        <span>{reaction.like}</span>
      </S.LikeBox>
      <S.LikeBox
        onClick={() => {
          handleEmotion('dislike');
        }}
        disabled={reaction.disabled}
      >
        <img src={reaction.dislikeIcon} alt="thumbs-down" />
        <span>싫어요</span>
        <span>{reaction.dislike}</span>
      </S.LikeBox>
    </S.ReactionBox>
  );
}

const ReactionBox = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 1.6rem;

  @media (min-width: 768px) {
    gap: 3.2rem;
  }
`;

const LikeBox = styled.button`
  background-color: inherit;
  border-style: none;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colorGrayScale40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: var(--font-caption1);
  font-style: normal;
  font-weight: var(--weight-medium);
  line-height: 1.8rem; /* 128.571% */

  @media (min-width: 768px) {
    gap: 0.6rem;
  }
`;

const S = {
  ReactionBox,
  LikeBox,
};
