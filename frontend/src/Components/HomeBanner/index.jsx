import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Form, FormGroup, Label, Input
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const HomeBanner = () => {

  const BASE_URL = "http://localhost:5000";

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    slider_type: "",
    type: "",
    ref_id: "",
    image: null,
    oldImage: null,
  });

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchBanner();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchBanner = async () => {
    const res = await api.get("/homebanner");
    setData(res.data.data || []);
  };

  const fetchCategories = async () => {
    const res = await api.get("/category");
    setCategories(res.data.data || []);
  };

  const fetchProducts = async () => {
    const res = await api.get("/category");
    setProducts(res.data.data || []);
  };

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {

    e.preventDefault();

    const sendData = new FormData();
    sendData.append("slider_type", formData.slider_type);
    sendData.append("type", formData.type);
    sendData.append("ref_id", formData.ref_id);

    sendData.append("image", formData.image);

    let res;
    if (editId)

        res = await api.put(`/homebanner/${editId}`, sendData, {
            transformRequest: [(data, headers) => {
              delete headers["Content-Type"];
              return data;
            }],
        });
    else

        res = await api.post("/homebanner", sendData, {
            transformRequest: [(data, headers) => {
              delete headers["Content-Type"];
              return data;
            }],
        });

    toast.success(res.data.message);
    resetForm();
    fetchBanner();
  };

  const resetForm = () => {
    setFormData({
      slider_type: "",
      type: "",
      ref_id: "",
      image: null,
      oldImage: null,
    });
    setEditId(null);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData({
      slider_type: row.slider_type,
      type: row.type,
      ref_id: row.ref_id || "",
      image: null,
      oldImage: row.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete banner?")) return;
    await api.delete(`/homebanner/${id}`);
    fetchBanner();
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { name: "ID", selector: r => r.id, width: "70px" },
    { name: "Slider", selector: r => r.slider_type },
    { name: "Type", selector: r => r.type },
    {
      name: "Image",
      cell: r => (
        <img
            src={`${BASE_URL}/${r.image}`}
            width="80"
            alt="banner"
            style={{ borderRadius: 8 }}
        />
      )
    },
    {
        name: "Action",
        cell: (r) => (
            <div className="d-flex gap-3 action-icons">

            <i
                className="icon-pencil-alt text-primary cursor-pointer"
                title="Edit"
                onClick={() => handleEdit(r)}
            ></i>

            <i
                className="icon-trash text-danger cursor-pointer"
                title="Delete"
                onClick={() => handleDelete(r.id)}
            ></i>

            </div>
        ),
    }
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Home Banner" parent="Home" title="Home Banner" />

      <Container fluid>
        <Row>

          {/* FORM */}
          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>{editId ? "Update Banner" : "Add Banner"}</H4>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>

                  {/* Slider Type */}
                  <FormGroup>
                    <Label>Slider Type</Label>
                    <Input type="select" name="slider_type"
                      value={formData.slider_type}
                      onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="app">App</option>
                      <option value="web">Web</option>
                    </Input>
                  </FormGroup>

                  {/* Type */}
                  <FormGroup>
                    <Label>Type</Label>
                    <Input type="select" name="type"
                      value={formData.type}
                      onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="default">Default</option>
                      <option value="category">Category</option>
                      <option value="product">Product</option>
                    </Input>
                  </FormGroup>

                  {/* CATEGORY */}
                  {formData.type === "category" && (
                    <FormGroup>
                      <Label>Select Category</Label>
                      <Input type="select" name="ref_id"
                        value={formData.ref_id}
                        onChange={handleChange} required>
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}

                  {/* PRODUCT */}
                  {formData.type === "product" && (
                    <FormGroup>
                      <Label>Select Product</Label>
                      <Input type="select" name="ref_id"
                        value={formData.ref_id}
                        onChange={handleChange} required>
                        <option value="">Select Product</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}

                  {/* IMAGE */}
                  <FormGroup>
                    <Label>
                      Slider Image <br />
                      <small>Recommended Size : 1024 x 512 pixels</small>
                    </Label>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />

                    {editId && formData.oldImage && (
                        <img
                            src={`${BASE_URL}/${formData.oldImage}`}
                            width="120"
                            alt="current banner"
                            className="mt-2"
                        />
                    )}
                  </FormGroup>

                  <Button color="primary">{editId ? "Update" : "Save"}</Button>
                  {editId && <Button color="secondary" onClick={resetForm} className="ms-2">Cancel</Button>}

                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* TABLE */}
          <Col sm="6">
            <Card>
              <CardHeader><H4>Home Banner List</H4></CardHeader>
              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable columns={columns} data={data} pagination />
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </Fragment>
  );
};

export default HomeBanner;