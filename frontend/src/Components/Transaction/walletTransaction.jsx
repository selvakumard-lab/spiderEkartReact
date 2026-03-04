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

const WalletTransaction = () => {

  /* ---------------- STATIC DATA (LIKE IMAGE) ---------------- */
  const data = [
    {
      id: 87,
      userId: 12,
      userName: "Shanmuganathan",
      type: "credit",
      amount: 0,
      message: "Balance credited against item cancellation.",
      status: "Active",
      date: "2026-02-13 15:18:33"
    },
    {
      id: 86,
      userId: 60,
      userName: "Iphone",
      type: "credit",
      amount: 0,
      message: "Balance credited against item cancellation.",
      status: "Active",
      date: "2026-02-12 04:14:02"
    },
    {
      id: 85,
      userId: 60,
      userName: "Iphone",
      type: "debit",
      amount: 100,
      message: "Used against Order Placement",
      status: "Active",
      date: "2026-02-12 04:13:46"
    },
    {
      id: 75,
      userId: 5,
      userName: "Suresh",
      type: "debit",
      amount: 173.9,
      message: "Used against Order Placement",
      status: "Active",
      date: "2025-09-04 22:01:52"
    },
  ];

  /* ---------------- SEARCH ---------------- */
  const [search, setSearch] = useState("");

  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status) => {
    return <Badge color="success">{status}</Badge>;
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
      width: "80px"
    },
    {
      name: "User ID",
      selector: row => row.userId,
      sortable: true
    },
    {
      name: "User Name",
      selector: row => row.userName,
      sortable: true
    },
    {
      name: "Type",
      selector: row => row.type,
      sortable: true
    },
    {
      name: "Amount",
      selector: row => row.amount,
      sortable: true
    },
    {
      name: "Message",
      selector: row => row.message,
      wrap: true,
      grow: 2
    },
    {
      name: "Status",
      cell: row => getStatusBadge(row.status),
      sortable: true
    },
    {
      name: "Transaction Date",
      selector: row => row.date,
      sortable: true,
      wrap: true
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Wallet Transactions"
        parent="Finance"
        title="Wallet Transactions"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>

              {/* HEADER */}
              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Wallet Transactions</H4>

                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "250px" }}
                />
              </CardHeader>

              {/* TABLE */}
              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationPerPage={10}
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

export default WalletTransaction;