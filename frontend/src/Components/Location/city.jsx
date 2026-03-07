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

const City = () => {

  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [editId, setEditId] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    state_id: "",
    district_id: "",
    name: "",
  });

  useEffect(() => {
    fetchCities();
    fetchStates();
  }, []);

  // ✅ Fetch States
  const fetchStates = async () => {
    try {

      const res = await api.get("/state");

      if (res.data.success) {
        setStates(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch Districts by State
  const fetchDistricts = async (stateId) => {
    try {

      const res = await api.get(`/district/by-state/${stateId}`);

      if (res.data.success) {
        setDistricts(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch Cities
  const fetchCities = async () => {
    try {

      const res = await api.get("/city");

      console.log("sdsdssssssssssssssssssssssssssssssssss",res.data.data);

      if (res.data.success) {
        setData(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // If state changes load districts
    if (name === "state_id") {

      setFormData({
        ...formData,
        state_id: value,
        district_id: "",
        name: formData.name
      });

      fetchDistricts(value);

    }

  };

  // ✅ Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let res;

      if (editId) {

        res = await api.put(`/city/${editId}`, formData);

      } else {

        res = await api.post("/city", formData);

      }

      toast.success(res.data.message);

      setFormData({
        state_id: "",
        district_id: "",
        name: "",
      });

      setEditId(null);
      toggle();

      fetchCities();

    } catch (err) {

      toast.error(err.response?.data?.message || "Something went wrong");

    }

  };

  // ✅ Edit
  const handleEdit = (row) => {

    setEditId(row.id);

    setFormData({
      state_id: row.district?.state_id,
      district_id: row.district_id,
      name: row.name,
    });

    fetchDistricts(row.district?.state_id);

    setModal(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {

      const res = await api.delete(`/city/${id}`);

      if (res.data.success) {
        toast.success("City deleted successfully");
      }

      fetchCities();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      name: "S No",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "State Name",
      selector: (row) => row.District?.State?.name,
      sortable: true,
    },
    {
      name: "District Name",
      selector: (row) => row.District?.name,
      sortable: true,
    },
    {
      name: "City Name",
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
        mainTitle="City List"
        parent="Location"
        title="City List"
      />

      <Container fluid>

        <Row>

          <Col sm="12">

            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">

                <H4>City List</H4>

                <Button color="success" onClick={toggle}>
                  + Add City
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
          {editId ? "Update City" : "Add City"}
        </ModalHeader>

        <Form onSubmit={handleSubmit}>

          <ModalBody>

            <FormGroup>

              <Label>Select State</Label>

              <Input
                type="select"
                name="state_id"
                value={formData.state_id}
                onChange={handleChange}
                required
              >

                <option value="">Select State</option>

                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}

              </Input>

            </FormGroup>

            <FormGroup>

              <Label>Select District</Label>

              <Input
                type="select"
                name="district_id"
                value={formData.district_id}
                onChange={handleChange}
                required
              >

                <option value="">Select District</option>

                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}

              </Input>

            </FormGroup>

            <FormGroup>

              <Label>City Name</Label>

              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter city name"
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

export default City;