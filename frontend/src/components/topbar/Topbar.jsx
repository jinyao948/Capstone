import "./topbar.css";

import { Search} from "@material-ui/icons";
import { Link, useHistory} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';


export default function Topbar() {
  //for api call
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [APIData, setAPIData] = useState([])
   const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
let history = useHistory();


  
// for search on lcick 
  const [selectedOption, setSelectedOption] = useState("");


    useEffect(() => {
        axios.get(`/users/all`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(APIData)
    }
  }
  

const arraySearch = Object.values(APIData);
const options = arraySearch.map(function (username) {
  return { value: username.username, label: username.username };
})
  
 

//  const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

// const MyComponent = () => (
//   <Select options={options} />
// )
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Fakebook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Select
           name="form-field-name"
          options={options}
          onChange={(e) => {
            console.log(JSON.stringify(e))
            const selectedChoice = e.value;
            setSelectedOption(selectedChoice)
            history.push(`/profile/${e.value}`)
          }
          }
          
        />
        
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"></span>
          <span className="topbarLink"></span>
        </div>
    
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
     