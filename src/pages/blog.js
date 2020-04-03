import Link from "next/link"
import React, {useState} from "react"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

function setPostCount() {
    // Fetch the amount of posts that exist
    return 10; // placeholder value
}

const postRenderLimit = 3
const postCount = setPostCount() // Need to query database on how many posts there are

const Blog = () => {

    const firstPage = true
    const lastPage = true


    const [blogState, setBlog] = useState({
        newestPostDate: null,
        oldestPostDate: null,
        posts: []
    })

    // handles when user clicks on blog nav
    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'submit') {
            if (name === "New Posts") {
                // Fetch most recent posts from after oldestPostDate
            }
            if (name === "Old Posts") {
                // Fetch most recent posts from before oldestPostDate
            }
            window.scrollTo(0, 0)
        }
    }

    let blogNav;
    if (postCount <= postRenderLimit) {
        blogNav = <div></div>
    }
    else {
        blogNav =
        <div>
            <button name="New Posts" onClick={handleClick}>&lsaquo; Newer Posts</button>
            <div id="blogNavSeperator"> | </div>
            <button name="Old Posts" onClick={handleClick}>Older Posts &rsaquo;</button>
            <style jsx> {`
                #blogNavSeperator {
                    margin: 7px;
                    display: inline;
                }

                .blog-nav {
                    margin-top: 10px;
                    text-align: center;
                    color: #007030;
                }

                button {
                    background: none!important;
                    border: none;
                    padding: 0!important;
                    color: #007030;
                    cursor: pointer;
                }

                button:hover {
                    text-decoration: underline;
                }
            `}</style>
       </div>
    }

    return (
        <div>
            <Layout>
                <div className="blog-container">
                    {postData.posts.map(post => (
                        <SinglePost post={post} key={post.id}/>
                    ))}
                </div>
                <div id="bottom-bar"/>

                <nav className="blog-nav">
                    {blogNav}
                </nav>
            </Layout>

            <style jsx>{`
                .blog-container {
                    margin-left: 20%;
                    margin-right: 20%;
                    width: 60%;
                }

                #bottom-bar {
                    margin-left: 20%;
                    margin-right: 20%;
                    width: 60%;
                    height: 3px;
                    left: 27px;
                    top: 771px;
                    background: #007030;
                    transform: matrix(1, 0, 0, -1, 0, 0);
                }

                .blog-nav {
                    margin-top: 10px;
                    text-align: center;
                    color: #007030;
                }

                @media only screen and (max-width: 700px) {
                    .blog-container {
                        margin-left: 10%;
                        margin-right: 10%;
                        width: 80%;
                    }

                    #bottom-bar {
                        margin-left: 10%;
                        margin-right: 10%;
                        width: 80%;
                    }

                }
            `}</style>
        </div>
    )
}

export default Blog
