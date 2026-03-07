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

const Area = () => {

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);
  const [editId, setEditId] = useState(null);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [formData, setFormData] = useState({
    city_id: "",
    area_name: "",
    pincode: "",
  });

  useEffect(() => {
    fetchAreas();
    fetchCities();
  }, []);

  // ✅ Fetch Cities
  const fetchCities = async () => {
    try {

      const res = await api.get("/city");

      if (res.data.success) {
        setCities(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Fetch Areas
  const fetchAreas = async () => {
    try {

      const res = await api.get("/area");

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

  };

  // ✅ Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let res;

      if (editId) {

        res = await api.put(`/area/${editId}`, formData);

      } else {

        res = await api.post("/area", formData);

      }

      toast.success(res.data.message);

      setFormData({
        city_id: "",
        area_name: "",
        pincode: "",
      });

      setEditId(null);
      toggle();

      fetchAreas();

    } catch (err) {

      toast.error(err.response?.data?.message || "Something went wrong");

    }

  };

  // ✅ Edit
  const handleEdit = (row) => {

    setEditId(row.id);

    setFormData({
      city_id: row.city_id,
      area_name: row.area_name,
      pincode: row.pincode,
    });

    setModal(true);

  };

  // ✅ Delete
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {

      const res = await api.delete(`/area/${id}`);

      if (res.data.success) {
        toast.success("Area deleted successfully");
      }

      fetchAreas();

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
      name: "City Name",
      selector: (row) => row.City?.name,
      sortable: true,
    },
    {
      name: "Area Name",
      selector: (row) => row.area_name,
      sortable: true,
    },
    {
      name: "Pincode",
      selector: (row) => row.pincode,
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
        mainTitle="Area List"
        parent="Location"
        title="Area List"
      />

      <Container fluid>

        <Row>

          <Col sm="12">

            <Card>

              <CardHeader className="d-flex justify-content-between align-items-center">

                <H4>Area List</H4>

                <Button color="success" onClick={toggle}>
                  + Add Area
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
          {editId ? "Update Area" : "Add Area"}
        </ModalHeader>

        <Form onSubmit={handleSubmit}>

          <ModalBody>

            <FormGroup>

              <Label>Select City</Label>

              <Input
                type="select"
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
                required
              >

                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}

              </Input>

            </FormGroup>

            <FormGroup>

              <Label>Area Name</Label>

              <Input
                type="text"
                name="area_name"
                value={formData.area_name}
                onChange={handleChange}
                placeholder="Enter Area Name"
                required
              />

            </FormGroup>

            <FormGroup>

              <Label>Pincode</Label>

              <Input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode"
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

export default Area;