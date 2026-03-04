import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Badge
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const DeliveryBoyList = () => {

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirm_password: "",
    address: "",
    bonus: "",
    status: "active"
  });

  /* ---------------- FETCH DELIVERY BOYS ---------------- */
  useEffect(() => {
    fetchDeliveryBoys();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const res = await api.get("/deliveryboy");
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load delivery boys");
    }
  };

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      let res;

      if (editId)
        res = await api.put(`/deliveryboy/${editId}`, formData);
      else
        res = await api.post("/deliveryboy", formData);

      toast.success(res.data.message || "Saved Successfully");
      resetForm();
      fetchDeliveryBoys();

    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  /* ---------------- RESET ---------------- */
  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      password: "",
      confirm_password: "",
      address: "",
      bonus: "",
      status: "active"
    });
    setEditId(null);
    setModal(false);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData({
      ...row,
      password: "",
      confirm_password: ""
    });
    setModal(true);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete Delivery Boy?")) return;
    await api.delete(`/deliveryboy/${id}`);
    toast.success("Deleted Successfully");
    fetchDeliveryBoys();
  };

  /* ---------------- STATUS BADGE ---------------- */
  const getStatusBadge = (status) => {
    return status === "active"
      ? <Badge color="success">Active</Badge>
      : <Badge color="danger">Inactive</Badge>;
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "80px"
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name: "Mobile",
      selector: row => row.mobile,
      sortable: true
    },
    {
      name: "Address",
      selector: row => row.address
    },
    {
      name: "Bonus (%)",
      selector: row => row.bonus
    },
    {
      name: "Balance",
      selector: row => row.balance || 0
    },
    {
      name: "Status",
      cell: row => getStatusBadge(row.status)
    },
    {
      name: "Action",
      cell: row => (
        <div className="d-flex gap-3">
          <i
            className="icon-pencil-alt text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          ></i>
          <i
            className="icon-trash text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row.id)}
          ></i>
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Delivery Boy"
        parent="Users"
        title="Delivery Boy"
      />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H4>Delivery Boys List</H4>
                <Button color="success" onClick={toggle}>
                  + Add Delivery Boy
                </Button>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ---------------- MODAL ---------------- */}
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {editId ? "Update Delivery Boy" : "Add Delivery Boy"}
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <ModalBody>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Mobile</Label>
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editId}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required={!editId}
                  />
                </FormGroup>
              </Col>

              <Col md="12">
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Bonus (%)</Label>
                  <Input
                    type="number"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Input>
                </FormGroup>
              </Col>

            </Row>

          </ModalBody>

          <ModalFooter>
            <Button color="primary">
              {editId ? "Update" : "Save"}
            </Button>
            <Button color="secondary" onClick={resetForm}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

    </Fragment>
  );
};

export default DeliveryBoyList;