"use client";

import Link from "next/link";

const Bookmarks = () => {
  let bookmarks = localStorage.getItem("bookmarks");
  let bookmarksList = JSON.parse(bookmarks || "");

  return (
    <>
      <div className="row">
        <div className="col-md-12 p-5">
          <Link
            className="btn btn-primary mb-3 w-100"
            href={{
              pathname: `/`,
            }}>
            Back
          </Link>
          {Object.keys(bookmarksList).map((id, index) => {
            let post = bookmarksList[id];
            return (
              <div className="card mt-4 text-center" key={index}>
                <div className="card-body ">
                  <h5 className="card-title">{post?.title}</h5>
                  <p className="card-text text-truncate w-50 m-auto">
                    {post?.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
