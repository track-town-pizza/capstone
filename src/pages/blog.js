import Link from "next/link"
import React, {useState} from "react"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

function setPostCount() {
    // Fetch the amount of posts that exist
    return 10; // <- placeholder value for now
}

function getOldestPostID() {
    // Fetch the oldest post's id from the database

    let posts = postData.posts
    let postIDs = posts.map(a => a.id)
    return Math.max.apply(Math, postIDs) // <- placeholder value for now
}

function getNewestPostID() {
    // Fetch the newest post's id from the database

    let posts = postData.posts
    let postIDs = posts.map(a => a.id)
    //console.log(Math.min.apply(Math, postIDs))
    return Math.min.apply(Math, postIDs) // <- placeholder value for now
}

// This function fetches a specified amount of posts that were posted after given post(identified with id)
function getPostsAfter(leadingPostID, amountOfPosts) {
    // Fetch the posts posted after post with id [leadingPostID] from the database, LIMIT amountOfPosts
    //const posts = postData.posts.slice(leadingPostID+1+
    const posts = postData.posts

    return posts
}

// This function fetches a specified amount of posts that were posted before given post(identified with id)
function getPostsBefore(leadingPostID, amountOfPosts) {
    // Fetch the posts posted before post with id [leadingPostID] from the database, LIMIT amountOfPosts
    const posts = postData.posts

    return posts
}

function containsPostID(posts, postID) {
    // Logic for checking if post id is in given array of posts
    let postIDs = posts.map(a => a.id)
    return postIDs.includes(postID, 0)
}


const Blog = () => {

    const postRenderLimit = 3
    const postCount = setPostCount() // Need to query database on how many posts there are

    const [blogState, setBlog] = useState({
        newestPostID: getNewestPostID(),
        oldestPostID: getOldestPostID(),
        posts: getPostsBefore(getNewestPostID()+1, postRenderLimit)
    })

    /*
    setBlog(blogState.newestPostID = getNewestPostID())
    setBlog(blogState.oldestPostID = getOldestPostID())

    setBlog(blogState.posts = getPosts(blogState.newestPostID, postRenderLimit))
    */

    console.log(blogState.newestPostID)

    // handles when user clicks on blog nav
    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'submit') {
            if (name === "New Posts") {
                // Fetch most recent posts from after oldestPostDate
                setBlog({
                    newestPostID: blogState.newestPostID,
                    oldestPostID: blogState.oldestPostID,
                    posts: getPostsAfter(blogState.posts[0].id)
                })
            }
            if (name === "Old Posts") {
                // Fetch most recent posts from before oldestPostDate
                setBlog({
                    newestPostID: blogState.newestPostID,
                    oldestPostID: blogState.oldestPostID,
                    posts: getPostsBefore(blogState.posts[postRenderLimit-1].id)
                })
            }
            window.scrollTo(0, 0)
        }
    }

    let blogNav;
    if (postCount <= postRenderLimit) {
        blogNav = <div></div>
    }
    /*else if (at first page) {
     *
     * }
     * else if (at last page) {
     *
     * }
     */
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
