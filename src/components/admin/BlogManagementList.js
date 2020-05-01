import React from "react"

import BlogManagementListItem from "./BlogManagementListItem"

//function getBlogInfo

const BlogManagementList = props => {

    let postInfoList = ["dog", "log", "bog"]


     // This function controls what happens when the user hits the delete button
    function onClick(event) {
        const { name, type } = event.target
        //console.log("type: ", type)
        if(type === 'submit' || type === 'click') {
            if (confirm("Are you sure you want to delete this post? Post ID: " + toString(name))) {
                // Remove post from database
                alert("Post deleted.")
            }
        }
    }


    return (
        <div>
            <ul className="list-group">
                {postInfoList.map(postInfo => (
                    <BlogManagementListItem removePostFunc={onClick} pname={postInfo} name={postInfo} />
                ))}

            </ul>

            <button onClick={props.removePostFunc} name={props.pname}/>

            <style jsx>{`

            `}</style>
        </div>
    )
}
export default BlogManagementList
