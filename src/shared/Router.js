import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "pages/PostList";
import User from "components/user/User";
import Layout from "components/Layout";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default Router;