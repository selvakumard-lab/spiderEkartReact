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
  Badge
} from "reactstrap";

const ReturnRequest = () => {

  /* ---------------- RETURN REQUEST DATA ---------------- */
  const [returnRequests] = useState([
    {
      id: 1,
      userId: 101,
      userName: "Suresh",
      productName: "iPhone 14",
      price: 80000,
      discountPrice: 75000,
      quantity: 1,
      status: "Pending",
      date: "2024-02-10"
    },
    {
      id: 2,
      userId: 102,
      userName: "David",
      productName: "Samsung TV",
      price: 45000,
      discountPrice: 42000,
      quantity: 2,
      status: "Approved",
      date: "2024-02-12"
    }
  ]);

  const [search, setSearch] = useState("");

  /* ---------------- FILTER ---------------- */
  const filteredData = returnRequests.filter((item) =>
    item.userName.toLowerCase().includes(search.toLowerCase()) ||
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge color="success">Approved</Badge>;
      case "Rejected":
        return <Badge color="danger">Rejected</Badge>;
      default:
        return <Badge color="warning">Pending</Badge>;
    }
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
      width: "70px"
    },
    {
      name: "U.ID",
      selector: row => row.userId,
      sortable: true
    },
    {
      name: "U.Name",
      selector: row => row.userName,
      sortable: true
    },
    {
      name: "Product Name",
      selector: row => row.productName,
      sortable: true
    },
    {
      name: "Price",
      selector: row => `₹${row.price}`,
      sortable: true
    },
    {
      name: "Discounted Price",
      selector: row => `₹${row.discountPrice}`,
      sortable: true
    },
    {
      name: "Quantity",
      selector: row => row.quantity,
      sortable: true
    },
    {
      name: "Total",
      selector: row => `₹${row.discountPrice * row.quantity}`,
      sortable: true
    },
    {
      name: "Status",
      cell: row => getStatusBadge(row.status),
      sortable: true
    },
    {
      name: "Date",
      selector: row => row.date,
      sortable: true
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3 action-icons">
          <i
              className="icon-pencil-alt text-primary cursor-pointer"
              title="Edit"
          ></i>
          <i
              className="icon-trash text-danger cursor-pointer"
              title="Delete"
          ></i>
        </div>
      ),
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Return Requests"
        parent="Sales"
        title="Return Requests"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Return Requests</H4>

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
                    noDataComponent="No matching records found"
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

export default ReturnRequest;