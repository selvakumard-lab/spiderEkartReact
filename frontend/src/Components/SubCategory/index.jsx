import React, { Fragment, useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs,H4 } from "../../AbstractElements";
import { Card,CardBody,CardHeader,Col,Container,Row,Button,Modal,ModalHeader,ModalBody,ModalFooter,Form,FormGroup,Label,Input } from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const SubCategory = () => {

    const BASE_URL = "http://localhost:5000";

    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        subtitle: "",
        image: null,
        oldImage: "",
    });


    useEffect(() => {
        fetchSubCategories();
        fetchCategories();
    }, []);


    const fetchSubCategories = async () => {
        try {
            const res = await api.get("/subcategory");

            setData(res.data.data);

        } catch (error) {
            console.error("Subcategory fetch error:", error);
        }
    };


    const fetchCategories = async () => {
        try {
            const response = await api.get("/category");

            if (response.data.success) {
                setCategories(response.data.data);
            }

        } catch (error) {
            console.error("Category fetch error:", error);
        }
    };
    



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
            ...prev,
            image: file,
            }));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const sendData = new FormData();
        sendData.append("category_id", formData.category_id);
        sendData.append("name", formData.name);
        sendData.append("subtitle", formData.subtitle);

        if (formData.image) {
            sendData.append("image", formData.image);
        }

        try {
            let res;

            if (editId) {
            res = await api.put(`/subcategory/${editId}`, sendData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            }
            // ADD
            else {
            res = await api.post("/subcategory", sendData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            }

            toast.success(res.data.message);

            // RESET FORM
            setFormData({
                category_id: "",
                name: "",
                subtitle: "",
                image: null,
                oldImage: "",
            });

            setEditId(null);
            toggle();

            fetchSubCategories();

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };




    const handleEdit = (row) => {
      setEditId(row.id);

      setFormData({
        category_id: String(row.category_id),
        name: row.name,
        subtitle: row.subtitle,
        image: null,
        oldImage: row.image,
      });

      setModal(true);
    };


    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete?");

      if (!confirmDelete) return;

      try {
        const response = await api.delete(`/subcategory/${id}`);

        toast.success(response.data.message);

        fetchSubCategories();

      } catch (error) {
        console.error("Delete error:", error.response?.data || error.message);
      }
    };


    const columns = [
      {
        name: "S No",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Category Name",
        selector: (row) => row.category.name,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Subtitle",
        selector: (row) => row.subtitle,
        sortable: true,
      },
      {
        name: "Image",
        cell: (row) => (
          <img
            src={
              row.image
                ? `${BASE_URL}/${row.image}`
                : "/assets/images/project/default.png"
            }
            alt="Sub Category"
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

            {/* EDIT */}
            <i
                className="icon-pencil-alt text-primary cursor-pointer"
                title="Edit"
                onClick={() => handleEdit(row)}
            ></i>

            {/* DELETE */}
            <i
                className="icon-trash text-danger cursor-pointer"
                title="Delete"
                onClick={() => handleDelete(row.id)}
            ></i>

            </div>
        ),
       }

    ];

    return (
      <Fragment>
        <Breadcrumbs
          mainTitle="Sub Category List"
          parent="Sub Category"
          title="Sub Category List"
        />

        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <H4>Sub Category List</H4>
                  <Button color="success" onClick={toggle}>
                    + Add Sub Category
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

        {/* ✅ Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
          {editId ? "Update Sub Category" : "Add Sub Category"}
        </ModalHeader>

          <Form onSubmit={handleSubmit}>
            <ModalBody>
                <FormGroup>
                    <Label>Main Category</Label>
                    <Input
                        type="select"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label>Sub Category Name</Label>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Sub Category name"
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Sub Category Subtitle</Label>
                    <Input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="Enter subtitle"
                    />
                </FormGroup>

              <FormGroup>
                <Label>
                  Sub Category Image <br />
                  <small>
                    *Please choose square image larger than 350px × 350px and
                    smaller than 550px × 550px.*
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

export default SubCategory;
