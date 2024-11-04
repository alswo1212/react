import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "pages/PostList";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostList />} />
                {/* <Route path="/user" element={}/> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;