/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components

import { useState, useEffect } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";

// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

export default function data() {
  const [donorList, setdonorList] = useState([]);

  function findDonor() {
    const serviceURL = "http://localhost:5000/findDonor";
    axios
      .get(serviceURL, {})
      .then((res) => {
        console.log(res.data.result);
        setdonorList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  useEffect(() => {
    findDonor();
  }, []);
  function handleDelete(id) {
    console.log(id);
    const serviceURL = "http://localhost:5000/deleteDonor/" + id;
    axios
      .delete(serviceURL, {})
      .then(() => {
        findDonor();
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }

  const donordata = donorList.map((row) => ({
    name: row.lastName,
    district: row.district,
    city: row.address,
    BloodGroup: row.bloodGroup,
    Contact: row.mobNum,
  }));

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "name", accessor: "name", width: "45%", align: "left" },
      { Header: "district", accessor: "district", align: "left" },
      { Header: "blood group", accessor: "bloodgroup", align: "center" },
      { Header: "contact", accessor: "contact", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: donorList.map((row) => ({
      name: (
        <Author image={team2} name={"" + row.firstName + "" + row.lastName} email={row.gender} />
      ),
      district: <Job title={row.district} description={row.pincode} />,
      bloodgroup: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {row.bloodGroup}
        </MDTypography>
      ),
      contact: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {row.mobNum}
        </MDTypography>
      ),
      action: (
        <MDBox
          ml={-1}
          onClick={() => {
            handleDelete(row._id);
          }}
        >
          <MDBadge badgeContent="Delete" color="warning" variant="gradient" size="sm" />
        </MDBox>
      ),
    })),
  };
}
