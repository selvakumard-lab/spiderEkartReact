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
  Input,
  Button
} from "reactstrap";

const LoyaltyPoint = () => {

  /* ---------------- LOYALTY POINT SETTING ---------------- */
  const [pointValue, setPointValue] = useState(12);

  /* ---------------- CUSTOMER DATA ---------------- */
  const [customers] = useState([
    {
      id: 5,
      name: "Suresh",
      totalEarned: 120,
      totalRedeem: 40,
    },
    {
      id: 6,
      name: "Test spider asia",
      totalEarned: 80,
      totalRedeem: 20,
    },
    {
      id: 8,
      name: "rajasuarey",
      totalEarned: 200,
      totalRedeem: 100,
    },
    {
      id: 10,
      name: "spider test",
      totalEarned: 50,
      totalRedeem: 0,
    },
    {
      id: 12,
      name: "Shanmuganathan",
      totalEarned: 300,
      totalRedeem: 150,
    }
  ]);

  const [search, setSearch] = useState("");

  /* ---------------- CALCULATE BALANCE ---------------- */
  const customerData = customers.map((cust) => ({
    ...cust,
    balance: cust.totalEarned - cust.totalRedeem
  }));

  /* ---------------- FILTER ---------------- */
  const filteredData = customerData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- VIEW ORDER FUNCTION ---------------- */
  const handleViewOrder = (row) => {
    alert(`View orders for ${row.name}`);
    // You can redirect to order page here
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      width: "80px",
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Total Earned Points",
      selector: row => row.totalEarned,
      sortable: true
    },
    {
      name: "Total Redeem Points",
      selector: row => row.totalRedeem,
      sortable: true
    },
    {
      name: "Balance Loyalty Points",
      selector: row => row.balance,
      sortable: true
    },
    {
      name: "View All Order",
      cell: row => (
        <Button
          color="link"
          onClick={() => handleViewOrder(row)}
        >
          View
        </Button>
      )
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Customers Loyalty Points"
        parent="Users"
        title="Customers Loyalty Points"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <H4>Customers Loyalty Points</H4>
              </CardHeader>

              <CardBody>

                {/* ------------ Loyalty Setting + Search Row ------------ */}
                <Row className="mb-3 align-items-center">
                  <Col md="6">
                    <label className="me-2">
                      <strong>One Loyalty Points Equal to :</strong>
                    </label>
                    <Input
                      type="number"
                      value={pointValue}
                      onChange={(e) => setPointValue(e.target.value)}
                      style={{ width: "150px", display: "inline-block" }}
                    />
                  </Col>

                  <Col md="6" className="text-end">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ width: "250px", display: "inline-block" }}
                    />
                  </Col>
                </Row>

                {/* ------------ Table ------------ */}
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

export default LoyaltyPoint;