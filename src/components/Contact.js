import React, { useEffect, useState } from "react";
import {
  submitForm,
  getAllAvailableColors,
  getTableData,
} from "../data-service/pi-data-service";
import HashLoader from "react-spinners/HashLoader";
import Modal from "react-modal";
import MyTable from "./MyTable.js";
import { Store } from "react-notifications-component";
import resumeData from "../assets/resumeData.json";
import BarNav from './BarNav';

const Contact = (props) => {
  const heading = ["Team Name", "Unit", "Colour", "Verified"];

  const [formData, setFormData] = useState({ players: [] });
  const [players, setPlayers] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [tabledata, setTableData] = useState({});
  const [availableColors, setAvailableColors] = useState([]);

  const openModal = async () => {
    const body = await getTableData();
    setTableData({ heading, body });
    setModalStatus(true);
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const colorResponseData = await getAllAvailableColors();
    setAvailableColors(colorResponseData);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  const getEmptyPlayers = () => {
    const players = [];
    for (var i = 1; i < 11; i++) {
      players.push({
        required: i < 7,
        id: `player${i + 1}`,
        placeholder: `Player ${i + 1} ${i < 7 ? "" : "(optional sub)"}`,
      });
    }
    return players;
  };

  if (props.data) {
    var contacts = props.data.contacts;
    var message = props.data.contactmessage;
  }

  const doChecks = () => {
    return "";
  };

  const sortData = () => {
    const updatedFormData = { ...formData };
    const arrayOfPlayers = [
      formData.captainName,
      ...Object.values({ ...players }),
    ];

    updatedFormData.players = arrayOfPlayers;

    return updatedFormData;
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    background: "#685dc3",
  };

  const buttonClicked = async (e) => {
    setErrorMessage("");
    setSuccessMessage("");
    e.preventDefault();
    const dataToSend = sortData();
    const frontEndErrorMessage = doChecks();

    if (frontEndErrorMessage === "") {
      setloading(true);
      submitForm(dataToSend)
        .then((msg) => {
          // Message was sent
          if (msg.teamName === dataToSend.teamName) {
            setSuccessMessage(
              "Thank you for registering please check your email"
            );
          }
          // There was an error
          else {
            setErrorMessage(msg.data);
          }

          setloading(false);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setloading(false);
        });
    } else {
      setErrorMessage(frontEndErrorMessage);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "teamName" && e.target.value === "admindash") {
      openModal();
    }
    formData[e.target.id] = e.target.value;
    setFormData(formData);
  };

  const handleChangeInPlayers = async (e) => {
    const { id, value } = e.target;
    const updatedPlayers = { ...players };
    updatedPlayers[id] = value;
    setPlayers(updatedPlayers);
  };

  const showToast = (title, message, type) => {
    Store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeInRight"],
      animationOut: ["animate__animated", "animate__fadeOutRight"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const conbinedUnitsSelected = (e) => {
    showToast(
      "Combined Units",
      "If you are combining units please add the units you are combining in Aditional Message or comments",
      "success"
    );
  };

  const showEmailRequirments = (e) => {
    showToast(
      "Email",
      "Please ensure that all characters in the email are lowercase",
      "success"
    );
  };

  const showManagerBubble = (e) => {
    showToast(
      "Manager",
      "Manager Should be either a Unit Director or a responsible accompanying adult from the unit",
      "success"
    );
  };

  const handleColorFocus = (e) => {
    showToast(
      "Team Colour",
      "All players are required to wear the colour of the team selected",
      "success"
    );
  };

  const getContacts = () => {
    const items = [];
    contacts.forEach((contact) => {
      items.push(
        <div>
          <p className="address">
            {contact.role}: {contact.name} <br />
            <span>
              {" "}
              <a href={"tel:" + contact.number}>{contact.number}</a>
            </span>
          </p>
        </div>
      );
    });
    return items;
  };

  const getUnits = () => {
    return resumeData.ukkcaunits.sort();
  };

  return (
    <>
    <BarNav/>
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Football Tournament Registration.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{message}</p>
        </div>
      </div>

      <div className="row">
        <div className="fakecenter eight columns">
          <form onSubmit={buttonClicked} id="contactForm" name="contactForm">
            <fieldset>
              <div>
                <input
                  required
                  type="text"
                  placeholder="Team Name"
                  defaultValue=""
                  size="35"
                  id="teamName"
                  name="teamName"
                  onChange={handleChange}
                />
              </div>

              <div>
                <select
                  required
                  id="unit"
                  defaultValue=""
                  name="unit"
                  onChange={handleChange}
                  onFocus={conbinedUnitsSelected}
                >
                  <option disabled value="">
                    Please Select your Unit
                  </option>
                  <option value="combined">Combining Unit</option>
                  {getUnits().map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  required
                  id="tournamentGender"
                  defaultValue=""
                  name="tournamentGender"
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Please Select Tournament
                  </option>
                  <option value="Female">Female Tournament</option>
                  <option value="Male">Male Tournament</option>
                </select>
              </div>

              <div>
                <input
                  required
                  type="text"
                  placeholder="Captain Full Name"
                  defaultValue=""
                  size="35"
                  id="captainName"
                  name="captainName"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  required
                  type="text"
                  placeholder="captains Email"
                  defaultValue=""
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  size="35"
                  id="captainEmail"
                  name="captainEmail"
                  onChange={handleChange}
                  onFocus={showEmailRequirments}
                />
              </div>

              <div className="textfeildfront">
                <input
                  required
                  type="tel"
                  placeholder="captains Phone"
                  pattern="[0-9]{11}"
                  size="35"
                  id="captainPhone"
                  name="captainPhone"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  required
                  type="text"
                  placeholder="Manager/Director Full Name"
                  defaultValue=""
                  size="35"
                  id="managerName"
                  name="managerName"
                  onChange={handleChange}
                  onFocus={showManagerBubble}
                />
              </div>

              <div>
                <input
                  required
                  type="text"
                  placeholder="Manager/Director Email"
                  defaultValue=""
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  size="35"
                  id="managerEmail"
                  name="managerEmail"
                  onChange={handleChange}
                  onFocus={showEmailRequirments}
                />
              </div>

              <div className="textfeildfront">
                <input
                  required
                  type="tel"
                  placeholder="Manager/Director Phone Number"
                  pattern="[0-9]{11}"
                  size="35"
                  id="managerPhone"
                  name="managerPhone"
                  onChange={handleChange}
                />
              </div>

              {/* TODO color selection here */}

              <div>
                <select
                  required
                  id="selectedColor"
                  defaultValue=""
                  name="selectedColor"
                  onChange={handleChange}
                  onFocus={handleColorFocus}
                >
                  <option disabled value="">
                    {" "}
                    Please Select Team Colour{" "}
                  </option>
                  {availableColors.map((color, index) => (
                    <option
                      disabled={!color.available}
                      key={index}
                      value={color.colorName}
                    >
                      {" "}
                      {color.colorName}{" "}
                      {!color.available ? "(Unavailable)" : ""}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="textfeildfront">
                <textarea
                  cols="50"
                  rows="15"
                  id="contactMessage"
                  placeholder="Additional Message or Comments"
                  name="contactMessage"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="textfeildfront">
                <span>
                  Excluding the captain please enter your team players names
                </span>
              </div>

              {getEmptyPlayers().map((player, index) => (
                <div key={index}>
                  <input
                    required={player.required}
                    type="text"
                    placeholder={player.placeholder}
                    defaultValue=""
                    size="35"
                    id={player.id}
                    name={player.id}
                    onChange={handleChangeInPlayers}
                  />
                </div>
              ))}

              <div className="submitButton">
                <button className="submit">
                  Submit{" "}
                  <HashLoader
                    cssOverride={override}
                    loading={loading}
                    color="#ffffff"
                  />
                </button>
              </div>
            </fieldset>
          </form>

          {errorMessage !== "" && (
            <div id="message-warning" style={{ marginLeft: "0rem" }}>
              {" "}
              {errorMessage}
            </div>
          )}

          {successMessage !== "" && (
            <div id="message-success" style={{ marginLeft: "0rem" }}>
              <i className="fa fa-check"></i>
              {successMessage}
              <br />
            </div>
          )}

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Contact Details</h4>

              {getContacts()}
            </div>
          </aside>
        </div>
      </div>
      <Modal
        isOpen={modalStatus}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        //   style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>Welcome to top secret page dont share this with anyone</div>
        <MyTable data={tabledata} refreshData={openModal} />
      </Modal>
    </section>
    </>
  );
};

export default Contact;
