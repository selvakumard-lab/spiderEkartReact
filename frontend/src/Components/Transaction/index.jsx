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

const Transaction = () => {

  /* ---------------- STATIC DATA (TRANSACTION) ---------------- */
  const data = [
    {
      id: 1,
      transactionId: "TXN1001",
      userName: "John Doe",
      orderId: "ORD1001",
      type: "Credit",
      txnId: "PAY987654",
      amount: 2500,
      status: "SUCCESS",
      message: "Payment completed successfully",
      date: "2026-02-01 10:45:12"
    },
    {
      id: 2,
      transactionId: "TXN1002",
      userName: "David Smith",
      orderId: "ORD1002",
      type: "Debit",
      txnId: "PAY987655",
      amount: 1800,
      status: "FAILED",
      message: "Payment failed due to insufficient balance",
      date: "2026-02-02 14:12:05"
    },
  ];

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.transactionId.toLowerCase().includes(search.toLowerCase()) ||
    item.userName.toLowerCase().includes(search.toLowerCase()) ||
    item.orderId.toLowerCase().includes(search.toLowerCase()) ||
    item.txnId.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status) => {
    switch (status) {
      case "SUCCESS":
        return <Badge color="success">SUCCESS</Badge>;
      case "FAILED":
        return <Badge color="danger">FAILED</Badge>;
      case "PENDING":
        return <Badge color="warning">PENDING</Badge>;
      default:
        return <Badge color="secondary">{status}</Badge>;
    }
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "Transaction ID",
      selector: row => row.transactionId,
      sortable: true,
      wrap: true
    },
    {
      name: "User Name",
      selector: row => row.userName,
      sortable: true
    },
    {
      name: "Order ID",
      selector: row => row.orderId,
      sortable: true
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
    },
    {
      name: "TXN ID",
      selector: row => row.txnId,
      sortable: true,
      wrap: true
    },
    {
      name: "Amount",
      selector: row => `₹${row.amount}`,
      sortable: true
    },
    {
      name: "Status",
      cell: row => getStatusBadge(row.status),
      sortable: true
    },
    {
      name: "Message",
      selector: row => row.message,
      wrap: true,
      grow: 2
    },
    {
      name: "Transaction Date",
      selector: row => row.date,
      sortable: true,
      wrap: true
    }
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Transactions"
        parent="Finance"
        title="Transactions"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Transaction List</H4>

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

export default Transaction;