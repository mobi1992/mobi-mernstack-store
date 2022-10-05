import React, { useEffect } from "react";
import "./index.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../../@components/sideBar/index.js";
import { getProducts } from "../../@actions/productActions/getProducts.js";
import { getAdminAllOrders } from "../../@actions/orderActions/getAdminAllOrders.js";
import { adminGetAllUsers } from "../../@actions/userActions/adminGetAllUsers.js";
import { routePaths } from "../../@services/constants";
import { useNavigate } from "react-router-dom";
import LineChart from "./lineChart";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { products, productsCount } = useSelector((state) => state.products);

  const { adminAllOrdersCount, adminAllOrdersTotalAmount, adminAllOrders, adminAllOrdersTodayTotalAmount} = useSelector((state) => state.adminAllOrders);

  const { allUsers, allUsersCount} = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAdminAllOrders());
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  let todayTtotalAmount = 0;
  todayTtotalAmount = adminAllOrdersTodayTotalAmount

  let totalAmount = 0;
  totalAmount = adminAllOrdersTotalAmount
  
  const lineState1 = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TODAY'S TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, todayTtotalAmount],
      },
    ],
  };

  const lineState2 = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const linkToProducts = () => {
    navigate(routePaths.adminAllProducts)
    window.location.reload(false).scrollTo(0, 0)
  }
  const linkToOrders = () => {
    navigate(routePaths.admin_all_orders)
    window.location.reload(false).scrollTo(0, 0)
  }

  const linkToUsers = () => {
    navigate(routePaths.admin_get_all_users)
    window.location.reload(false).scrollTo(0, 0)
  }
  return (
    <SideBar>
      <div>
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary2">
          <div>
            <p>
              Today's Total Amount <br /> Rs {todayTtotalAmount}
            </p>
          </div>
          </div>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount for All Orders <br /> Rs {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link onClick = {linkToProducts} to={routePaths.adminAllProducts}>
              <p>Products</p>
              <p>{products && productsCount}</p>
            </Link>
            <Link onClick = {linkToOrders} to={routePaths.admin_all_orders}>
              <p>Orders</p>
              <p>{adminAllOrders && adminAllOrdersCount}</p>
            </Link>
            <Link onClick = {linkToUsers} to={routePaths.admin_get_all_users}>
              <p>Users</p>
              <p>{allUsers && allUsersCount}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState1} />
        </div>
        <br></br>

        <div className="lineChart">
          <Line data={lineState2} />
        </div>

        {/* <LineChart totalAmount={totalAmount} /> */}
        <br></br>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
    </SideBar>
  );
};

export default Dashboard;