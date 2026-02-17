import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";
import { toast } from "react-toastify";
import api from "../../Services/api";

const CategoryOrder = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/category");


            setCategories(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };


    const [dragIndex, setDragIndex] = useState(null);

    const handleDragStart = (index) => {
        setDragIndex(index);
    };

    const handleDragEnter = (index) => {
        if (dragIndex === index) return;

        const newList = [...categories];
        const draggedItem = newList[dragIndex];

        newList.splice(dragIndex, 1);
        newList.splice(index, 0, draggedItem);

        setDragIndex(index);
        setCategories(newList);
    };

  
    const handleSave = async () => {

        const orderedData = categories.map((cat, index) => ({
            id: cat.id,
            cat_priority: index + 1
        }));

        try {
            await api.post("/category/reorder", { items: orderedData });

            toast.success("Order updated successfully");
            fetchCategories(); 

        } catch (err) {
            console.error(err);
            alert("Failed to update order");
        }
    };


    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>

                        <CardHeader className="d-flex justify-content-between align-items-center">
                        <h4>Drag & Drop Category Order</h4>
                            <Button color="success" onClick={handleSave}>
                                Save Order
                            </Button>
                        </CardHeader>

                        <CardBody>

                            {categories.map((cat, index) => (
                                <div
                                key={cat.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragEnter={() => handleDragEnter(index)}
                                style={{
                                    padding: "15px",
                                    marginBottom: "10px",
                                    background: "#f1f3f5",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    cursor: "grab",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                                >
                                <span><strong>{index + 1}.</strong> {cat.name}</span>
                                <span>☰</span>
                                </div>
                            ))}

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CategoryOrder;