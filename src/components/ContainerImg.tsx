import Link from "next/link";

function ContainerImg() {
  return (
    <div className="container-img h-100 position-relative">
      <img
        className="h-100 w-100"
        src="/assets/images/SidePicture.png"
        alt=""
      />
      <Link className="position-absolute link-logo" href="/">
        KINE<span>MOE</span>
      </Link>
    </div>
  );
}

export default ContainerImg;
