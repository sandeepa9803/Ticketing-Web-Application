import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, set } from "firebase/database";

import startFirebase from "../config";

// Importing css file for styling
import styles from "../style_sheets/Add.module.css";

// Importing images for the page
import addImg from "../img/add1.svg";
import addImg3 from "../img/box2.png";
import addImg4 from "../img/box4.png";
import addImg5 from "../img/box3.png";
import addImg6 from "../img/logo2.jpeg";
import photo from "../img/proflie.png";

// Importing react icons
import { RiHome6Line } from "react-icons/ri";
import { BsBookmarkDash, BsCheckSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";

export default function AddRoutes() {
  const [db, setDb] = useState(null);
  const [routeNo, setRouteNo] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // set the firebase connection to the state
    setDb(startFirebase());
  }, []);

  /**
   * Get all user inputs & return an object
   * @returns data to the insert function
   */
  function getAllInputs() {
    const data = {
      routeNo,
      departure,
      destination,
      fare,
      time,
    };
    console.log(data);
    return data;
  }

  /**
  * Calls when the user clicks on the submit button
  * Get the data from the getAllInputs() method and store in the firebase database
  * 
  * @param {object} e - event object
  * @returns {void}
  */
  function insertData(e) {
    e.preventDefault();
    e.stopPropagation();
    const database = db;
    const data = getAllInputs();

    set(ref(database, "routes/" + routeNo), {
      routeNo: data.routeNo,
      departure: data.departure,
      destination: data.destination,
      fare: data.fare,
      time: data.time,
    })
      .then(() => {
        alert("Inserted");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className={styles.body}>
      {/* navbar */}
      <div className={styles.sidebar}>
        <div className={styles.logo_content}>
          <div className={styles.logo}>
            <img src={addImg6} alt="Logo" className={styles.log1} />
          </div>
        </div>
        <div className={styles.nav_list}>
          <li className={styles.list}>
            <Link to="/add" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <RiHome6Line />
              </i>
              <span className={styles.links_name}>Add Busses </span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link to="/all" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <TbCalendarTime />
              </i>
              <span className={styles.links_name}>Time Table</span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link to="#" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <BsCheckSquare />
              </i>
              <span className={styles.links_name}> Update Busses</span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link to="#" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <BiTimeFive />
              </i>
              <span className={styles.links_name}> Routes</span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link to="#" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <BsBookmarkDash />
              </i>
              <span className={styles.links_name}>OtherDetails </span>
            </Link>
          </li>

          <li className={styles.list}>
            <Link to="#" className={styles.sidelinks}>
              <i className={styles.logo3}>
                <BsBookmarkDash />
              </i>
              <span className={styles.links_name}>Setting </span>
            </Link>
          </li>
        </div>
      </div>

      {/* header */}
      <div className={styles.mainContent}>
        <header className={styles.headert}>
          <div className={styles.userWrapper}>
            <img src={photo} className={styles.Profile}></img>
            <div></div>
            <h4>jeney Deo</h4>
            <small className={styles.userName}>Manager</small>
          </div>
        </header>

        {/* main box */}
        <main className={styles.Main1}>
          <div className={styles.dashboardCard}>
            <div className={styles.cardSingle}>
              <div className={styles.cardBody}>
                <div className={styles.cardname}>
                  <img src={addImg3} alt="Logo" className={styles.box2} />
                </div>
              </div>
            </div>

            <div className={styles.cardSingle}>
              <div className={styles.cardBody}>
                <div className={styles.cardname}>
                  <img src={addImg4} alt="Logo" className={styles.box2} />
                </div>
              </div>
            </div>

            <div className={styles.cardSingle}>
              <div className={styles.cardBody}>
                <div className={styles.cardname}>
                  <img src={addImg5} alt="Logo" className={styles.box2} />
                </div>
              </div>
            </div>
          </div>

          {/* form */}

          <section className={styles.recent}>
            <div className={styles.activityCard}>
              <h3>Add Bues Details</h3>

              <div className={styles.container}>
                <form className={styles.form1} onSubmit={insertData}>
                  <div className={`form-group text-left ${styles.input}`}>
                    <label>
                      <strong style={{ color: "#F9896B" }}>Route Number</strong>
                    </label>
                    <input
                      type="text"
                      style={{ height: "50px", paddingLeft: "20px" }}
                      class="form-control"
                      id="name"
                      placeholder="Route Number"
                      onChange={(e) => {
                        setRouteNo(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <label>
                      <strong style={{ color: "#F9896B" }}>Departure </strong>
                    </label>
                    <input
                      type="text"
                      style={{ height: "50px", paddingLeft: "20px" }}
                      class="form-control"
                      id="name"
                      placeholder="Departure"
                      onChange={(e) => {
                        setDeparture(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <label>
                      <strong style={{ color: "#F9896B" }}>Destination </strong>
                    </label>
                    <input
                      type="text"
                      style={{ height: "50px", paddingLeft: "20px" }}
                      class="form-control"
                      id="type"
                      placeholder="Destination"
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <label>
                      <strong style={{ color: "#F9896B" }}>Fare </strong>
                    </label>
                    <input
                      type="text"
                      style={{ height: "50px", paddingLeft: "20px" }}
                      class="form-control"
                      id="location"
                      placeholder="Fare"
                      onChange={(e) => {
                        setFare(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <label>
                      <strong style={{ color: "#F9896B" }}>Time </strong>
                    </label>
                    <input
                      type="text"
                      style={{ height: "50px", paddingLeft: "20px" }}
                      class="form-control"
                      id="price"
                      placeholder="time"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    />
                  </div>

                  <button type="submit" class={styles.subBtn}>
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <div className={styles.summary}>
              <img src={addImg} alt="Logo" className={styles.add1} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
