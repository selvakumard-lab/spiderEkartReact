import React, { Fragment, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card, CardBody, CardHeader, Col, Container, Row,
  Button, Form, FormGroup, Label, Input
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const TimeSlot = () => {

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    fromTime: "",
    toTime: "",
    lastOrderTime: "",
    status: "Active"
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const fetchTimeSlots = async () => {
    try {
      const res = await api.get("/settings/timeslot");
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load time slots");
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.fromTime || !formData.toTime) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      let res;

      if (editId) {
        res = await api.put(`/settings/timeslot/${editId}`, formData);
      } else {
        res = await api.post("/settings/timeslot", formData);
      }

      toast.success(res.data.message);
      fetchTimeSlots();
      resetForm();

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (row) => {
    setEditId(row.id);
    setFormData({
      title: row.title,
      fromTime: row.fromTime,
      toTime: row.toTime,
      lastOrderTime: row.lastOrderTime,
      status: row.status
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this time slot?")) return;

    try {
      await api.delete(`/settings/timeslot/${id}`);
      toast.success("Deleted successfully");
      fetchTimeSlots();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setFormData({
      title: "",
      fromTime: "",
      toTime: "",
      lastOrderTime: "",
      status: "Active"
    });
    setEditId(null);
  };

  /* ================= TABLE ================= */
  const columns = [
    { name: "ID", selector: row => row.id, width: "80px" },
    { name: "Title", selector: row => row.title },
    { name: "From Time", selector: row => row.fromTime },
    { name: "To Time", selector: row => row.toTime },
    { name: "Last Order Time", selector: row => row.lastOrderTime },

    {
      name: "Status",
      cell: row => (
        <span
          className={`badge ${row.status === "Active" ? "bg-success" : "bg-secondary"}`}
        >
          {row.status}
        </span>
      )
    },

    {
      name: "Action",
      cell: row => (
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
      )
    }
  ];

  /* ================= UI ================= */
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Time Slot" parent="Settings" title="Time Slot" />

      <Container fluid>
        <Row>

          {/* FORM */}
          <Col md="4">
            <Card>
              <CardHeader>
                <H4>{editId ? "Update Time Slot" : "Add Time Slot"}</H4>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleSubmit}>

                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type="text"
                      placeholder="Morning 9AM to 12PM"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>From Time</Label>
                    <Input
                      type="time"
                      value={formData.fromTime}
                      onChange={(e) =>
                        setFormData({ ...formData, fromTime: e.target.value })
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>To Time</Label>
                    <Input
                      type="time"
                      value={formData.toTime}
                      onChange={(e) =>
                        setFormData({ ...formData, toTime: e.target.value })
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Last Order Time</Label>
                    <Input
                      type="time"
                      value={formData.lastOrderTime}
                      onChange={(e) =>
                        setFormData({ ...formData, lastOrderTime: e.target.value })
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Status</Label>
                    <Input
                      type="select"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </Input>
                  </FormGroup>

                  <div className="d-flex gap-2">
                    <Button color="primary">
                      {editId ? "Update" : "Add"}
                    </Button>

                    {editId && (
                      <Button color="secondary" type="button" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>

          {/* TABLE */}
          <Col md="8">
            <Card>
              <CardHeader>
                <H4>Time Slots</H4>
              </CardHeader>

              <CardBody>
                <div className="table-responsive theme-scrollbar product-table">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  highlightOnHover
                  striped
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

export default TimeSlot;