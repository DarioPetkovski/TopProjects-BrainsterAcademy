"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const firstPart = usePathname().split("/")[1][0].toUpperCase();
  const secondPart = usePathname().split("/")[1].slice(1, 6);
  const pathname = firstPart + secondPart;
  const searchParams = useSearchParams();
  const menuSearch = searchParams.get("menu") || "";
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (menuSearch) {
      setIsLoading(true);
      fetch("http://localhost:5001/menu")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [menuSearch]);

  return (
    <div>
      <Breadcrumbs params={pathname} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {data.some((item) =>
            item.name.toLowerCase().includes(menuSearch.toLowerCase().trim())
          ) ? (
            <div className="text-center">
              <div className="row g-4">
                {data.map((menu: any) => {
                  if (
                    menu.name
                      .toLowerCase()
                      .includes(menuSearch.toLowerCase().trim())
                  ) {
                    return (
                      <div key={menu.id} className="col-lg-6">
                        <div className="d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid rounded"
                            src={menu.image}
                            alt=""
                            style={{ width: "80px" }}
                          />
                          <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span>{menu.name}</span>
                              <span className="text-primary">
                                ${menu.price}
                              </span>
                            </h5>
                            <small className="fst-italic">
                              {menu.description}
                            </small>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <p>
              There are no results with your search... Please try searching for
              menu items.
            </p>
          )}
        </>
      )}
    </div>
  );
}
