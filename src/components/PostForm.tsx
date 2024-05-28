import axios from "axios";
import React, { useState } from "react";
import { useGlobalContext } from "../context/Context";
import { User } from "../Interfaces/Interfaces";

function PostForm({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { user, data, setPosts } = useGlobalContext();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [aboutDiscusion, setAboutDiscusion] = useState<string>("");
  const [discusion, setDiscusion] = useState<string>("");

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

  const onSubmitPost = async (e: any) => {
    e.preventDefault();
    if (discusion !== "" && aboutDiscusion !== "") {
      const newPost = {
        id: generateRandomHash(10),
        userID: loggedUser?.id,
        content: aboutDiscusion,
        text: discusion,
        likes: [],
        dislikes: [],
      };
      await axios.post("http://localhost:5001/posts", newPost);
      setPosts((prev) => [...prev, newPost]);
      setAboutDiscusion("");
      setDiscusion("");
      setOpenForm(false);
    }
  };
  return (
    <div className="comunity_content">
      <h1 style={{ fontWeight: "800" }}>Community</h1>
      <div
        style={{ width: "70%" }}
        className="d-flex justify-content-between align-items-center pt-5"
      >
        <div className="d-flex align-items-center" style={{ width: "40%" }}>
          <div className="pad_right">
            <img
              className="pointer"
              style={{ width: "35px", height: "30px" }}
              src="/assets/images/options.png"
              alt=""
            />
          </div>
          <input
            onChange={(e: any) => setSearch(e.target.value)}
            value={search}
            className="search_bar_comunity w-100"
            type="text"
            placeholder="Search..."
          />
        </div>
        <button
          onClick={() => setOpenForm((prev) => !prev)}
          className="signin-btn minus-pad"
        >
          {!openForm ? "start a discussion" : "close discussion"}
        </button>
      </div>
      {openForm && (
        <form onSubmit={onSubmitPost} style={{ width: "70%" }} className="mt-3">
          <div className="d-flex flex-column align-items-start">
            <input
              onChange={(e: any) => setAboutDiscusion(e.target.value)}
              value={aboutDiscusion}
              className="w-100 py-1 px-2 discussion"
              placeholder="About..."
              type="text"
            />
            <textarea
              onChange={(e: any) => setDiscusion(e.target.value)}
              value={discusion}
              placeholder="Discusion..."
              className="mt-3 w-100 discussion p-2"
              rows={3}
            ></textarea>
            <button type="submit" className="signin-btn minus-pad mt-3">
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default PostForm;
