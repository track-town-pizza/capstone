import Link from "next/link"
import React, {useState} from "react"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

function setPostCount() {
    // Fetch the amount of posts that exist
    return 8; // <- placeholder value for now
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
    return Math.min.apply(Math, postIDs) // <- placeholder value for now
}

// This function fetches a specified amount of posts that were posted after given post(identified with id)
function getPostsAfter(leadingPostID, amountOfPosts) {
    // Fetch the posts posted after post with id [leadingPostID] from the database, LIMIT amountOfPosts
    let firstIndex = parseInt(leadingPostID) - amountOfPosts
    let lastIndex = parseInt(leadingPostID)
    console.log("Fetching (after) posts index " + firstIndex + " to index " + lastIndex)
    const posts = postData.posts.slice(firstIndex, lastIndex) // Needs to be replaced with database call

    return posts
}

// This function fetches a specified amount of posts that were posted before given post(identified with id)
function getPostsBefore(leadingPostID, amountOfPosts) {
    // Fetch the posts posted before post with id [leadingPostID] from the database, LIMIT amountOfPosts
    let firstIndex = parseInt(leadingPostID) + 1
    let lastIndex = parseInt(leadingPostID) + 1 + amountOfPosts
    console.log("Fetching (before) posts index " + firstIndex + " to index " + lastIndex)
    const posts = postData.posts.slice(firstIndex, lastIndex) // Needs to be replaced with database call

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
        posts: getPostsBefore(getNewestPostID()-1, postRenderLimit)
    })

    // handles when user clicks on blog nav
    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'submit') {
            if (name === "New Posts") {
                // Fetch most recent posts from after oldestPostDate
                console.log("Fetching new posts")
                setBlog({
                    newestPostID: blogState.newestPostID,
                    oldestPostID: blogState.oldestPostID,
                    posts: getPostsAfter(blogState.posts[0].id, postRenderLimit)
                })
            }
            else if (name === "Old Posts") {
                // Fetch most recent posts from before oldestPostDate
                console.log("Fetching old posts")
                setBlog({
                    newestPostID: blogState.newestPostID,
                    oldestPostID: blogState.oldestPostID,
                    posts: getPostsBefore(blogState.posts[blogState.posts.length - 1].id, postRenderLimit)
                })
            }
            window.scrollTo(0, 0)
        }
    }

    let blogNav;
    if (postCount <= postRenderLimit) {
        blogNav = <div></div>
    }
    else if (parseInt(blogState.posts[0].id) === blogState.newestPostID) {
        blogNav =
        <div>
            <button name="Old Posts" onClick={handleClick}>Older Posts &rsaquo;</button>
            <style jsx> {`
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
     else if (parseInt(blogState.posts[blogState.posts.length-1].id) === blogState.oldestPostID) {
        blogNav =
        <div>
            <button name="New Posts" onClick={handleClick}>&lsaquo; Newer Posts</button>
            <style jsx> {`
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
                    {blogState.posts.map(post => (
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
