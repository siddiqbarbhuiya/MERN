import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { uri } from "services/helpers";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`${uri}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
  };
};
