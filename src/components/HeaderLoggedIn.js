import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

const HeaderLoggedIn = (props) => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleLogout = () => {
    appDispatch({ type: "logout" });
    appDispatch({
      type: "flashMessage",
      value: "You have succesfully logged out.",
    });
  };

  const handleSearchIcon = (e) => {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <a
        data-for="search"
        data-tip="Search"
        onClick={handleSearchIcon}
        href="#"
        className="text-white mr-2 header-search-icon"
      >
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip place="bottom" id="search" className="custome-tooltip" />{" "}
      <span
        onClick={() => appDispatch({ type: "toggleChat" })}
        data-for="chat"
        data-tip="Chat"
        className={
          "mr-2 header-chat-icon " +
          (appState.unreadChatCount ? "text-danger" : "text-white")
        }
      >
        <i className="fas fa-comment"></i>
        {appState.unreadChatCount ? (
          <span className="chat-count-badge text-white">
            {appState.unreadChatCount < 10 ? appState.unreadChatCount : "9+"}
          </span>
        ) : (
          ""
        )}
      </span>
      <ReactTooltip place="bottom" id="chat" className="custome-tooltip" />{" "}
      <Link
        data-for="profile"
        data-tip="My Profile"
        to={`/profile/${appState.user.username}`}
        className="mr-2"
      >
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip place="bottom" id="profile" className="custome-tooltip" />{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
