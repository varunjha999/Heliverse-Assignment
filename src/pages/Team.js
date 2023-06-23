import React, { useContext, useEffect } from "react";
import TeamContext from "../context/TeamContext";

const Team = () => {
  const { newUser } = useContext(TeamContext);

  useEffect(() => {
    document.title = "Team Page";
  }, []);

  return (
    <>
      {newUser.length ? (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {newUser.map((user) => (
              <div
                key={user.id}
                className="col d-flex align-items-center"
              >
                <div className="card">
                  <img
                    src={user.avatar}
                    className={`card-img-top border-4 mx-auto rounded-circle ${
                      user.available ? "border-success" : "border-danger"
                    }`}
                    alt="avatar"
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>Name:</b> {`${user.first_name} ${user.last_name}`}
                    </h5>
                    <p className="card-text">
                      <b>Email: </b>
                      {user.email}
                    </p>
                    <p className="card-text">
                      <b>Gender: </b>
                      {user.gender}{" "}
                    </p>
                    <p className="card-text">
                      <b>Domain: </b>
                      {user.domain}
                    </p>
                    <p className="card-text">
                      <b>Available: </b>
                      {user.available ? "YES" : "NO"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-5xl font-bold mt-20">
          Add Team First
        </h1>
      )}
    </>
  );
};

export default Team;
