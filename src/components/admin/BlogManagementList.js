import React from "react"
import Link from "next/link"

import BlogManagementListItem from "./BlogManagementListItem"

//function getBlogInfo

const BlogManagementList = props => {

    const blogPostInfo = {
        "id": "0",
        "date": "MM/dd/yyyy", // "MM/dd/yyyy"
        "title": "yya sure yes ok fine this is the excellenceya sure yes ok fine this is the excellenceya yes ok ",
    }

    let postInfoList = [blogPostInfo, blogPostInfo, blogPostInfo]


    return (
        <div>
            <ul className="list-group">
                {postInfoList.map(bPostInfo => (
                    <BlogManagementListItem postInfo={bPostInfo}/>
                ))}

            </ul>

            <style jsx>{`
                ul {
                    list-style-type: none;
                    margin-right: 10px;
                    margin-left: 10px;
                    padding: 0;
                    border-style: solid;
                    border-thickness: 2px;
                }

            `}</style>
        </div>
    )
}
export default BlogManagementList
