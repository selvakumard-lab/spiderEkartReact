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
  Badge,
  Button
} from "reactstrap";

const Customer = () => {

  /* ---------------- STATIC CUSTOMER DATA ---------------- */
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      balance: 1200,
      referralCode: "REF123",
      friendCode: "FRI456",
      street: "12, Anna Street",
      area: "T Nagar",
      city: "Chennai",
      status: "Active",
      dateTime: "2026-02-20 10:30 AM"
    },
    {
      id: 2,
      name: "David Smith",
      email: "david@example.com",
      mobile: "9123456780",
      balance: 450,
      referralCode: "REF789",
      friendCode: "FRI111",
      street: "45, MG Road",
      area: "Velachery",
      city: "Chennai",
      status: "Inactive",
      dateTime: "2026-02-18 04:15 PM"
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      mobile: "9988776655",
      balance: 3000,
      referralCode: "REF222",
      friendCode: "FRI333",
      street: "78, GST Road",
      area: "Tambaram",
      city: "Chennai",
      status: "Active",
      dateTime: "2026-02-17 09:45 AM"
    }
  ];

  /* ---------------- SEARCH STATE ---------------- */
  const [search, setSearch] = useState("");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.mobile.includes(search) ||
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- EXPORT FUNCTION (NO LIBRARY) ---------------- */
  const exportToCSV = () => {

    const headers = [
      "ID",
      "Name",
      "Email",
      "Mobile",
      "Balance",
      "Referral Code",
      "Friend Code",
      "Street",
      "Area",
      "City",
      "Status",
      "Date & Time"
    ];

    const rows = filteredData.map(item => [
      item.id,
      item.name,
      item.email,
      item.mobile,
      item.balance,
      item.referralCode,
      item.friendCode,
      item.street,
      item.area,
      item.city,
      item.status,
      item.dateTime
    ]);

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = "customer_data.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { name: "ID", selector: row => row.id, sortable: true, width: "70px" },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Mobile", selector: row => row.mobile, sortable: true },
    { name: "Balance (₹)", selector: row => row.balance, sortable: true },
    { name: "Referral Code", selector: row => row.referralCode },
    { name: "Friend’s Code", selector: row => row.friendCode },
    { name: "Street", selector: row => row.street },
    { name: "Area", selector: row => row.area },
    { name: "City", selector: row => row.city },
    {
      name: "Status",
      cell: (row) => (
        <Badge color={row.status === "Active" ? "success" : "danger"}>
          {row.status}
        </Badge>
      ),
      sortable: true,
    },
    { name: "Date & Time", selector: row => row.dateTime, sortable: true },
    {
      name: "Action",
      cell: () => (
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

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Customer" parent="Users" title="Customer List" />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Customer List</H4>

                <div className="d-flex gap-2 align-items-center">
                  <Input
                    type="text"
                    placeholder="Search Name / Email / Mobile / City..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "250px" }}
                  />

                  <Button color="success" onClick={exportToCSV}>
                    Export
                  </Button>
                </div>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable
                    pagination
                    paginationPerPage={5}
                    highlightOnHover
                    striped
                    columns={columns}
                    data={filteredData}
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

export default Customer;