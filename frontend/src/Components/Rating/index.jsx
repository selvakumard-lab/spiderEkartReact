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

const Rating = () => {

  /* ---------------- STATIC DATA ---------------- */
  const data = [
    { id: 1, productName: "Nike Air Max", userName: "John Doe", orderId: "ORD1001", rating: 5, description: "Excellent quality and very comfortable.", createdAt: "2026-02-01" },
    { id: 2, productName: "Puma T-Shirt", userName: "David Smith", orderId: "ORD1002", rating: 4, description: "Nice fabric and good fitting.", createdAt: "2026-02-02" },
    { id: 3, productName: "Adidas Hoodie", userName: "Michael Johnson", orderId: "ORD1003", rating: 5, description: "Loved it! Worth the price.", createdAt: "2026-02-03" },
    { id: 4, productName: "Reebok Sneakers", userName: "Chris Evans", orderId: "ORD1004", rating: 3, description: "Average quality, delivery was slow.", createdAt: "2026-02-04" },
    { id: 5, productName: "Apple Watch", userName: "Robert Brown", orderId: "ORD1005", rating: 5, description: "Amazing product and fast delivery.", createdAt: "2026-02-05" },
    { id: 6, productName: "Samsung Buds", userName: "Daniel Wilson", orderId: "ORD1006", rating: 4, description: "Sound quality is great.", createdAt: "2026-02-06" },
    { id: 7, productName: "Sony Headphones", userName: "James Anderson", orderId: "ORD1007", rating: 5, description: "Best headphones I have used.", createdAt: "2026-02-07" },
    { id: 8, productName: "Dell Laptop", userName: "William Taylor", orderId: "ORD1008", rating: 4, description: "Performance is smooth.", createdAt: "2026-02-08" },
    { id: 9, productName: "HP Printer", userName: "Joseph Martinez", orderId: "ORD1009", rating: 3, description: "Works fine but ink expensive.", createdAt: "2026-02-09" },
    { id: 10, productName: "Logitech Mouse", userName: "Thomas Lee", orderId: "ORD1010", rating: 5, description: "Very smooth and comfortable.", createdAt: "2026-02-10" },
  ];

  /* ---------------- SEARCH STATE ---------------- */
  const [search, setSearch] = useState("");

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.userName.toLowerCase().includes(search.toLowerCase()) ||
    item.orderId.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { name: "ID", selector: row => row.id, sortable: true, width: "70px" },
    { name: "Product Name", selector: row => row.productName, sortable: true },
    { name: "User Name", selector: row => row.userName, sortable: true },
    { name: "Order ID", selector: row => row.orderId, sortable: true },
    {
      name: "Rating",
      cell: (row) => (
        <span style={{ fontWeight: "bold", color: "#ff9800" }}>
          {"⭐".repeat(row.rating)}
        </span>
      ),
      sortable: true,
      width: "150px",
    },
    { name: "Rating Description", selector: row => row.description, wrap: true },
    { name: "Created At", selector: row => row.createdAt, sortable: true },
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Rating" parent="Product" title="Rating" />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Product Rating List</H4>

                {/* 🔍 SEARCH BOX */}
                <Input
                  type="text"
                  placeholder="Search Product / User / Order..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "280px" }}
                />
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

export default Rating;
