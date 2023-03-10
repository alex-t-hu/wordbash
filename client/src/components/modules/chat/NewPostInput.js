import React, { useState } from "react";

import "./NewPostInput.css";

import { post } from "../../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      props.onSubmit && props.onSubmit(value);
      setValue("");
    }
  };

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }


  return (
    <div className="m-4 flex flex-row ">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="flex-grow bg-white font-bold hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded-lg"
        onKeyDown={handleKeyPressed}
      />
      <button
        type="submit"
        className="bg-white font-bold hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded-lg"
        value="Send"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
};

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
const NewStory = (props) => {
  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
const NewMessage = (props) => {
  const sendMessage = (value) => {
    const body = { recipient: props.recipient, content: value };
    // console.log"Sending message: ", body, " to ", props.recipient);
    post("/api/message", body);
  };

  return <NewPostInput defaultText="New Message" onSubmit={sendMessage} />;
}

export { NewComment, NewStory, NewMessage };
