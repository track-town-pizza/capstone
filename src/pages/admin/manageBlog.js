import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import ManagementHubButton from "../../components/admin/ManagementHubButton"
import GeneralButton from "../../components/admin/GeneralBtn"
import BlogManagementList from "../../components/admin/BlogManagementList"

const ManageBlog = ({ postData, info }) => {
   return (
        <Layout info={info}>
            <h2 className="text-center">Manage Blog Posts</h2>
            <div className="text-center" id="blogManageList">
                <BlogManagementList postData={postData} />
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
                    margin-bottom: 40px;
                }

			`}</style>
        </Layout>
    )
}

ManageBlog.getInitialProps = async (req, res) => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())
    
    return {
        postData: resJson,
        info: infoJson
    }
}

export default ManageBlog
