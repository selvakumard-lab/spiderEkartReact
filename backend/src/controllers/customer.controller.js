
const db = require("../models");

const Customer  = db.Customer ;
const WalletTransaction  = db.WalletTransaction ;

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      order: [["id", "DESC"]],
    });

    res.json({ customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const { customer_id, type, amount, message } = req.body;

    if (!customer_id || !type || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const customer = await Customer.findByPk(customer_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let newBalance =
      type === "credit"
        ? customer.wallet_balance + Number(amount)
        : customer.wallet_balance - Number(amount);

    if (newBalance < 0) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    customer.wallet_balance = newBalance;
    await customer.save();

    await WalletTransaction.create({
      customer_id,
      type,
      amount,
      message,
    });

    res.json({
      message: "Wallet updated successfully",
      wallet_balance: newBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};