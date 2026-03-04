import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Breadcrumbs, H4 } from "../../AbstractElements";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Button,
  FormGroup,
  Label,
  Spinner
} from "reactstrap";
import api from "../../Services/api";
import { toast } from "react-toastify";

const ManageCustomerWallet = () => {

  /* ---------------- STATE ---------------- */
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [walletType, setWalletType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  /* ---------------- FETCH CUSTOMERS ---------------- */
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customer/list"); // backend API
      setCustomers(res.data.customers);
    } catch (error) {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredData = customers.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* -------- Single Row Selection -------- */
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedCustomer(selectedRows[0]);
  };

  /* -------- Wallet Update Function -------- */
  const handleWalletSubmit = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (!walletType) {
      toast.error("Please select wallet type");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      const response = await api.post("/customer/update-wallet", {
        customer_id: selectedCustomer.id,
        type: walletType,
        amount,
        message,
      });

      toast.success(response.data.message);

      // Refresh customers list from DB
      fetchCustomers();

      // Reset form
      setAmount("");
      setMessage("");
      setSelectedCustomer(null);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating wallet");
    }
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Balance (₹)",
      selector: (row) => row.wallet_balance,
      sortable: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Manage Customer Wallet"
        parent="Users"
        title="Customer Wallet"
      />

      <Container fluid>
        <Row>

          {/* ================= LEFT SIDE ================= */}
          <Col sm="7">
            <Card>
              <CardHeader>
                <H4>Select Customer</H4>
              </CardHeader>

              <CardBody>

                <Input
                  type="text"
                  placeholder="Search customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-3"
                />

                {loading ? (
                  <div className="text-center">
                    <Spinner color="primary" />
                  </div>
                ) : (
                  <div className="table-responsive theme-scrollbar product-table">
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      selectableRows
                      selectableRowsSingle
                      onSelectedRowsChange={handleSelectedRowsChange}
                      highlightOnHover
                    />
                  </div>
                )}

              </CardBody>
            </Card>
          </Col>

          {/* ================= RIGHT SIDE ================= */}
          <Col sm="5">
            <Card>
              <CardHeader>
                <H4>Wallet Update</H4>
              </CardHeader>

              <CardBody>

                {selectedCustomer ? (
                  <>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p>
                      <strong>Current Balance:</strong> ₹{" "}
                      {selectedCustomer.wallet_balance}
                    </p>

                    <FormGroup>
                      <Label>Type</Label>
                      <Input
                        type="select"
                        value={walletType}
                        onChange={(e) => setWalletType(e.target.value)}
                      >
                        <option value="">Select Type</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Message</Label>
                      <Input
                        type="textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                      />
                    </FormGroup>

                    <Button color="success" onClick={handleWalletSubmit}>
                      Update Wallet
                    </Button>
                  </>
                ) : (
                  <p>Please select a customer from left side.</p>
                )}

              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </Fragment>
  );
};

export default ManageCustomerWallet;