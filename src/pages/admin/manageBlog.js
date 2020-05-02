import React, { useState, useEffect } from "react"
import { format } from "date-fns"

import Layout from "../../components/Layout"
import ManagementHubButton from "../../components/admin/ManagementHubButton"
import GeneralButton from "../../components/admin/GeneralBtn"
import BlogManagementList from "../../components/admin/BlogManagementList"

const ManageBlog = () => {
   return (
        <Layout>
            <h2 className="text-center">Manage Blog Posts</h2>
            <div className="text-center" id="blogManageList">
                <BlogManagementList />
            </div>
            <div className="d-flex flex-row justify-content-between">
                <div className="d-inline p-2">
                    <ManagementHubButton/>
                </div>
                <div className="d-inline p-2">
                    <GeneralButton words="Create New Post" link="./createNewPost"/>
                </div>
            </div>
			<style jsx>{`
                .box {
                    text-align:center;
                }

                #blogManageList {
                    margin-bottom: 10px;
                }

			`}</style>
        </Layout>
    )
}
export default ManageBlog
