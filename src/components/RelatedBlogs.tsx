import Link from "next/link";
import { BlogIntem } from "./BlogItem";

const RelatedBlogs = (blog: BlogIntem) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div>
        <ul>
          <li className="mb-4">
            <a className="wrao-pic-w">
              <img src={blog.img} alt="PRODUCT" className="img-fluid" />

              <div className="p-t-8 mt-1">
                <div className="stext-116 cl8 hov-cl1 trans-04 mb-3">
                  {blog.title}
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default RelatedBlogs;
