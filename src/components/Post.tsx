import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { PostInterface, User } from "../Interfaces/Interfaces";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function Post({
  post,
  findUser,
  isLiked,
  isDisliked,
}: {
  post: PostInterface;
  findUser: User | undefined;
  isLiked: boolean;
  isDisliked: Boolean;
}) {
  const router = useRouter();
  const { user, data, setPosts } = useGlobalContext();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<string[]>([]);

  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );

  const toggleLike = async (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    let newPosts = [...data?.posts];
    let updatedLikedPosts;
    let updatedDislikedPosts = dislikedPosts.filter((id) => id !== postId);

    if (isLiked) {
      updatedLikedPosts = likedPosts.filter((id) => id !== postId);
    } else {
      updatedLikedPosts = [...likedPosts, postId];
    }
    const postIndex = newPosts.findIndex((post) => post.id === postId);
    if (postIndex !== -1 && loggedUser) {
      const updatedPost = {
        ...newPosts[postIndex],
        likes: isLiked
          ? newPosts[postIndex].likes.filter(
              (like: string) => like !== loggedUser?.id
            )
          : [...newPosts[postIndex].likes, loggedUser?.id],
        dislikes: newPosts[postIndex]?.dislikes?.filter(
          (dislike: string) => dislike !== loggedUser?.id
        ),
      };

      newPosts[postIndex] = updatedPost;

      try {
        await axios.put(`http://localhost:5001/posts/${postId}`, updatedPost);
        setPosts(newPosts);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }

    setLikedPosts(updatedLikedPosts);
    setDislikedPosts(updatedDislikedPosts);
    setPosts(newPosts);
  };

  const toggleDislike = async (postId: string) => {
    const isDisliked = dislikedPosts.includes(postId);
    let updatedDislikedPosts;
    let updatedLikedPosts = likedPosts.filter((id) => id !== postId);

    if (isDisliked) {
      updatedDislikedPosts = dislikedPosts.filter((id) => id !== postId);
    } else {
      updatedDislikedPosts = [...dislikedPosts, postId];
    }

    setDislikedPosts(updatedDislikedPosts);
    setLikedPosts(updatedLikedPosts);

    const postIndex = data?.posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1 && loggedUser) {
      const postToUpdate = data?.posts[postIndex];
      const updatedPost = {
        ...postToUpdate,
        dislikes: isDisliked
          ? (postToUpdate.dislikes || []).filter(
              (dislike: string) => dislike !== loggedUser?.id
            )
          : [...(postToUpdate.dislikes || []), loggedUser?.id],
        likes: (postToUpdate.likes || []).filter(
          (like: string) => like !== loggedUser?.id
        ),
      };

      const newPosts = [...data?.posts];
      newPosts[postIndex] = updatedPost;

      try {
        await axios.put(`http://localhost:5001/posts/${postId}`, updatedPost);
        setPosts(newPosts);
      } catch (error) {
        console.error("Error updating post:", error);
      }
      setPosts(newPosts);
    }
  };

  return (
    <div
      key={`all - ${post.id}`}
      style={{ width: "90%" }}
      className="d-flex align-items-center justify-content-between post mt-3"
    >
      <div className="d-flex align-items-center pointer">
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
          style={{
            width: "50px",
            borderRadius: "50%",
            zIndex: "10000",
          }}
        >
          <img
            style={{ borderRadius: "50%" }}
            className="w-100"
            src={findUser?.img}
            alt=""
          />
        </div>
        <Link
          className="link text-white"
          href={`/comunityPage/post/${post.id}`}
        >
          <p className="mb-0 px-3">{post?.content}</p>
        </Link>
      </div>

      <div className="d-flex align-items-center">
        {!isLiked && (
          <div
            onClick={() => toggleLike(post.id)}
            className="d-flex flex-column px-2 justify-content-center align-items-center pointer"
          >
            <img src="/assets/images/likeIcon.png" alt="" />
            <p className="mb-0 px-2 pt-1">{post?.likes?.length}</p>
          </div>
        )}
        {isLiked && (
          <div
            className="d-flex flex-column px-2 justify-content-center align-items-center pointer"
            onClick={() => toggleLike(post.id)}
          >
            <div>
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ color: "blue", fontSize: "22px" }}
              />
            </div>
            <p className="mb-0 px-2 pt-1">{post?.likes?.length}</p>
          </div>
        )}

        {!isDisliked && (
          <div
            onClick={() => toggleDislike(post?.id)}
            className="d-flex flex-column justify-content-center align-items-center pointer"
          >
            <img src="/assets/images/dislikeIcon.png" alt="" />
            <p className="mb-0 px-2 pt-1">{post?.dislikes?.length}</p>
          </div>
        )}
        {isDisliked && (
          <div
            className="d-flex flex-column justify-content-center align-items-center pointer"
            onClick={() => toggleDislike(post?.id)}
          >
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
  );
}

export default Post;
