import React from "react"
import Link from "next/link"

const BlogManagementListItem = ({ postInfo }) => {

    let blogInfo = postInfo
    let postLink = "/blog/" + blogInfo._id
    let editLink = "/blog/" + blogInfo._id + "/edit"

     // This function controls what happens when the user hits the delete button
    function onClickDelete(event) {
        let confirmText = "Are you sure you want to delete this post? Post ID: " + blogInfo.id
        const { name, type } = event.target
        if(type === 'submit' || type === 'click') {
            if (confirm(confirmText)) {
                // Remove post from database
                alert("Post deleted.")
            }
        }
    }

    return (
        <div>
            <li>
                <span className="datePart">{blogInfo.date}</span>
                <span className="titlePart">
                    <Link href={postLink}>
                        <a>{blogInfo.title}</a>
                    </Link>
                </span>
                <span className="buttonsPart">
                    <span className="deleteButtonPart" button name={blogInfo.id} onClick={onClickDelete}><button>Delete</button></span>
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
        </div>
    )
}
export default BlogManagementListItem
