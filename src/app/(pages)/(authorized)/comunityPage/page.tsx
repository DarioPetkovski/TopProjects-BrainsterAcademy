"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import Navbar from "@/src/components/Navbar";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import axios from "axios";
import PostForm from "@/src/components/PostForm";
import Post from "@/src/components/Post";
import CommunityStatistics from "@/src/components/CommunityStatistics";

export default function comunityPage() {
  const router = useRouter();
  const { user, data, setComments, setPosts } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<string[]>([]);
  const [pagination, setPagination] = useState<boolean>(false);
  const [serach, setSearch] = useState<string>("");
  const pathName = usePathname();

  const loggedUser = data.users?.find(
    (item: User) => item.email === user.email
  );
  const searchPosts = data.posts?.filter((post) => {
    const trimmedSearch = serach.trim().toLowerCase();

    if (trimmedSearch === "") {
      return post;
    } else {
      return post?.content?.toLowerCase().includes(trimmedSearch);
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost:5001/comments")
      .then((res) => setComments(res.data));
    axios.get("http://localhost:5001/posts").then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    if (data.users.length !== 0) {
      setUserInfo(user);
    }
  }, [data.users]);

  useEffect(() => {
    if (!user.isLogged && pathName !== "/login") {
      router.push("/login");
    }
  }, [user.isLogged, pathName, router]);

  useEffect(() => {
    if (loggedUser) {
      const likedPostIds = data?.posts
        ?.filter((post) => post?.likes?.includes(loggedUser?.id))
        .map((post) => post.id);

      const dislikedPostIds = data?.posts
        ?.filter((post) => post?.dislikes?.includes(loggedUser?.id))
        .map((post) => post.id);

      setLikedPosts(likedPostIds || []);
      setDislikedPosts(dislikedPostIds || []);
    }
  }, [data?.posts, loggedUser]);

  if (userInfo.isLogged) {
    return (
      <>
        <div className="comunity_page position-relative">
          <Navbar />
          <PostForm search={serach} setSearch={setSearch} />
          <div className="d-flex align-items-start">
            <div className="comunity_content w-100">
              <div
                className="d-flex justify-content-between"
                style={{ width: "90%" }}
              >
                <p className="px-4 mb-0">Posts</p>
                <p className="px-4 mb-0">Rating</p>
              </div>
              {!pagination
                ? searchPosts
                    ?.slice(-6)
                    .reverse()
                    .map((post) => {
                      const findUser = data?.users.find(
                        (user) => user.id === post.userID
                      );
                      const isLiked = likedPosts.includes(post.id);
                      const isDisliked = dislikedPosts.includes(post.id);
                      return (
                        <Post
                          post={post}
                          isLiked={isLiked}
                          isDisliked={isDisliked}
                          findUser={findUser}
                        />
                      );
                    })
                : searchPosts
                    ?.slice()
                    .reverse()
                    .map((post) => {
                      const findUser = data?.users.find(
                        (user) => user.id === post.userID
                      );
                      const isLiked = likedPosts.includes(post.id);
                      const isDisliked = dislikedPosts.includes(post.id);
                      return (
                        <Post
                          post={post}
                          isLiked={isLiked}
                          isDisliked={isDisliked}
                          findUser={findUser}
                        />
                      );
                    })}
              {searchPosts?.length > 6 ? (
                <div
                  style={{ width: "90%" }}
                  className="d-flex justify-content-center mt-4"
                >
                  {!pagination ? (
                    <button
                      onClick={() => setPagination(true)}
                      className="signin-btn minus-pad"
                    >
                      See More
                    </button>
                  ) : (
                    <button
                      onClick={() => setPagination(false)}
                      className="signin-btn minus-pad"
                    >
                      Hide
                    </button>
                  )}
                </div>
              ) : null}
            </div>
            <CommunityStatistics />
          </div>
        </div>
        <AuthorizedFooter />
      </>
    );
  }
  return null;
}
