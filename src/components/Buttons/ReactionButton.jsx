/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import { useState } from 'react';
import thumbsUp from '../../assets/thumbs-up.svg';
import thumbsDown from '../../assets/thumbs-down.svg';
import clickedThumbsUp from '../../assets/clicked-thumbs-up.svg';
import clickedThumbsDown from '../../assets/clicked-thumbs-down.svg';
import storeReaction from '../../services/storeReaction';

export default function ReactionButton({ question: { id, like, dislike } }) {
  const [reaction, setReaction] = useState({
    like,
    dislike,
    likeIcon: thumbsUp,
    dislikeIcon: thumbsDown,
    disabled: false,
  });
  //  reaction 누르면 빨리 누른거 못따라감
  const handleEmotion = async type => {
    const likeAndDislike = await storeReaction({ id, type }); //  questions/{id}/reaction 보내고 받아오면 그 like, dislike 값 받아와서 상태값 업데이트
    if (type === 'like') {
      setReaction({
        like: likeAndDislike.like,
        dislike: likeAndDislike.dislike,
        likeIcon: clickedThumbsUp,
        dislikeIcon: thumbsDown,
        disabled: true,
      });
    } else {
      setReaction({
        like: likeAndDislike.like,
        dislike: likeAndDislike.dislike,
        likeIcon: thumbsUp,
        dislikeIcon: clickedThumbsDown,
        disabled: true,
      });
    }
    setTimeout(() => {
      setReaction({
        like: likeAndDislike.like,
        dislike: likeAndDislike.dislike,
        likeIcon: thumbsUp,
        dislikeIcon: thumbsDown,
        disabled: false,
      });
    }, [400]);
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
