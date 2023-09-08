import React from "react";
import { Link } from "react-router-dom";
//import PostFooter from '../PostFooter';
const PostList = ({ posts, title, showTitle = true, showUsername = true }) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="post-card ">
            <h4 className="post-header">
              {showUsername ? (
                <Link className="text-gray" to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor}
                  <span className="post-date">{post.createdAt}</span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You posted this post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="post-body">
              <p>{post.postText}</p>
            </div>

            <div className="post-footer ">
              <ul className="flex-row list-style-none justify-between align-center">
                <li>
                  <Link className='btn-like' to={`/posts/likes`}>Like  </Link>
                  
                </li>
                <li>
                  
                    <Link className="btn-comment" to={`/posts/${post._id}`}>
                      Comment
                    </Link>
                  
                </li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
