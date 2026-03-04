import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Form, FormGroup, Label, Input
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const Notification = () => {

  const BASE_URL = "http://localhost:5000";

  const [notifications, setNotifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    ref_id: "",
    title: "",
    message: "",
    include_image: false,
    image: null
  });

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetchNotifications();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get("/notification");
    setNotifications(res.data.data || []);
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("type", formData.type);
    sendData.append("ref_id", formData.ref_id);
    sendData.append("title", formData.title);
    sendData.append("message", formData.message);
    sendData.append("include_image", formData.include_image);

    if (formData.include_image && formData.image) {
      sendData.append("image", formData.image);
    }

    const res = await api.post("/notification/send", sendData, {
      transformRequest: [(data, headers) => {
        delete headers["Content-Type"];
        return data;
      }],
    });

    toast.success(res.data.message || "Notification Sent Successfully");
    resetForm();
    fetchNotifications();
  };

  const resetForm = () => {
    setFormData({
      type: "",
      ref_id: "",
      title: "",
      message: "",
      include_image: false,
      image: null
    });
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { name: "ID", selector: r => r.id, width: "70px" },
    { name: "Type", selector: r => r.type },
    { name: "Title", selector: r => r.title },
    { name: "Message", selector: r => r.message, wrap: true },
    {
      name: "Image",
      cell: r =>
        r.image ? (
          <img
            src={`${BASE_URL}/${r.image}`}
            width="70"
            alt="notification"
            style={{ borderRadius: 6 }}
          />
        ) : (
          "No Image"
        )
    },
    { name: "Date", selector: r => r.createdAt }
  ];

  /* ---------------- UI ---------------- */
  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Send Notification"
        parent="Marketing"
        title="Send Notification"
      />

      <Container fluid>
        <Row>

          {/* FORM */}
          <Col sm="5">
            <Card>
              <CardHeader>
                <H4>Send Notification</H4>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>

                  {/* TYPE */}
                  <FormGroup>
                    <Label>Type</Label>
                    <Input
                      type="select"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    >
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
                      <Input
                        type="select"
                        name="ref_id"
                        value={formData.ref_id}
                        onChange={handleChange}
                        required
                      >
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
                      <Input
                        type="select"
                        name="ref_id"
                        value={formData.ref_id}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Product</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}

                  {/* TITLE */}
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  {/* MESSAGE */}
                  <FormGroup>
                    <Label>Message</Label>
                    <Input
                      type="textarea"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  {/* INCLUDE IMAGE CHECKBOX */}
                  <FormGroup check className="mb-3">
                    <Input
                      type="checkbox"
                      name="include_image"
                      checked={formData.include_image}
                      onChange={handleChange}
                    />
                    <Label check className="ms-2">
                      Include Image
                    </Label>
                  </FormGroup>

                  {/* IMAGE FIELD */}
                  {formData.include_image && (
                    <FormGroup>
                      <Label>Upload Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </FormGroup>
                  )}

                  <Button color="primary">Send Notification</Button>

                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* TABLE */}
          <Col sm="7">
            <Card>
              <CardHeader>
                <H4>Notification History</H4>
              </CardHeader>
              <CardBody>
                <DataTable
                  columns={columns}
                  data={notifications}
                  pagination
                  highlightOnHover
                />
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </Fragment>
  );
};

export default Notification;