import React, { useState } from "react";
import {
  CommentInterface,
  PostInterface,
  User,
} from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";
import axios from "axios";

function CommentForm({ id }: { id: string }) {
  const { user, data, setComments } = useGlobalContext();
  const [commentText, setComment] = useState<string>("");
  const findPost = data?.posts.find((post: PostInterface) => post?.id === id);

  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );

  function generateRandomHash(length: number) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let hash = "";
    for (let i = 0; i < length; i++) {
      hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return hash;
  }

  const onSubmitComment = async (e: any) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      const newComment: CommentInterface = {
        id: generateRandomHash(10),
        commentID: null,
        postID: findPost?.id,
        userID: loggedUser?.id,
        content: commentText,
        likes: [],
      };
      await axios.post("http://localhost:5001/comments", newComment);
      setComments((prev: CommentInterface[]) => [...prev, newComment]);
      setComment("");
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmitComment}
        style={{ width: "75%" }}
        action="/"
        className="mt-4 text-black"
      >
        <textarea
          onChange={(e: any) => setComment(e.target.value)}
          value={commentText}
          placeholder="Leave a comment..."
          style={{ borderRadius: "11px", outline: "none" }}
          className="w-100 p-3 input_textarea"
          rows={2}
        ></textarea>
        <div className="w-100 d-flex justify-content-end pt-3">
          <button type="submit" className="minus-pad signin-btn">
            Post Comment
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
