import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const Brand = () => {
  const BASE_URL = "http://localhost:5000";

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    oldImage: null,
  });

  /* ---------------- FETCH BRAND ---------------- */
  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await api.get("/brand");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
    }
  };

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("name", formData.name);

    if (formData.image) {
      sendData.append("image", formData.image);
    }

    try {
      let res;

      if (editId) {
        res = await api.put(`/brand/${editId}`, sendData, {
          transformRequest: [(data, headers) => {
            delete headers["Content-Type"];
            return data;
          }],
        });
      } else {
        res = await api.post("/brand", sendData, {
          transformRequest: [(data, headers) => {
            delete headers["Content-Type"];
            return data;
          }],
        });
      }

      toast.success(res.data.message);

      // reset form
      setFormData({ name: "", image: null, oldImage: null });
      setEditId(null);

      fetchBrand();
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);

    setFormData({
      name: row.name,
      image: null,
      oldImage: row.image,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/brand/${id}`);
      if (response.data.success) {
        toast.success("Brand deleted successfully");
        fetchBrand();
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    {
      name: "S No",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Brand Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Brand Image",
      cell: (row) => (
        <img
          src={
            row.image
              ? `${BASE_URL}/${row.image}`
              : "/assets/images/project/default.png"
          }
          alt="brand"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3 action-icons">
          <i
            className="icon-pencil-alt text-primary cursor-pointer"
            title="Edit"
            onClick={() => handleEdit(row)}
          ></i>

          <i
            className="icon-trash text-danger cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.id)}
          ></i>
        </div>
      ),
    },
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Brand" parent="Product" title="Brand" />

      <Container fluid>
        <Row>

          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>{editId ? "Update Brand" : "Add Brand"}</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>

                  <FormGroup>
                    <Label>Brand Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Brand name"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Brand Image <br />
                      <small>
                        *Square image recommended (350px – 550px)*
                      </small>
                    </Label>

                    <Input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {editId && formData.oldImage && (
                      <div className="mt-2">
                        <p>Current Image:</p>
                        <img
                          src={`${BASE_URL}/${formData.oldImage}`}
                          width="80"
                          style={{ borderRadius: "8px" }}
                          alt=""
                        />
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex gap-2">
                    <Button color="primary" type="submit">
                      {editId ? "Update" : "Save"}
                    </Button>

                    {editId && (
                      <Button
                        color="secondary"
                        onClick={() => {
                          setEditId(null);
                          setFormData({ name: "", image: null, oldImage: null });
                        }}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>Brand List</H4>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable
                    pagination
                    paginationPerPage={7}
                    highlightOnHover
                    striped
                    columns={columns}
                    data={data}
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

export default Brand;
