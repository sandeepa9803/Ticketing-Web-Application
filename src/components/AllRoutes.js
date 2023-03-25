import React, { Component } from "react";
import { ref, onValue, remove } from "firebase/database";
import { Link } from "react-router-dom";
import startFirebase from "../config";

// Importing css file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../style_sheets/All.module.css";

// Importing images from the img directory
import photo from "../img/proflie.png";
import addImg3 from "../img/box2.png";
import addImg4 from "../img/box4.png";
import addImg5 from "../img/box3.png";
import addImg6 from "../img/logo2.jpeg";

// Importing react icons
import { TbCalendarTime } from "react-icons/tb";
import { RiHome6Line } from "react-icons/ri";
import { BsBookmarkDash, BsCheckSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

// Start firebase database
const db = startFirebase();

/**
 * Get the data from firebase database and display it in a table
 * 
 * @returns table with the data
 * @param {*} props
 * @returns {void}
 */
export default class AllRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: [],
    };
  }
  componentDidMount() {
    const dbRef = ref(db, "routes/");

    // Get the data from firebase database
    onValue(dbRef, (snapshot) => {
      let records = [];

      // Get the data from firebase database and store it in an array
      snapshot.forEach((childSnapshot) => {
         const childData = childSnapshot.val();
         records.push(childData);
      });
      this.setState({ routeData: records });
    });
  }

  // Delete the specified data from firebase database
  onDelete(id) {
      const dbRef = ref(db, "routes/" + id);
      remove(ref(db, "routes/" + id)).then(() => {
         alert("Deleted");
      }).catch((error) => {
         alert("Error"+error);
      });
  }

  render() {
    return (
      <div className={styles.body}>
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
        <div className={styles.mainContent}>
          {/* header */}
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

            {/* table */}
            <div class={`text-center ${styles.table_responsive}`}>
              <section
                class="p-3"
                style={{ backgroundColor: "#fff", width: "1500px" }}
              >
                <h3 className={styles.add_h1}>Time Table</h3>
                <div className="table-responsive">
                  <table className={styles.content_table}>
                    <thead className={styles.dark}>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Route No</th>
                        <th scope="col">Departure</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Fare</th>
                        <th scope="col">Time</th>

                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {this.state.routeData.map((rawData, index) => (
                        <tr>
                          <td scope="row">{index + 1}</td>
                          <td>{rawData.routeNo}</td>
                          <td>{rawData.departure}</td>
                          <td>{rawData.destination}</td>
                          <td>{rawData.fare}</td>
                          <td>{rawData.time}</td>

                          <td>
                            <Link
                              to={`/edit/${rawData.routeNo}`}
                              className={styles.btn_table}
                            >
                              Update
                            </Link>
                          </td>
                          <td>
                            <button
                              class={styles.btn_table1}
                              onClick={() => this.onDelete(rawData.routeNo)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
