import React, { useState, useEffect } from "react";
import style from "./TestHome.module.css";
import styles from "./Services.module.css";
import DietVisulizer from "./DietVisulizer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const CalorieTracker = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [calorieData, setCalorieData] = useState([]);
  const [formData, setFormData] = useState({
    food: "",
    serving: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8001/calorie_tracker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food: formData.food,
        serving: formData.serving,
      }),
    });
    const data = await response.json();
    setCalorieData(data);
    toast.success("Your Calorie is ready");
  };

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.userType === "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data === "token expired") {
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <div>
      <div
        id="topbar"
        className={`${style.topbar1} d-flex align-items-center fixed-top`}
      >
        <div
          className={`${style.container} d-flex align-items-center justify-content-center justify-content-md-between`}
        >
          <div className={`${style.rightItem} d-flex align-items-center`}>
            <i className="bi bi-phone"></i>Call us now 6203104630
          </div>
        </div>
      </div>

      <header id="header" className={`${style.header1} fixed-top`}>
        <div className={`${style.container} d-flex align-items-center`}>
          <a href="/" className={`${style.logo} me-auto`}>
            <img
              className="img-fluid rounded-circle shadow-sm"
              src="/batDoctor.png"
              alt=""
              style={{ width: "50px", height: "auto" }}
            />
          </a>

          <nav id="navbar" className={`${style.navbar} order-last order-lg-0`}>
            <ul>
              <li>
                <a className={`${style.navlink}`} href="/">
                  Home
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/doctor">
                  Doctors
                </a>
              </li>

              <li className={style.dropdown}>
                <a>
                  <span>Health Ally</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="/aidoctor">MedicoMate's AI Doctor</a>
                  </li>
                  <li className={style.dropdown}>
                    <a>
                      <span>Ai Assistant</span>
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="/diseasePrediction">Disease Predictor</a>
                      </li>
                      <li>
                        <a href="/medicinePrediction">Medicine Predictor</a>
                      </li>
                      <li>
                        <a href="/calorieTracker">
                          MedicoMate's Calorie Tracker
                        </a>
                      </li>
                      <li>
                        <a href="/exercise">Custom Fitness Plans</a>
                      </li>
                      <li>
                        <a href="/diet">Customized Nutrition</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/medicomart">MedicoMart: Your Health Hub</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/services">
                  Services
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/contact">
                  Contact
                </a>
              </li>
              <li className={style.dropdown}>
                <a href="">
                  <span>Account Settings</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>{userData.fname}</li>
                  <li>
                    <a href={`/patientAppointment/${userData._id}`}>
                      See Appointment
                    </a>
                  </li>

                  <li>
                    <a onClick={logOut}>Log Out</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <a href="/doctor" className={`${style.appointmentbtn}`}>
            <span className="d-none d-md-inline">Make an</span> Appointment
          </a>
        </div>
      </header>

      <section id="hero" className={`${styles.hero} d-flex align-items-center`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>MedicoMate's Calorie Tracker</h1>
              <h2>
                Effortlessly monitor your calorie intake with MedicoMate's
                AI-driven tracker.
              </h2>
              <div className="d-flex"></div>
            </div>
            <div className={`col-lg-6 order-1 order-lg-2 ${styles.heroimg}`}>
              <img src="/calorietrack.png" className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="featured-services" className={styles.featuredservices8}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label htmlFor="inputFood">Food</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFood"
                  name="food"
                  placeholder="Samosha"
                  value={formData.food}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-10">
                <label htmlFor="inputServing">Serving</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputServing"
                  name="serving"
                  placeholder="1"
                  value={formData.serving}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ marginTop: "25px", marginRight: "19%" }}
              className="btn btn-primary mb-3"
            >
              Make Recommendation
            </button>
          </form>

          <Popup
            trigger={
              <button
                type="button"
                style={{
                  marginTop: "25px",
                  marginRight: "19%",
                  backgroundColor: "#28a745",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Get Recommendation
              </button>
            }
            position="top middle"
            contentStyle={{
              width: "800px",
              padding: "20px",
              height: "600px",
              overflowY: "auto",
              borderRadius: "10px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#ffffff",
              animation: "slideIn 0.5s ease-out",
            }}
            overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Food</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Food}
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Calorie</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Calorie}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Carbs</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Carbs}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fat</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Fat}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Fiber</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Fiber}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Mineral</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Minerals}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Protein</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Protein}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Serving</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Serving}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Sodium</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Sodium}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Sugar</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Sugar}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Vitamin</th>
                  <td>
                    {calorieData &&
                      calorieData.Calorie &&
                      calorieData.Calorie.Vitamins}
                  </td>
                </tr>
              </tbody>
            </table>
          </Popup>
        </section>
        <footer id="footer" className={style.footer}>
          <div className={style.footertop}>
            <div className={style.container}>
              <div className="row">
                <div className={`col-lg-3 col-md-6 ${style.footercontact}`}>
                  <h3>MedicoMate</h3>
                  <p>Bennett University</p>
                  <p>Greater Noida , 201310</p>
                  <p>India</p>
                  <p><strong>Phone:</strong> 6203104630</p>
                  <p><strong>Email:</strong> harshvirat894@gmail.com</p>
                </div>
                <div className={`col-lg-2 col-md-6 ${style.footerlinks}`}>
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/contact">About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/services">Services</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/contact">Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/contact">Privacy policy</a></li>
                  </ul>
                </div>
                <div className={`col-lg-3 col-md-6 ${style.footerlinks}`}>
                  <h4>Our Services</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/doctor">Supportive session</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/medicomart">Medicine MarketPlace</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/medicinePrediction">Medicine Predictor</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/diseasePrediction">Disease Predictor</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/diet">Diet Recommendation</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/exercise">Exercise Recommendation</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/calorieTracker">Calorie Tracker</a></li>
                  </ul>
                </div>
                <div className={`col-lg-4 col-md-6 ${style.footernewsletter}`}>
                  <img src="/about.jpg" alt="doctor" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${style.container} d-md-flex py-4`}>
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; Copyright <strong><span>MedicoMate</span></strong>. All Rights Reserved
              </div>
              <div className={style.credits}>
                Designed by <a href="https://github.com/h-a-r-s-h-s-r-a-h">Harsh</a>
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
              <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
              <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
              <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
              <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CalorieTracker;
