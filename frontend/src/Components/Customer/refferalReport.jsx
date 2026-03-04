import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input
} from "reactstrap";

const RefferalReport = () => {

  /* ---------------- CUSTOMER DATA ---------------- */
  const [customers] = useState([
    { id: 70, mobile: "0930105835", name: "", referrals: 0 },
    { id: 69, mobile: "0930105935", name: "", referrals: 0 },
    { id: 68, mobile: "0912345678", name: "", referrals: 0 },
    { id: 67, mobile: "1234567822", name: "", referrals: 0 },
    { id: 66, mobile: "1213648488", name: "", referrals: 0 },
    { id: 65, mobile: "9301556345", name: "", referrals: 0 },
    { id: 64, mobile: "9107244652", name: "", referrals: 0 },
    { id: 63, mobile: "360431893", name: "", referrals: 0 },
    { id: 62, mobile: "9301056356", name: "", referrals: 0 },
    { id: 60, mobile: "132439343", name: "Iphone", referrals: 0 }
  ]);

  const [search, setSearch] = useState("");

  /* ---------------- FILTER ---------------- */
  const filteredData = customers.filter((item) =>
    item.mobile.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      width: "80px",
      sortable: true
    },
    {
      name: "Mobile",
      selector: row => row.mobile,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name || "-",
      sortable: true
    },
    {
      name: "No of Referrals",
      selector: row => row.referrals,
      sortable: true
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Customers"
        parent="Users"
        title="Customers Referral Report"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Customers</H4>

                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "250px" }}
                />
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                  />
                </div>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default RefferalReport;