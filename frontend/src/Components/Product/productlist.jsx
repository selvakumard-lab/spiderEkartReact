import React, { Fragment, useEffect, useState } from "react";
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
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { toast } from "react-toastify";

const ProductListContain = () => {

    const BASE_URL = "http://localhost:5000";

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch Products
  const getProducts = async () => {
    try {
      const res = await api.get("/product");
      setProducts(res.data.data);
      setFilterProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Search Filter
  useEffect(() => {
    const result = products.filter((item) =>
      item.product_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilterProducts(result);
  }, [search, products]);

  // Delete Product
  const deleteProduct = async (id) => {

    if (!window.confirm("Are you sure delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product Deleted");
      getProducts();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // Table Columns
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "80px"
    },
    {
      name: "Name",
      selector: (row) => row.product_name,
      sortable: true
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${BASE_URL}/${row.image}`}
          alt="product"
          width="50"
          height="50"
          style={{ objectFit: "cover", borderRadius: "5px" }}
        />
      )
    },
    {
      name: "Price",
      selector: (row) => `${row.price}`
    },
    {
      name: "Measurement",
      selector: (row) => row.measurement
    },
    {
      name: "Stock",
      selector: (row) => row.stock
    },
    {
      name: "Availability",
      cell: (row) =>
        row.stock > 0 ? (
          <span className="badge bg-success">In Stock</span>
        ) : (
          <span className="badge bg-danger">Out of Stock</span>
        )
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3 action-icons">

            <i
                className="icon-eye text-info cursor-pointer"
                title="View"
                onClick={() => navigate(`/product-view/${row.id}`)}
            ></i>

            <i
                className="icon-pencil-alt text-primary cursor-pointer"
                title="Edit"
                onClick={() => navigate(`/product-edit/${row.id}`)}
            ></i>

            <i
                className="icon-trash text-danger cursor-pointer"
                title="Delete"
                onClick={() => deleteProduct(row.id)}
            ></i>

        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Product List"
        parent="Ecommerce"
        title="Product List"
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <H4>Product List</H4>
                
                <Input
                                  type="text"
                                  placeholder="Search Product / User / Order..."
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                  style={{ width: "280px" }}
                                />
              </CardHeader>

              <CardBody>

                

                {/* Table */}
                <div className="table-responsive theme-scrollbar product-table">
                <DataTable
                  columns={columns}
                  data={filterProducts}
                  pagination
                  striped
                  highlightOnHover
                  responsive
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

export default ProductListContain;