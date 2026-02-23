import React, { Fragment, useState } from "react";
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
  Label
} from "reactstrap";

const ManageCustomerWallet = () => {

  /* ---------------- CUSTOMER DATA ---------------- */
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "9876543210", balance: 1200 },
    { id: 2, name: "David Smith", email: "david@example.com", mobile: "9123456780", balance: 450 },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", mobile: "9988776655", balance: 3000 }
  ]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  /* -------- Wallet Form States -------- */
  const [walletType, setWalletType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  /* ---------------- FILTER ---------------- */
  const filteredData = customers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* -------- Single Row Selection -------- */
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedCustomer(selectedRows[0]); // single select
  };

  /* -------- Wallet Update Function -------- */
  const handleWalletSubmit = () => {

    if (!selectedCustomer) {
      alert("Please select a customer");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    const updatedCustomers = customers.map((cust) => {
      if (cust.id === selectedCustomer.id) {

        let newBalance =
          walletType === "credit"
            ? cust.balance + Number(amount)
            : cust.balance - Number(amount);

        return { ...cust, balance: newBalance };
      }
      return cust;
    });

    setCustomers(updatedCustomers);

    alert("Wallet updated successfully");

    // Reset form
    setAmount("");
    setMessage("");
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { name: "ID", selector: row => row.id, width: "70px" },
    { name: "Name", selector: row => row.name },
    { name: "Balance (₹)", selector: row => row.balance },
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

          {/* ================= LEFT SIDE - CUSTOMER LIST ================= */}
          <Col sm="6">
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

                <div className="table-responsive theme-scrollbar product-table">
                    <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    selectableRows
                    selectableRowsSingle   // ✅ Single Select Only
                    onSelectedRowsChange={handleSelectedRowsChange}
                    highlightOnHover
                    />
                </div>

              </CardBody>
            </Card>
          </Col>


          {/* ================= RIGHT SIDE - WALLET FORM ================= */}
          <Col sm="6">
            <Card>
              <CardHeader>
                <H4>Wallet Update</H4>
              </CardHeader>

              <CardBody>

                {selectedCustomer ? (
                  <>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Current Balance:</strong> ₹ {selectedCustomer.balance}</p>

                    <FormGroup>
                      <Label>Type</Label>
                      <Input
                        type="select"
                        value={walletType}
                        onChange={(e) => setWalletType(e.target.value)}
                      >
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