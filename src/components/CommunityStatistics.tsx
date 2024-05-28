import axios from "axios";
import React, { useEffect } from "react";
import {
  CommentInterface,
  PostInterface,
  User,
} from "../Interfaces/Interfaces";
import { useGlobalContext } from "../context/Context";
import { CircularProgressbar } from "react-circular-progressbar";
import { useRouter } from "next/navigation";

function CommunityStatistics() {
  const { user, data, setComments, setPosts } = useGlobalContext();
  const router = useRouter();
  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );

  const commentLoggedUser = data?.comments?.filter(
    (comment: CommentInterface) => {
      return comment?.userID === loggedUser?.id;
    }
  );
  const discussionLoggedUser = data.posts?.filter((post: PostInterface) => {
    return post?.userID === loggedUser?.id;
  });
  const totalContributions =
    commentLoggedUser.length + discussionLoggedUser.length;
  const commentPercentage = parseFloat(
    ((commentLoggedUser.length / totalContributions) * 100).toFixed(2)
  );
  const discussionPercentage = parseFloat(
    ((discussionLoggedUser.length / totalContributions) * 100).toFixed(2)
  );

  useEffect(() => {
    axios
      .get("http://localhost:5001/comments")
      .then((res) => setComments(res.data));
    axios.get("http://localhost:5001/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div
      style={{ width: "20%" }}
      className="statistic_con d-flex flex-column align-items-center py-2"
    >
      <div className="d-flex align-items-center w-100 justify-content-center">
        <div style={{ width: "70px" }} className="progress_bar">
          <CircularProgressbar
            value={commentPercentage}
            text={`${commentLoggedUser?.length}`}
            styles={{
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color without opacity
                stroke: `rgba(81, 156, 60, 1)`, // Set opacity to 1
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
                // Rotate the path
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
                // Increase the width of the path
                strokeWidth: 10, // Adjust the width as needed
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "black",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
                // Increase the width of the trail
                strokeWidth: 10, // Adjust the width as needed
              },
              // Customize the text
              text: {
                // Text color
                fill: "white",
                // Text size
                fontSize: "16px",
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: "#3e98c7",
              },
            }}
          />
        </div>
        <small className="mb-0 px-2">Comments</small>
      </div>
      <div className="d-flex align-items-center justify-content-center pt-3 w-100">
        <div style={{ width: "70px" }} className="progress_bar">
          <CircularProgressbar
            value={discussionPercentage}
            text={`${discussionLoggedUser?.length}`}
            styles={{
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color without opacity
                stroke: `rgba(81, 156, 60, 1)`, // Set opacity to 1
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Customize transition animation
                transition: "stroke-dashoffset 0.5s ease 0s",
                // Rotate the path
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
                // Increase the width of the path
                strokeWidth: 10, // Adjust the width as needed
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: "black",
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Rotate the trail
                transform: "rotate(0.25turn)",
                transformOrigin: "center center",
                // Increase the width of the trail
                strokeWidth: 10, // Adjust the width as needed
              },
              // Customize the text
              text: {
                // Text color
                fill: "white",
                // Text size
                fontSize: "16px",
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: "#3e98c7",
              },
            }}
          />
        </div>
        <small className="mb-0 px-2">Discussions</small>
      </div>
      <div className="w-100 flex-column d-flex align-items-start justify-content-center px-2 pt-2">
        <small className="comment_text">
          <i>Latest comments:</i>
        </small>
        {data?.comments
          ?.slice(-1)
          .reverse()
          .map((comment) => {
            const findUsers = data?.users.filter((user: User) => {
              return comment.userID === user?.id;
            });
            return (
              <div
                key={`latest - ${comment.id}`}
                className="latest_comment w-100 p-2"
              >
                {findUsers?.map((user) => {
                  return (
                    <div
                      onClick={() =>
                        router.push(
                          `${
                            loggedUser?.id !== comment?.userID
                              ? `/user/${comment?.userID}`
                              : `/accountPage`
                          }`
                        )
                      }
                      key={`user - ${user?.id}`}
                      className="d-flex align-items-center pointer"
                      style={{ width: "35px" }}
                    >
                      <img
                        style={{ borderRadius: "50%" }}
                        className="w-100"
                        src={user?.img}
                        alt=""
                      />
                      <small className="px-2">
                        <i>{user?.userName}:</i>
                      </small>
                    </div>
                  );
                })}
                <small style={{ fontWeight: "100" }}>
                  <i>{comment?.content}</i>
                </small>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CommunityStatistics;
