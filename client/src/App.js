
import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import FormTable from './component/formtable';
import { Container, Input, Spacer, Table } from "@nextui-org/react";



function App() {
  

  const [AddSection, SetAddSection] = useState(false)
  const [EditSection, SetEditSection] = useState(false)
  const [formdata, setformdata] = useState(
    {
      name: "",
      email: "",
      mobile: ""
    })
  const [formdataedit, setformdataedit] = useState(
    {
      name: "",
      email: "",
      mobile: "",
      _id: ""

    })

  const [datalist, setDataList] = useState([])
  const [searchInput, setSearchInput] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setformdata((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:8080/create", formdata)
    console.log(data)

    if (data.data.success) {

      SetAddSection(false)
      alert(data.data.message)
    }
    GetFetchData()

  }

  const GetFetchData = async () => {
    const data = await axios.get("http://localhost:8080")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }
  console.log(datalist)

  useEffect(() => {
    GetFetchData()
  }, [])


  const handleDelete = async (id) => {
    const data = await axios.delete("http://localhost:8080/delete/" + id)
    alert(data.data.message)
    GetFetchData()

  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("http://localhost:8080/update/" + formdataedit._id, formdataedit);
    console.log(data)
    if (data.data.success) {
      alert(data.data.message)
      SetEditSection(false)
      GetFetchData()

    }
  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setformdataedit((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const handleEdit = (el) => {
    setformdataedit(el)
    SetEditSection(true)
  }



  const searchItems = (e) => {
    setSearchInput(e.target.value);

    if (searchInput !== '') {
      const filteredData = datalist.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
      });
      setDataList(filteredData);
    } else {
      GetFetchData();
    }
  };





  return (
    <>

      <div className="container">
        <button className="btn btn-add" onClick={() => SetAddSection(true)}>Add</button>

        {
          AddSection ? (
            <FormTable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => SetAddSection(false)}
              rest={formdata}
            />
          ) : null}
        {
          EditSection ? (
            <FormTable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => SetEditSection(false)}
              rest={formdataedit}
            />
          ) : null
        }

      
      
          <Input
            size="lg"
            bordered
            clearable
            placeholder="Search..."
            value={searchInput}
            onChange={  searchItems}  
          />

     
        <div className="TableContainer">
          <table>
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Email
                </th>
                <th>
                  Mobile
                </th>
                <th>

                </th>
                <th>

                </th>
              </tr>
            </thead>

            <tbody>
              {
                datalist[0] ? (
                  datalist.map((el) => {
                    return (
                      <tr>
                        <td>
                          {el.name}
                        </td>
                        <td>
                          {el.email}
                        </td>
                        <td>
                          {el.mobile}
                        </td>
                        <td>
                          <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
                        </td>
                        <td>
                          <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>Delete</button>

                        </td>
                      </tr>
                    )


                  }))
                  : (
                    <p>No Data Available</p>
                  )
              }
            </tbody>
          </table>

        </div>


      </div>

    </>
  );
}

export default App;
