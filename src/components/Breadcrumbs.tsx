import Link from "next/link";

const Breadcrumbs = (params: { params: string }) => {
  return (
    <div className="py-5 bg-dark hero-header mb-5">
      <div className="container text-center my-5 pt-5 pb-4">
        <h1 className="display-3 text-white mb-3 animated slideInDown">
          {params.params}
        </h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb justify-content-center text-uppercase">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li
              className="breadcrumb-item text-white active"
              aria-current="page"
            >
              {params.params}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
