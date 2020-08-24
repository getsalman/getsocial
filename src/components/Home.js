import React, { useEffect, useContext, Fragment } from "react";
import Page from "./Page";
import { useImmer } from "use-immer";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import StateContext from "../StateContext";
import Post from "./Post";

const Home = () => {
  const appState = useContext(StateContext);

  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post("/getHomeFeed", {
          token: appState.user.token,
        });
        setState((draft) => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (error) {
        console.log("There was a Problem.");
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (state.isLoading) {
    return <LoadingDotsIcon />;
  }

  return (
    <Page>
      {state.feed.length > 0 && (
        <Fragment>
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <div className="list-group">
            {state.feed.map((post) => {
              return <Post post={post} key={post._id} />;
            })}
          </div>
        </Fragment>
      )}
      {state.feed.length == 0 && (
        <Fragment>
          <h2 className="text-center">
            Hello <strong>{appState.user.username}</strong>, your feed is empty.
          </h2>
          <p className="lead text-muted text-center">
            Your feed displays the latest posts from the people you follow. If
            you don&rsquo;t have any friends to follow that&rsquo;s okay; you
            can use the &ldquo;Search&rdquo; feature in the top menu bar to find
            content written by people with similar interests and then follow
            them.
          </p>
        </Fragment>
      )}
    </Page>
  );
};

export default Home;
