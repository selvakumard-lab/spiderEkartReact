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

const FundTransfer = () => {

  /* ---------------- STATIC DATA (LIKE IMAGE) ---------------- */
  const [fundTransfers] = useState([
    {
      id: 10,
      deliveryBoyId: 2,
      name: "SNBM Delivery Person",
      mobile: "7090997670",
      address: "39, AS Char Street",
      openingBalance: 0,
      closingBalance: 0,
      message: "Order Delivery Commission.",
      status: "SUCCESS",
      dateCreated: "2025-06-04 10:43:16"
    },
    {
      id: 9,
      deliveryBoyId: 3,
      name: "TEST DELIVERY BOY",
      mobile: "9150489997",
      address: "New No.7, Old No.147, Mount Road, Saidapet, Chennai",
      openingBalance: 0,
      closingBalance: 0,
      message: "Order Delivery Boy Commission.",
      status: "SUCCESS",
      dateCreated: "2023-08-23 18:18:33"
    },
    {
      id: 8,
      deliveryBoyId: 1,
      name: "dunzo",
      mobile: "1234567890",
      address: "dunzo",
      openingBalance: 0,
      closingBalance: 0,
      message: "Order Delivery Commission.",
      status: "SUCCESS",
      dateCreated: "2023-06-04 19:28:32"
    }
  ]);

  const [search, setSearch] = useState("");

  /* ---------------- FILTER ---------------- */
  const filteredData = fundTransfers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.mobile.includes(search) ||
    item.deliveryBoyId.toString().includes(search)
  );

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status) => {
    if (status === "SUCCESS") {
      return <Badge color="success">SUCCESS</Badge>;
    }
    return <Badge color="secondary">{status}</Badge>;
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
      name: "Delivery Boy ID",
      selector: row => row.deliveryBoyId,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      wrap: true
    },
    {
      name: "Mobile",
      selector: row => row.mobile,
      sortable: true
    },
    {
      name: "Address",
      selector: row => row.address,
      sortable: true,
      wrap: true,
      grow: 2
    },
    {
      name: "Opening Balance",
      selector: row => row.openingBalance,
      sortable: true
    },
    {
      name: "Closing Balance",
      selector: row => row.closingBalance,
      sortable: true
    },
    {
      name: "Message",
      selector: row => row.message,
      sortable: true,
      wrap: true
    },
    {
      name: "Status",
      cell: row => getStatusBadge(row.status),
      sortable: true
    },
    {
      name: "Date Created",
      selector: row => row.dateCreated,
      sortable: true,
      wrap: true
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Fund Transfers"
        parent="Delivery"
        title="Fund Transfers"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Fund Transfers</H4>

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
                    persistTableHead
                    noDataComponent="No records found"
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

export default FundTransfer;