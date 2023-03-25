import React, { useEffect, useState } from "react";
import { ref, set, get, child } from "firebase/database";
import startFirebase from "../config";
import { Link, useParams } from "react-router-dom";

// Importing css file for styling
import styles from "../style_sheets/Add.module.css";

// Importing images for the page
import photo from "../img/proflie.png";
import addImg from "../img/update2.svg";
import addImg6 from "../img/logo2.jpeg";
import addImg3 from "../img/box2.png";
import addImg4 from "../img/box4.png";
import addImg5 from "../img/box3.png";

// Importing react icons
import { RiHome6Line } from "react-icons/ri";
import { BsBookmarkDash, BsCheckSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";

export default function EditRoutes() {
  const [routeNo, setRouteNo] = useState("");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [time, setTime] = useState("");

  const { id } = useParams();

  // set the firebase connection to the db state
  const db = startFirebase();

  function selectData() {
    const dbref = ref(db);

    /**
     * Get the existing data from firebase database and set it to the form fields
     * 
     * @returns {void}
     */
    get(child(dbref, "routes/" + id)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setRouteNo(snapshot.val().routeNo);
        setDeparture(snapshot.val().departure);
        setDestination(snapshot.val().destination);
        setFare(snapshot.val().fare);
        setTime(snapshot.val().time);
      } else {
        console.log("No data available");
      }
    });
  }

  useEffect(() => {
    // Call the function to get the data from firebase database
    selectData();
    console.log(id);
  }, []);

  /**
   * Get all user inputs & return an object
   * @returns data to the update function
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
  * Calls when the user clicks on the update button
  * Get the updated data from the getAllInputs() method and store in the firebase database
  * 
  * @param {object} e - event object
  * @returns {void}
  */
  function updateData(e) {
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
        alert("Updated");
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
              <h3>Update Hotel Details</h3>

              <div className={styles.container}>
                <form className={styles.form1}>
                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      class="form-control"
                      id="NIC"
                      placeholder="Route No"
                      value={routeNo}
                      onChange={(e) => {
                        setRouteNo(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      placeholder="Departure"
                      value={departure}
                      onChange={(e) => {
                        setDeparture(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      class="form-control"
                      id="Age"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="text"
                      class="form-control"
                      id="Email"
                      placeholder="Fare"
                      value={fare}
                      onChange={(e) => {
                        setFare(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input}`}>
                    <input
                      type="int"
                      class="form-control"
                      id="Contact_Number"
                      placeholder="Time"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    />
                  </div>

                  <div className={`form-group text-left ${styles.input1}`}>
                    <button
                      type="button"
                      class={styles.subBtn}
                      onClick={updateData}
                    >
                      {" "}
                      Update &nbsp;&nbsp;&nbsp;
                    </button>
                    &nbsp;&nbsp;
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.summary}></div>

            <div className={styles.summary1}>
              <img src={addImg} alt="Logo" className={styles.update2} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
