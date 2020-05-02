import React, {useState} from "react"
import Link from "next/link"
import postData from "../../../data/PostData.json" // will be removed with backend implementation
import { format } from "date-fns"
import { parse } from "date-fns"
import { isAfter } from "date-fns"

import BlogManagementListItem from "./BlogManagementListItem"



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

    let posts = orderPostsByDate(postData.posts)
    return parseInt(posts[posts.length-1].id)
}

function getNewestPostID() {
    // Fetch the newest post's id from the database
    // Will require different logic for the database

    let posts = orderPostsByDate(postData.posts)
    return parseInt(posts[0].id)
}

function getSinglePost(id) {
    // Will require different logic for the database

    let posts = orderPostsByDate(postData.posts)
    let postIDs = posts.map(a => a.id)
    let index = parseInt(postIDs.indexOf(id.toString()))

    return posts[index]
}

function getInitialPosts(amountOfPosts) {
    let firstPost = getSinglePost(getNewestPostID())
    let afterPosts = getPostsBefore(firstPost.id, amountOfPosts - 1)
    afterPosts.unshift(firstPost)
    return afterPosts
}

// This function fetches a specified amount of posts that were posted after given post(identified with id)
function getPostsAfter(leadingPostID, amountOfPosts) {
    // Fetch the posts posted after post with id [leadingPostID] from the database, LIMIT amountOfPosts
    let posts = orderPostsByDate(postData.posts)
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
    let posts = orderPostsByDate(postData.posts)
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




const BlogManagementList = props => {

    const blogPostInfo = {
        "id": "0",
        "date": "MM/dd/yyyy", // "MM/dd/yyyy"
        "title": "yya sure yes ok fine this is the excellenceya sure yes ok fine this is the excellenceya yes ok ",
    }

    let postInfoList = [blogPostInfo, blogPostInfo, blogPostInfo]

    const postRenderLimit = 10
    const postCount = setPostCount() // Need to query database on how many posts there are

    const [blogState, setBlog] = useState({
        newestPostID: getNewestPostID(),
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
            <ul className="list-group">
                {blogState.posts.map(bPostInfo => (
                    <BlogManagementListItem postInfo={bPostInfo}/>
                ))}

            </ul>

            <nav className="blog-nav">
                {blogNav}
            </nav>

            <style jsx>{`
                ul {
                    list-style-type: none;
                    margin-right: 10px;
                    margin-left: 10px;
                    padding: 0;
                    border-style: solid;
                    border-thickness: 2px;
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
export default BlogManagementList
