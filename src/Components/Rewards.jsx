import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

export const RewardsComponent = () => {
  const [monthlyRewards, updateMonthlyRewards] = useState([]);

  useEffect(() => {
    const endPoint = "http://localhost:3000/transactions";
    axios.get(endPoint).then((response) => {
      let data = response.data;
      let monthlyTransactions = Object.keys(data);
      let monthly = [];
      monthlyTransactions.forEach((element) => {
        let rewardPoints = 0;
        data[element].forEach((transaction) => {
          let price = transaction.price;
          if (price >= 50) {
            rewardPoints += price - 50;
            if (price >= 100) {
              rewardPoints += price - 100;
            }
          }
        });
        monthly.push({ rewards: rewardPoints, month: element });
      });
      updateMonthlyRewards(monthly);
    });
  }, []);

  return (
    <>
      {/* {monthlyRewards?.map((item) => (
        <div>{`${item.month}- ${item.rewards}`}</div>
      ))} */}

      {/* {Object.keys(monthlyRewards).map((element) => {
        <div>
          {element}- {monthlyRewards[element]}
        </div>;
      })} */}
      <header className="title">Customer Rewards</header>
      <div className="yearly-rewards">
        <span className="yearly-rewards-title">Yearly Rewards :</span>
        {monthlyRewards?.length &&
          monthlyRewards.reduce((acc, obj) => {
            return acc + obj.rewards;
          }, 0)}
      </div>
      <Table striped bordered hover size={"sm"}>
        <thead>
          <tr>
            <th>{`Month`}</th>
            <th>{`Rewards`}</th>
          </tr>
        </thead>
        {monthlyRewards?.map((item) => (
          <tbody>
            <tr>
              <td>{item.month}</td>
              <td>{item.rewards}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};
