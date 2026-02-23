import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const PromoCode = () => {

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    code: "",
    message: "",
    start_date: "",
    end_date: "",
    users_limit: "",
    min_order_amount: "",
    discount: "",
    discount_type: "percentage",
    max_discount: "",
    repeat_usage: "not_allowed",
    status: "active"
  });

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchPromo();
  }, []);

  const fetchPromo = async () => {
    try {
      const res = await api.get("/promocode");
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load promocodes");
    }
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (editId)
        res = await api.put(`/promocode/${editId}`, formData);
      else
        res = await api.post("/promocode", formData);

      toast.success(res.data.message);
      resetForm();
      fetchPromo();

    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  /* ---------------- RESET ---------------- */
  const resetForm = () => {
    setFormData({
      code: "",
      message: "",
      start_date: "",
      end_date: "",
      users_limit: "",
      min_order_amount: "",
      discount: "",
      discount_type: "percentage",
      max_discount: "",
      repeat_usage: "not_allowed",
      status: "active"
    });
    setEditId(null);
    setModal(false);
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData(row);
    setModal(true);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete promo code?")) return;
    await api.delete(`/promocode/${id}`);
    fetchPromo();
  };

  /* ---------------- TABLE ---------------- */
  const columns = [
    { name: "ID", selector: r => r.id, width: "70px" },
    { name: "Code", selector: r => r.code },
    { name: "Discount", selector: r => `${r.discount} ${r.discount_type}` },
    { name: "Min Order", selector: r => r.min_order_amount },
    { name: "Users", selector: r => r.users_limit },
    { name: "Status", selector: r => r.status },
    {
      name: "Action",
      cell: r => (
        <div className="d-flex gap-3">
          <i className="icon-pencil-alt text-primary" onClick={() => handleEdit(r)}></i>
          <i className="icon-trash text-danger" onClick={() => handleDelete(r.id)}></i>
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Promo Code" parent="Offers" title="Promo Code" />

      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H4>Promo Code List</H4>
                <Button color="success" onClick={toggle}>+ Add Promo Code</Button>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                  <DataTable columns={columns} data={data} pagination />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          {editId ? "Update Promo Code" : "Add Promo Code"}
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <ModalBody>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Promo Code</Label>
                  <Input name="code" value={formData.code} onChange={handleChange} required />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Message</Label>
                  <Input name="message" value={formData.message} onChange={handleChange} />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input type="date" name="start_date" value={formData.start_date} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>End Date</Label>
                  <Input type="date" name="end_date" value={formData.end_date} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>No. Of Users</Label>
                  <Input type="number" name="users_limit" value={formData.users_limit} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Minimum Order Amount</Label>
                  <Input type="number" name="min_order_amount" value={formData.min_order_amount} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Discount</Label>
                  <Input type="number" name="discount" value={formData.discount} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Discount Type</Label>
                  <Input type="select" name="discount_type" value={formData.discount_type} onChange={handleChange}>
                    <option value="percentage">Percentage</option>
                    <option value="amount">Amount</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Max Discount</Label>
                  <Input type="number" name="max_discount" value={formData.max_discount} onChange={handleChange}/>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Repeat Usage</Label>
                  <Input type="select" name="repeat_usage" value={formData.repeat_usage} onChange={handleChange}>
                    <option value="allowed">Allowed</option>
                    <option value="not_allowed">Not Allowed</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label>Status</Label>
                  <Input type="select" name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

          </ModalBody>

          <ModalFooter>
            <Button color="primary">{editId ? "Update" : "Save"}</Button>
            <Button color="secondary" onClick={resetForm}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PromoCode;