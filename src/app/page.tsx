"use client";

import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "@/components/Debounce";
import Link from "next/link";

export type postItem = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const [postsData, setPostsData] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState<{ [key: number]: postItem }>({});
  const searchValue = useDebounce(search, 500);

  useEffect(() => {
 

    let params;

    if (searchValue) {
      params = `title=${searchValue}`;
    } else {
      params = `_page=${pageNo}&_per_page=10`;
    }
    getAllPosts(params);
  }, [pageNo, searchValue]);

  const getAllPosts = (params: string) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?${params}`)
      .then((response) => {
        const data = response.data;

      
        setPostsData(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updatePage = (next?: boolean) => {
    if (next) {
      setPageNo(pageNo + 1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleBookmarks = (post: postItem) => {
    let updatedBookmarks = { ...bookmarks, [post?.id]: post };
    setBookmarks(updatedBookmarks);

    let jsonBookmarks = JSON.stringify(updatedBookmarks);

    localStorage.setItem("bookmarks", jsonBookmarks);
  };

  return (
    <main>
      <div className="row">
        <div className="text-center mt-4 col-md-8 mx-auto p-3">
          <Link
            className="btn btn-primary mb-3 w-100"
            href={{
              pathname: `/bookmarks`,
            }}>
            Bookmarks
          </Link>
          <div className="mb-3 row">
            <label htmlFor="search" className="col-sm-2 col-form-label">
              Search
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="search"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
          {postsData?.map((item: postItem, index: number) => {
            let isBookmark = bookmarks && Boolean(bookmarks[item?.id]);
            return (
              <div className="card mt-4 text-center" key={index}>
                <div className="card-body ">
                  <h5 className="card-title">{item?.title}</h5>
                  <p className="card-text text-truncate w-50 m-auto">
                    {item?.body}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-around text-muted">
                  {" "}
                  <Link
                    className="btn btn-primary btn-sm"
                    href={{
                      pathname: `/${item?.id}`,
                    }}>
                    Details
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleBookmarks(item)}
                    disabled={isBookmark || false}>
                    Bookmark
                  </button>
                </div>
              </div>
            );
          })}

          {postsData?.length && !search ? (
            <div className="d-flex justify-content-between my-5">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => updatePage(false)}>
                Previous
              </button>
              <p>{pageNo}</p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => updatePage(true)}>
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
