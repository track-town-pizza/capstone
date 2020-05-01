import React from "react"

import BlogManagementListItem from "./BlogManagementListItem"

//function getBlogInfo

const BlogManagementList = props => {

    let postInfoList = ["dog", "log", "bog"]


    return (
        <div>
            <ul className="list-group">
                {postInfoList.map(postInfo => (
                    <BlogManagementListItem pname={postInfo} name={postInfo} />
                ))}

            </ul>

            <style jsx>{`

            `}</style>
        </div>
    )
}
export default BlogManagementList
