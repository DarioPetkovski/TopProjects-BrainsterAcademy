import React, { useEffect, useState } from "react";
import { PostInterface, User } from "../Interfaces/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useGlobalContext } from "../context/Context";
import { useRouter } from "next/navigation";

function UserPost({ id }: { id: string }) {
  const router = useRouter();
  const { user, data } = useGlobalContext();
  const [post, setPost] = useState<PostInterface>();
  const findPost = data?.posts.find((post: PostInterface) => post?.id === id);
  const findUser = data?.users.find(
    (user: User) => user?.id === findPost?.userID
  );
  const [likedPost, setLikedPost] = useState<boolean | undefined>(false);
  const [dislikedPost, setDislikedPost] = useState<boolean | undefined>(false);

  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );
  const findFriends = loggedUser?.friends.filter((friend: string) => {
    return data?.comments.some((comment: any) => {
      return comment.userID === friend;
    });
  });
  const findFriendUsers = data?.users.filter((user: User) => {
    return findFriends?.some((friend: string) => {
      return friend === user?.id;
    });
  });
  const findFriendComments = data?.comments?.filter((comment: any) => {
    return findFriends?.some((user: string) => {
      return user === comment?.userID;
    });
  });

  useEffect(() => {
    if (loggedUser) {
      const isLiked = findPost?.likes?.includes(loggedUser?.id);
      const isDisliked = findPost?.dislikes?.includes(loggedUser?.id);
      setLikedPost(isLiked);
      setDislikedPost(isDisliked);
      setPost(findPost);
    }
  }, [findPost, loggedUser]);

  const toggleLikePost = async () => {
    if (!post) return;
    let updatedPost: PostInterface;
    if (loggedUser) {
      if (likedPost) {
        updatedPost = {
          ...post,
          likes: post?.likes?.filter((like: string) => like !== loggedUser?.id),
        };
      } else {
        updatedPost = {
          ...post,
          likes: [...post?.likes, loggedUser?.id],
        };
        if (dislikedPost) {
          updatedPost.dislikes = updatedPost?.dislikes?.filter(
            (dislike: string) => dislike !== loggedUser?.id
          );
          setDislikedPost(false);
        }
      }
      try {
        await axios.put(`http://localhost:5001/posts/${post?.id}`, updatedPost);
      } catch (err) {
        console.log(err);
      }
      setPost(updatedPost);
      setLikedPost(!likedPost);
    }
  };

  const toggleDislikePost = async () => {
    if (!post) return;
    let updatedPost: PostInterface;
    if (loggedUser) {
      if (dislikedPost) {
        updatedPost = {
          ...post,
          dislikes: post?.dislikes?.filter(
            (dislike: string) => dislike !== loggedUser?.id
          ),
        };
      } else {
        updatedPost = {
          ...post,
          dislikes: [...post?.dislikes, loggedUser?.id],
        };
        if (likedPost) {
          updatedPost.likes = updatedPost?.likes?.filter(
            (like: string) => like !== loggedUser?.id
          );
          setLikedPost(false);
        }
      }
      try {
        await axios.put(`http://localhost:5001/posts/${post?.id}`, updatedPost);
      } catch (err) {
        console.log(err);
      }
      setPost(updatedPost);
      setDislikedPost(!dislikedPost);
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <div style={{ width: "75%" }} className="post mt-2">
        <div className="d-flex align-items-center justify-content-between pointer">
          <div className="d-flex align-items-center">
            <div
              onClick={() =>
                router.push(
                  `${
                    loggedUser?.id !== post?.userID
                      ? `/user/${findUser?.id}`
                      : "/accountPage"
                  }`
                )
              }
              style={{ width: "50px", borderRadius: "50%" }}
            >
              <img
                style={{ borderRadius: "50%" }}
                className="w-100"
                src={findUser?.img}
                alt=""
              />
            </div>
            <p className="mb-0 px-3">{findPost?.content}</p>
          </div>
          <div className="d-flex align-items-center">
            <div
              onClick={() => toggleLikePost()}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              {!likedPost && (
                <div className="d-flex flex-column align-items-center px-2">
                  <img src="/assets/images/likeIcon.png" alt="" />
                  <p className="mb-0 px-2 pt-1">{post?.likes?.length}</p>
                </div>
              )}
              {likedPost && (
                <div className="d-flex flex-column align-items-center px-2">
                  <div>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={{ color: "blue", fontSize: "22px" }}
                    />
                  </div>
                  <p className="mb-0 px-2 pt-1">{post?.likes?.length}</p>
                </div>
              )}
            </div>
            <div
              onClick={() => toggleDislikePost()}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              {!dislikedPost && (
                <div className="d-flex flex-column align-items-center">
                  <img src="/assets/images/dislikeIcon.png" alt="" />
                  <p className="mb-0 px-2 pt-1">{post?.dislikes?.length}</p>
                </div>
              )}
              {dislikedPost && (
                <div className="d-flex flex-column align-items-center">
                  <div>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      style={{ color: "blue", fontSize: "22px" }}
                    />
                  </div>
                  <p className="mb-0 px-2 pt-1">{post?.dislikes?.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {findPost?.text && (
          <div className="main_comment mt-3 p-3">
            <p className="mb-0">{findPost?.text}</p>
          </div>
        )}
      </div>
      <div className="friendsComment_box" style={{ width: "20%" }}>
        <p className="px-2 py-1 mb-0">
          <i style={{ fontSize: "11px" }}>Friends in this comment section:</i>
        </p>
        {findFriendUsers?.slice(-2).map((friend: User) => {
          const friendComments = findFriendComments
            ?.filter((comment: any) => comment.userID === friend.id)
            .reverse();

          const lastComment = friendComments?.[0];

          return (
            lastComment && (
              <div key={`friend-${friend?.id}`} className="friendComment">
                <div className="d-flex align-items-center">
                  <div
                    onClick={() => router.push(`/user/${friend?.id}`)}
                    className="px-2 pointer"
                    style={{ width: "60px", borderRadius: "50%" }}
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      className="w-100"
                      src={friend?.img}
                      alt=""
                    />
                  </div>
                  <p className="mb-0 text-white">
                    <i>{friend?.userName}</i>
                  </p>
                </div>
                <p style={{ fontSize: "11px" }} className="px-2 pt-1">
                  <i>{lastComment?.content}</i>
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default UserPost;
