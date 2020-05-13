import React from "react"
import Link from "next/link"
import fetch from "isomorphic-unfetch"
import { format } from "date-fns"
import { Router } from "next/router"

const BlogManagementListItem = ({ postInfo }) => {

    let blogInfo = postInfo
    let postLink = "/blog/" + blogInfo._id
    let editLink = "/blog/" + blogInfo._id + "/edit"
    const formattedDate = format(new Date(blogInfo.date), "MM/dd/yyyy")

     // This function controls what happens when the user hits the delete button
    async function onClickDelete(event) {
        let confirmText = "Are you sure you want to delete this post? Post ID: " + blogInfo.id
        if (confirm(confirmText)) {
            // Remove post from database
            const res = await fetch(`${process.env.URL_ROOT}/api/posts`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId: blogInfo._id })
            }).then(_ => _.json())
            
            if (res.err) {
                // Display error toast if error message is returned from DB API
                alert("An error occurred while deleting post. Try again later.")
            } else if (res.message === "OK") {
                // Display success toast if OK message is returned from DB API
                alert("Post has been successfully deleted.")
                Router.push("/admin/manageBlog")
            }
        }
    }

    return (
        <form onSubmit={onClickDelete}>
            <li>
                <span className="datePart">{formattedDate}</span>
                <span className="titlePart">
                    <Link href={postLink}>
                        <a>{blogInfo.title}</a>
                    </Link>
                </span>
                <span className="buttonsPart">
                    <button className="deleteButtonPart" type="submit" name={blogInfo.id}>Delete</button>
                    <span className="editButtonPart">
                        <Link href={editLink}>
                            <button>Edit</button>
                        </Link>
                    </span>
                </span>
            </li>
            <style jsx>{`
                li {
                    padding: 10px;
                    border-style: solid;
                    border-width: 1px;
                    display: inline-block;
                    width: 100%;
                }

                .datePart {
                    float: left;
                    margin-left: 10px;
                }

                .titlePart {
                    margin-right: 10px;
                    margin-left: 10px;
                    display: inline-block;
                }

                .deleteButtonPart {

                }

                .editButtonPart {

                }

                .buttonsPart {
                    display: inline-block;
                    float: right;
                    margin-right: 10px;
                }
            `}</style>
        </form>
    )
}

export default BlogManagementListItem
