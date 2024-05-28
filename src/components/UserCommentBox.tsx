import React, { useEffect, useState } from "react";
import { CommentInterface, User } from "../Interfaces/Interfaces";
import axios from "axios";

function UserCommentBox({ loggedUser }: { loggedUser: User | undefined }) {
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const fetchData = async () => {
    await axios
      .get("http://localhost:5001/comments")
      .then((res) => setComments(res.data));
  };
  useEffect(() => {
    fetchData();
  }, [comments]);
  const findComments = comments?.filter(
    (comment) => comment?.userID === loggedUser?.id
  );
  return (
    <div className="comment-box">
      {findComments
        .slice(-5)
        .reverse()
        .map((comment) => {
          return (
            <div key={comment.id} className="user-comment px-3 py-2 mt-2">
              <div className="user d-flex align-items-center">
                <div className="photo-con">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={loggedUser?.img}
                    alt=""
                  />
                </div>
                <div className="d-flex align-items-center px-1">
                  {loggedUser?.type === "artist" && (
                    <img
                      className="checkMark"
                      src="/assets/images/checkMark.png"
                    />
                  )}
                  <p className="nickName mb-0 px-1">{loggedUser?.userName}:</p>
                </div>
              </div>
              <p className="mb-0 mt-1">{comment?.content}</p>
            </div>
          );
        })}
    </div>
  );
}

export default UserCommentBox;
