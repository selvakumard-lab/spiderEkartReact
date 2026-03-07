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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import api from "../../Services/api";
import { toast } from "react-toastify";

const State = () => {

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchStates();
  }, []);

  // ✅ Fetch States
  const fetchStates = async () => {
    try {
      const response = await api.get("/state");

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error.response?.data || error.message);
    }
  };

  // ✅ Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  // ✅ Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let res;

      if (editId) {
        res = await api.put(`/state/${editId}`, formData);
      } else {
        res = await api.post("/state", formData);
      }

      toast.success(res.data.message || "Saved successfully");

      setFormData({ name: "" });
      setEditId(null);
      toggle();

      fetchStates();

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Edit
  const handleEdit = (row) => {

    setEditId(row.id);

    setFormData({
      name: row.name,
    });

    setModal(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {

      const response = await api.delete(`/state/${id}`);

      if (response.data.success) {
        toast.success("State deleted successfully");
      }

      fetchStates();

    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      name: "S No",
      selector: (row) => row.id,
      sortable: true,
      width: "100px"
    },
    {
      name: "State Name",
      selector: (row) => row.name,
      sortable: true,
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

  return (
    <Fragment>

      <Breadcrumbs
        mainTitle="State List"
        parent="Location"
        title="State List"
      />

      <Container fluid>

        <Row>

          <Col sm="12">

            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">

                <H4>State List</H4>

                <Button color="success" onClick={toggle}>
                  + Add State
                </Button>

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

      {/* Modal */}

      <Modal isOpen={modal} toggle={toggle}>

        <ModalHeader toggle={toggle}>
          {editId ? "Update State" : "Add State"}
        </ModalHeader>

        <Form onSubmit={handleSubmit}>

          <ModalBody>

            <FormGroup>

              <Label>State Name</Label>

              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter state name"
                required
              />

            </FormGroup>

          </ModalBody>

          <ModalFooter>

            <Button color="primary" type="submit">
              {editId ? "Update" : "Save"}
            </Button>

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>

          </ModalFooter>

        </Form>

      </Modal>

    </Fragment>
  );
};

export default State;