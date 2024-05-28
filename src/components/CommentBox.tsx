import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CommentInterface, User } from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function CommentBox({ id }: { id: string }) {
  const router = useRouter();
  const { user, data, setComments } = useGlobalContext();
  const [underCommentText, setUnderComment] = useState<string>("");
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const findPost = data?.posts.find((post) => post?.id === id);
  const colors = [
    "rgba(81, 156, 60, 1)",
    "rgba(0, 133, 255, 1)",
    "rgba(255, 44, 44, 1)",
    "rgba(193, 61, 255, 1)",
  ];

  function generateRandomHash(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let hash = "";
    for (let i = 0; i < length; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  }

  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:5001/comments?postID=${findPost?.id}`
    );
    setComments(response.data);
  };

  const onSubmitUnderComment = async (e: any) => {
    e.preventDefault();
    if (underCommentText.trim() !== "") {
      const newComment: CommentInterface = {
        id: generateRandomHash(10),
        commentID: activeCommentId,
        postID: findPost?.id,
        userID: loggedUser?.id,
        content: underCommentText,
        likes: [],
      };
      await axios.post("http://localhost:5001/comments", newComment);
      setComments((prev: CommentInterface[]) => [...prev, newComment]);
      setUnderComment("");
      setActiveCommentId(null);
    }
  };

  useEffect(() => {
    if (findPost?.id) {
      fetchComments();
    }
  }, [findPost?.id]);

  const toggleLikeSubmit = async (commentId: string) => {
    const commentIndex = likedComments.indexOf(commentId);
    let updatedComments = [...data?.comments];

    if (commentIndex === -1) {
      const newComments = updatedComments.map((comment: CommentInterface) => {
        if (comment.id === commentId && loggedUser) {
          const newLike: CommentInterface = {
            ...comment,
            likes: [...comment?.likes, loggedUser?.id],
          };

          axios.put(`http://localhost:5001/comments/${comment.id}`, newLike);
          return newLike;
        }
        return comment;
      });

      setComments(newComments);
      setLikedComments([...likedComments, commentId]);
    } else {
      const newComments = updatedComments.map((comment) => {
        if (comment.id === commentId) {
          const newLike = {
            ...comment,
            likes: comment.likes.filter(
              (like: string) => like !== loggedUser?.id
            ),
          };

          axios.put(`http://localhost:5001/comments/${comment.id}`, newLike);
          return newLike;
        }
        return comment;
      });

      setComments(newComments);
      const updatedLikedComments = likedComments.filter(
        (id) => id !== commentId
      );
      setLikedComments(updatedLikedComments);
    }
  };

  useEffect(() => {
    if (loggedUser) {
      const likedCommentIds = data?.comments
        ?.filter((comment) => comment.likes.includes(loggedUser?.id))
        .map((comment) => comment.id);

      setLikedComments(likedCommentIds || []);
    }
  }, [data?.comments, loggedUser]);

  const isLiked = (commentId: string) => {
    return likedComments.includes(commentId);
  };

  const handleCommentClick = (commentId: string) => {
    setActiveCommentId((prevActiveId) =>
      prevActiveId === commentId ? null : commentId
    );
  };

  const renderComments = (comments: any, parentId = null, level = 0) => {
    const filteredComments = comments.filter(
      (comment: any) => comment.commentID === parentId
    );
    return filteredComments.reverse().map((comment: any, index: number) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const findCommentUser = data?.users.find(
        (user) => user.id === comment.userID
      );

      const commentId = comment.id;
      const commentLiked = isLiked(commentId);
      const isCurrentCommentActive = activeCommentId === commentId;

      return (
        <li
          key={comment.id}
          style={{
            paddingLeft: level === 0 ? 0 : index === 0 ? 0 : 35,
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-start mt-3">
              {index === 0 && level > 0 && (
                <img src="/assets/images/L_Icon.png" alt="" />
              )}
              <div
                onClick={() =>
                  router.push(
                    `${
                      loggedUser?.id !== comment?.userID
                        ? `/user/${findCommentUser?.id}`
                        : "/accountPage"
                    }`
                  )
                }
                style={{ width: "50px", borderRadius: "50%" }}
              >
                <img
                  style={{ borderRadius: "50%" }}
                  className="w-100 pointer"
                  src={findCommentUser?.img}
                  alt=""
                />
              </div>
              <div className="px-2">
                <p className="mb-0" style={{ color: randomColor }} key={index}>
                  <i>{findCommentUser?.userName}</i>
                </p>
                <p className="mb-0">{comment?.content}</p>
                {isCurrentCommentActive && (
                  <form onSubmit={onSubmitUnderComment}>
                    <input
                      type="text"
                      value={underCommentText}
                      onChange={(e) => setUnderComment(e.target.value)}
                      className="underComment_Input px-2"
                      placeholder="Comment..."
                    />
                    <button type="submit">
                      <img
                        className="px-1"
                        style={{ width: "23px" }}
                        src="/assets/images/crossAdd.png"
                        alt=""
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="px-1 pointer"
                style={{ width: "30px" }}
                onClick={() => handleCommentClick(commentId)}
              >
                <img src="/assets/images/commentChat.png" alt="" />
              </div>
              <div
                onClick={() => {
                  toggleLikeSubmit(commentId);
                }}
                className="px-1 pointer"
                style={{ width: "40px" }}
              >
                {!commentLiked && (
                  <div>
                    <img src="/assets/images/likeIconWhite.png" alt="" />
                    <small>{comment?.likes?.length}</small>
                  </div>
                )}
                {commentLiked && (
                  <div>
                    <div>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{ color: "blue", fontSize: "22px" }}
                      />
                    </div>
                    <small>{comment?.likes?.length}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ul>{renderComments(comments, comment.id, level + 1)}</ul>
        </li>
      );
    });
  };
  return (
    <>
      {data.comments?.length !== 0 ? (
        <div
          style={{ width: "75%" }}
          className="comment_box text-black p-3 mt-4"
        >
          <ul className="w-100 mb-0">{renderComments(data?.comments)}</ul>
        </div>
      ) : null}
    </>
  );
}

export default CommentBox;
