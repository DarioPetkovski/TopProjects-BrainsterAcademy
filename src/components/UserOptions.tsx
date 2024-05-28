import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context/Context";
import axios from "axios";

function UserOptions({ id }: { id: string }) {
  const { data, user, setUsers } = useGlobalContext();
  const [follow, setFollow] = useState<boolean>(false);
  const [addFriend, setAddFriend] = useState<boolean>(false);
  const [copyURL, setCopyURL] = useState<string>("");
  const [copy, setCopy] = useState<boolean>(false);
  const findUser = data?.users.find((user) => user?.id === id);
  const loggedUser = data?.users.find(
    (userInfo) => userInfo?.email === user?.email
  );

  useEffect(() => {
    axios.get("http://localhost:5001/users").then((res) => setUsers(res.data));
  }, [loggedUser?.followers, loggedUser?.friends]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/user/${findUser?.id}`
      );
      setCopyURL("Link copied!");
    } catch (err) {
      setCopyURL("Failed to copy link");
    }
  };

  useEffect(() => {
    const checkFollower = loggedUser?.followers.find(
      (follower: string) => follower === findUser?.id
    );
    if (!checkFollower) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  }, [loggedUser?.followers, findUser]);

  useEffect(() => {
    const checkFriend = loggedUser?.friends.find(
      (friend: string) => friend === findUser?.id
    );
    if (!checkFriend) {
      setAddFriend(false);
    } else {
      setAddFriend(true);
    }
  }, [loggedUser?.friends, findUser]);

  const onClickAddFriend = async () => {
    const isFriendIndex = loggedUser?.friends.findIndex(
      (friend: string) => friend === findUser?.id
    );

    if (isFriendIndex === -1 && loggedUser) {
      const updatedFriends = [...loggedUser?.friends, findUser?.id];
      const updatedUser = { ...loggedUser, friends: updatedFriends };

      await axios.put(
        `http://localhost:5001/users/${loggedUser?.id}`,
        updatedUser
      );
      setAddFriend(true);
    } else {
      const updatedFriends = loggedUser?.friends.filter(
        (friend: any, index: number) => index !== isFriendIndex
      );
      const updatedUser = { ...loggedUser, friends: updatedFriends };

      await axios.put(
        `http://localhost:5001/users/${loggedUser?.id}`,
        updatedUser
      );
      setAddFriend(false);
    }
  };
  const onClickAddFollower = async () => {
    const isFriendIndex = loggedUser?.followers.findIndex(
      (friend: string) => friend === findUser?.id
    );

    if (isFriendIndex === -1 && loggedUser) {
      const updatedFollowers = [...loggedUser?.followers, findUser?.id];
      const updatedUser = { ...loggedUser, followers: updatedFollowers };

      await axios.put(
        `http://localhost:5001/users/${loggedUser?.id}`,
        updatedUser
      );
      setFollow(true);
    } else {
      const updatedFollowers = loggedUser?.followers.filter(
        (friend: any, index: number) => index !== isFriendIndex
      );
      const updatedUser = { ...loggedUser, followers: updatedFollowers };

      await axios.put(
        `http://localhost:5001/users/${loggedUser?.id}`,
        updatedUser
      );
      setFollow(false);
    }
  };
  return (
    <div className="controllers user-options d-flex justify-content-between">
      <div className="row align-items-center">
        <div className="col-4">
          {!follow && (
            <div
              style={{ width: "30px" }}
              className="pointer py-2"
              onClick={() => {
                onClickAddFollower();
              }}
            >
              <img
                className="w-100"
                src="/assets/images/heartIcon.png"
                alt=""
              />
            </div>
          )}
          {follow && (
            <div
              className="pointer"
              onClick={() => {
                onClickAddFollower();
              }}
              style={{ color: "red", fontSize: "30px" }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
          )}
        </div>
        <div className="col-4">
          {!addFriend && (
            <div
              onClick={() => {
                onClickAddFriend();
              }}
              className="pointer"
              style={{ width: "30px" }}
            >
              <img
                className="w-100"
                src="/assets/images/crossIcon.png"
                alt=""
              />
            </div>
          )}
          {addFriend && (
            <div
              onClick={() => {
                onClickAddFriend();
              }}
              className="pointer"
              style={{ color: "white", fontSize: "30px" }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </div>
        <div className="col-4">
          <img
            onClick={() => {
              copyToClipboard();
              setCopy((prev) => !prev);
            }}
            className="pointer"
            src="/assets/images/shareIcon.png"
            alt=""
          />
          {copy && (
            <small className="text-white position-absolute w-100">
              coppied URL
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserOptions;
