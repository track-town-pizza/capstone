import React, {useState} from "react"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

import Layout from "../components/Layout"
import SinglePost from "../components/SinglePost"
import { parse } from "date-fns"
import { isAfter } from "date-fns"

const Blog = ({ postData }) => {
    function setPostCount() {
        // Fetch the amount of posts that exist
        return 8; // <- placeholder value for now
    }

    function comparePostsForDateSort(postA, postB) {
        let date1 = parse(postA.date, 'MM/dd/yyyy', new Date()) // date of oldest post, placeholder value for now
        let date2 = parse(postB.date, 'MM/dd/yyyy', new Date()) // date of newest post, placeholder value for now

        if (isAfter(date2, date1)) {
            return true
        }
        else {
            return false
        }
    }

    // sorts an array of posts to be ordered most recent to oldest
    function orderPostsByDate(posts) {
        posts.sort(comparePostsForDateSort)
        return posts
    }

    function getOldestPostID() {
        // Fetch the oldest post's id from the database
        // Will require different logic for the database

        const res = await fetch(`${process.env.URL_ROOT}/api/posts`)
        return parseInt(posts[posts.length-1].id)
    }

    function getNewestPostID() {
        // Fetch the newest post's id from the database
        // Will require different logic for the database

        let posts = orderPostsByDate(postData)
        return parseInt(posts[0]._id)
    }

    function getSinglePost(id) {
        // Will require different logic for the database

        let posts = orderPostsByDate(postData)
        let postIDs = posts.map(a => a.id)
        let index = parseInt(postIDs.indexOf(id.toString()))

        return posts[index]
    }

    function getInitialPosts(amountOfPosts, postData) {
        let firstPost = getSinglePost(getNewestPostID(postData))
        console.log("== First Post:", firstPost)
        let afterPosts = getPostsBefore(firstPost.id, amountOfPosts - 1)
        afterPosts.unshift(firstPost)
        return afterPosts
    }

    // This function fetches a specified amount of posts that were posted after given post(identified with id)
    function getPostsAfter(leadingPostID, amountOfPosts) {
        // Fetch the posts posted after post with id [leadingPostID] from the database, LIMIT amountOfPosts
        let posts = orderPostsByDate(postData)
        let postIDs = posts.map(a => a.id)
        let lastIndex= parseInt(postIDs.indexOf(leadingPostID.toString()))
        let firstIndex = parseInt(lastIndex) - parseInt(amountOfPosts)

        //console.log("Fetching (before) posts index ", firstIndex," to index ", lastIndex)
        const returnPosts = posts.slice(firstIndex, lastIndex)
        return returnPosts // Needs to be replaced with database call
    }

    // This function fetches a specified amount of posts that were posted before given post(identified with id)
    function getPostsBefore(leadingPostID, amountOfPosts) {
        //console.log("leadingPostID: ", leadingPostID)
        //console.log("GET BEFORE")
        // Fetch the posts posted before post with id [leadingPostID] from the database, LIMIT amountOfPosts
        let posts = orderPostsByDate(postData)
        let postIDs = posts.map(a => a.id)
        let firstIndex = parseInt(postIDs.indexOf(leadingPostID.toString()))
        let lastIndex = parseInt(firstIndex) + parseInt(amountOfPosts)

        //console.log("Fetching (before) posts index ", firstIndex," to index ", lastIndex)
        const returnPosts = posts.slice(firstIndex + 1, lastIndex + 1)
        return returnPosts // Needs to be replaced with database call
    }

    function containsPostID(posts, postID) {
        // Logic for checking if post id is in given array of posts
        let postIDs = posts.map(a => a.id)
        return postIDs.includes(postID, 0)
    }

    const postRenderLimit = 3
    const postCount = setPostCount() // Need to query database on how many posts there are

    const [blogState, setBlog] = useState({
        newestPostID: getNewestPostID(postData),
        oldestPostID: getOldestPostID(),
        posts: getInitialPosts(postRenderLimit)
    })

    // handles when user clicks on blog nav
    function handleClick(event) {
        const {name, type} = event.target
        if (type === 'submit') {
            if (name === "New Posts") {
                // Fetch most recent posts from after oldestPostDate
                setBlog({
                    newestPostID: blogState.newestPostID,
                    oldestPostID: blogState.oldestPostID,
                    posts: getPostsAfter(blogState.posts[0].id, postRenderLimit)
                })
            }
            else if (name === "Old Posts") {
                // Fetch most recent posts from before oldestPostDate
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
    else if (!(Array.isArray(blogState.posts) && blogState.posts.length)) {
        blogNav = <div></div>
        blogNav = <h2>Something went wrong :(</h2>
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

Blog.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())

    // Add id attribute to all posts for sorting
    console.log("== Posts:", resJson)
    const enumeratedPosts = resJson.map((post, idx) => post = { id: idx, ...post })
    console.log("== Enumerated Posts:", enumeratedPosts)

    return { postData: enumeratedPosts }
}

export default Blog
