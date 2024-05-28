"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/src/context/Context";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/src/Interfaces/Interfaces";
import Navbar from "@/src/components/Navbar";
import AuthorizedFooter from "@/src/components/AuthorizedFooter";
import CommentBox from "@/src/components/CommentBox";
import UserPost from "@/src/components/UserPost";
import CommentForm from "@/src/components/CommentForm";

export default function CommentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, data } = useGlobalContext();
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const pathName = usePathname();

  useEffect(() => {
    if (data?.users.length !== 0) {
      setUserInfo(user);
    }
  }, [data?.users, user]);

  useEffect(() => {
    if (!user?.isLogged && pathName !== "/login") {
      router.push("/login");
    }
  }, [user?.isLogged, pathName, router]);

  if (userInfo?.isLogged) {
    return (
      <div className="comunity_page position-relative">
        <Navbar />
        <div className="comunity_content">
          <div>
            <h1 style={{ fontWeight: "800" }}>Community/Post</h1>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ width: "75%" }}
          >
            <p style={{ fontWeight: "100" }} className="px-2 mt-5 mb-0">
              <i>Main Comment</i>
            </p>
          </div>
          <UserPost id={params.id} />
          <CommentForm id={params.id} />
          <CommentBox id={params.id} />
        </div>
        <AuthorizedFooter />
      </div>
    );
  }

  return null;
}
