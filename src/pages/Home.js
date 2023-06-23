import React, { useContext, useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import _ from "lodash";
import TeamContext from "../context/TeamContext";
import mock_data from "../data/db.json";
import DataTemplate from "../components/DataTemplate";
import "../App.css"

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { newUser } = useContext(TeamContext);
  const usersPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [filteredData, setFilteredData] = useState(mock_data);
  const [isChecked, setIsChecked] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);
  const data = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSelectDomain = (e) => {
    setSelectedDomain(e.target.value);
  };

  const handleSelectGender = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    const newData = mock_data.filter((value) =>
      value.first_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(newData);
  }, [searchValue]);

  useEffect(() => {
    let filteredData = mock_data;

    if (selectedDomain) {
      filteredData = _.filter(filteredData, { domain: selectedDomain });
    }

    if (selectedGender) {
      filteredData = _.filter(filteredData, { gender: selectedGender });
    }

    if (isChecked) {
      filteredData = _.filter(filteredData, { available: true });
    }

    setFilteredData(filteredData);
  }, [selectedDomain, selectedGender, isChecked]);

  const handleClearFilters = () => {
    setSelectedDomain("");
    setSelectedGender("");
    setIsChecked(false);
    setFilteredData(mock_data);
    setCurrentPage(1);
  };

  const handleTeam = () => {
    setCreateTeam(!createTeam);
    setIsChecked(!isChecked);
  };

  return (
    <div className="container mx-auto">
      <div className="text-xl my-5 d-flex justify-content-between px-20">
        <div className="d-flex align-items-center  gap-10px">
          <div className="search">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search by name"
            />
          </div>  
          <select className="form-select" onChange={handleSelectDomain}>
            <option value="">Filter by domain</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
            <option value="UI Designing">UI Designing</option>
            <option value="Business Development">Business Development</option>
          </select>
          <select className="form-select" onChange={handleSelectGender}>
            <option value="">Filter by gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Polygender">Polygender</option>
            <option value="Genderqueer">Genderqueer</option>
          </select>
          <label className="d-flex align-items-center">
            <b>Available </b>
            {isChecked ? (
              <FaCheckSquare className="text-2xl" />
            ) : (
              <FaRegSquare className="text-2xl" />
            )}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="visually-hidden"
            />
          </label>
          <GrPowerReset
            title="Reset all filter"
            onClick={handleClearFilters}
            className="cursor-pointer opacity-50 hover:opacity-100 text-3xl ml-2"
          />
        </div>
        <button
          onClick={handleTeam}
          className="d-flex align-items-center justify-end text-lg"
        >
          {!createTeam ? (
            <AiOutlinePlus className="mr-2" />
          ) : (
            <>
              <span className="d-inline-flex align-items-center">
                {newUser.length} Member
              </span>
              <RxCross2 className="mr-2" />
            </>
          )}
          Add Team
        </button>
      </div>
      <p className="text-center text-xl">
        <b>{currentPage}</b> out of <b>{totalPages}</b>
      </p>
      {selectedDomain.length || selectedGender.length ? (
        <p className="container mx-auto px-16">
          <b>{data.length}</b> results per page out of{" "}
          <b>{filteredData.length}</b>
        </p>
      ) : null}
      <div className="row row-cols-1 row-cols-sm-3 g-4 mx-10">
        {data.map((user) => (
          <DataTemplate key={user.id} user={user} createTeam={createTeam} />
        ))}
      </div>
      <div className="mb-16 d-flex justify-content-between container mx-auto px-16">
        <button
          disabled={currentPage < 2}
          onClick={handlePreviousPage}
          className={`btn btn-secondary${currentPage < 2 ? " disabled" : ""}`}
        >
          Previous
        </button>
        <button
          disabled={currentPage > totalPages - 1}
          onClick={handleNextPage}
          className={`btn btn-secondary${
            currentPage > totalPages - 1 ? " disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
