import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

function ProgressBar({
  discussionLength,
  discussions,
  commentsLength,
  comments,
}: {
  discussionLength: number;
  discussions: number;
  commentsLength: number;
  comments: number;
}) {
  return (
    <div className="progres_con">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="progress_bar">
            <CircularProgressbar
              value={commentsLength}
              text={`${comments}`}
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
            <p>Comments</p>
          </div>
        </div>
        <div className="col-4">
          <div className="progress_bar">
            <CircularProgressbar
              value={discussionLength}
              text={`${discussions}`}
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
            <p>Discussions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
