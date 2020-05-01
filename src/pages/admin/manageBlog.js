import React, { useState, useEffect } from "react"
import { format } from "date-fns"

import Layout from "../../components/Layout"
import ManagementHubButton from "../../components/admin/ManagementHubButton"
import GeneralButton from "../../components/admin/GeneralBtn"
import BlogManagementList from "../../components/admin/BlogManagementList"

const ManageBlog = () => {

    //let postInfoList = ["dog", "log", "bog"]


     // This function controls what happens when the user hits the delete button
    /*
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
    */

   return (
        <Layout>
            <h2 className="text-center">Manage Blog Posts</h2>
            <div className="text-center">
       {/*<BlogManagementList removePostFunc={onClick} postInfos={postInfoList}/>*/}
                <BlogManagementList/>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-inline p-2">
                    <ManagementHubButton/>
                </div>
                <div className="d-inline p-2">
                    <GeneralButton words="Create New Post" link="/.."/>
                </div>
            </div>
			<style jsx>{`
                .box {
                    text-align:center;
                }
			`}</style>
        </Layout>
    )
}
export default ManageBlog
