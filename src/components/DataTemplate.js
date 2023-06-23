import React, { useContext } from "react";
import TeamContext from "../context/TeamContext";
import _ from "lodash";
import { AiOutlinePlus } from "react-icons/ai";

const DataTemplate = ({ user, createTeam }) => {
  const { setNewUser } = useContext(TeamContext);

  const handleAdd = (user) => {
    setNewUser((prevUser) =>
      _.intersection(
        _.uniqBy([...prevUser, user], "domain"),
        _.filter([...prevUser, user], { available: true })
      )
    );
  };

  return (
    <>
      <div className="data-template">
        <img
          src={user.avatar}
          alt="avatar"
          className={`user-avatar ${
            user.available ? "border-green-400" : "border-red-400"
          }`}
        ></img>
        <h2>
          <b>Name:</b> {`${user.first_name} ${user.last_name}`}
        </h2>
        <p>
          <b>Email: </b>
          {user.email}
        </p>
        <p>
          <b>Gender: </b>
          {user.gender}{" "}
        </p>
        <p>
          <b>Domain: </b>
          {user.domain}
        </p>
        <p>
          <b>Available: </b>
          {user.available ? "YES" : "NO"}
        </p>
        {createTeam && (
          <button
            onClick={() => handleAdd(user)}
            className="add-button"
          >
            <AiOutlinePlus className="add-icon" /> Add
          </button>
        )}
      </div>
    </>
  );
};

export default DataTemplate;
