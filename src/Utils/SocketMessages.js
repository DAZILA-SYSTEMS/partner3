import React, { useEffect } from "react";
import { socket } from "./SockectConnect";
import { useSelector, useDispatch } from "react-redux";
import { FetchStaffs } from "../Network/CredApi";
import { FetchModes } from "../Network/ModeApi";
import { FetchExpenseCats } from "../Network/ExpenseCatApi";
import { FetchExpenses } from "../Network/ExpenseApi";
import { FetchBills } from "../Network/BillApi";
import { FetchBuildings } from "../Network/BuildingApi";
import { FetchHouses } from "../Network/HouseApi";
import { FetchInvoices } from "../Network/InvoiceApi";
import { FetchOwners } from "../Network/OwnerApi";
import { FetchPayments } from "../Network/PaymentApi";
import { FetchSubs } from "../Network/SubApi";

const SocketMessages = () => {
  //redux dispatch
  const dispatch = useDispatch();

  const User = useSelector((state) => state.auth.user);
  const ActiveCred = useSelector((state) => state.cred.activeCred);
  const online = useSelector((state) => state.online.online);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message.messageType === "staff") {
        FetchStaffs(
          ActiveCred.instLinker,
          User.token,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "mode") {
        FetchModes(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }

      if (message.messageType === "expenseCat") {
        FetchExpenseCats(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "expense") {
        FetchExpenses(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "bill") {
        FetchBills(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "building") {
        FetchBuildings(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "house") {
        FetchHouses(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "invoice") {
        FetchInvoices(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "owner") {
        FetchOwners(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "payment") {
        FetchPayments(
          User.token,
          ActiveCred.instLinker,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "tenant") {
        FetchStaffs(
          ActiveCred.instLinker,
          User.token,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
      if (message.messageType === "sub") {
        FetchSubs(
          ActiveCred.instLinker,
          User.token,
          dispatch,
          online,
          "socket",
          message.dataValues
        );
      }
    });
  }, []);

  return <></>;
};

export default SocketMessages;
