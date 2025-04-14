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
import BarNav from "./BarNav";

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

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const colorResponseData = await getAllAvailableColors();
    setAvailableColors(colorResponseData);
  };

  const openModal = async () => {
    const body = await getTableData();
    setTableData({ heading, body });
    setModalStatus(true);
  };

  const closeModal = () => setModalStatus(false);

  const getEmptyPlayers = () => {
    const players = [];
    for (let i = 1; i < 11; i++) {
      players.push({
        required: i < 7,
        id: `player${i + 1}`,
        placeholder: `Player ${i + 1} ${i < 7 ? "" : "(optional sub)"}`,
      });
    }
    return players;
  };

  const doChecks = () => "";

  const sortData = () => {
    const updatedFormData = { ...formData };
    updatedFormData.players = [formData.captainName, ...Object.values(players)];
    return updatedFormData;
  };

  const handleChange = (e) => {
    if (e.target.id === "teamName" && e.target.value === "admindash") openModal();
    formData[e.target.id] = e.target.value;
    setFormData({ ...formData });
  };

  const handleChangeInPlayers = (e) => {
    setPlayers({ ...players, [e.target.id]: e.target.value });
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
      dismiss: { duration: 5000, onScreen: true },
    });
  };

  // const getContacts = () => contacts.map((c, i) => (
  //   <div key={i}><p className="address">{c.role}: {c.name} <br/><span><a href={`tel:${c.number}`}>{c.number}</a></span></p></div>
  // ));

  const getUnits = () => resumeData.ukkcaunits.sort();

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    background: "#685dc3",
  };

  const buttonClicked = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const dataToSend = sortData();
    const frontEndErrorMessage = doChecks();

    if (!frontEndErrorMessage) {
      setloading(true);
      try {
        const msg = await submitForm(dataToSend);
        if (msg.teamName === dataToSend.teamName) {
          setSuccessMessage("Thank you for registering please check your email");
        } else {
          setErrorMessage(msg.data);
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
      setloading(false);
    } else {
      setErrorMessage(frontEndErrorMessage);
    }
  };


  const showEmailRequirments = () => showToast("Email", "Please ensure that all characters in the email are lowercase", "success");
  const showManagerBubble = () => showToast("Manager", "Manager Should be either a Unit Director or a responsible accompanying adult from the unit", "success");
  const showDirectorBubble = () => showToast("Director", "Director Should be a Unit Director that represents the KCYL members of the team", "success");
  const conbinedUnitsSelected = () => showToast("Combined Units", "If you are combining units please add the units you are combining in Additional Message or comments", "success");
  const handleColorFocus = () => showToast("Team Colour", "All players are required to wear the colour of the team selected", "success");

  // const contacts = props.data?.contacts || [];
  const message = props.data?.contactmessage || "";

  return (
    <>
      <BarNav />
      <section id="contact">
        <div>
          <div>
            <h1><span>Football Tournament Registration</span></h1>
            <p className="lead">{message}</p>
          </div>
        </div>

        <div style={{paddingRight: '5%', paddingLeft: '5%'}}>
          <div >
          <form
  onSubmit={buttonClicked}
  id="contactForm"
  name="contactForm"
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on "Enter"
    }
  }}
>
              <fieldset>
                <div className="form-section">
                  <h4>Team Details</h4>
                  <input required type="text" placeholder="Team Name" id="teamName" onChange={handleChange} />
                  <select required id="unit" defaultValue="" onChange={handleChange} onFocus={conbinedUnitsSelected}>
                    <option disabled value="">Please Select your Unit</option>
                    <option value="combined">Combining Unit</option>
                    {getUnits().map((unit, i) => <option key={i} value={unit}>{unit}</option>)}
                  </select>
                  <select required id="tournamentGender" defaultValue="" onChange={handleChange}>
                    <option disabled value="">Please Select Tournament</option>
                    <option value="Female">Female Tournament</option>
                    <option value="Male">Male Tournament</option>
                  </select>
                </div>

                <div className="form-section">
                  <h4>Captain's Contact</h4>
                  <input required type="text" placeholder="Captain Full Name" id="captainName" onChange={handleChange} />
                  <input required type="text" placeholder="Captain Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="captainEmail" onChange={handleChange} onFocus={showEmailRequirments} />
                  <input required type="tel" placeholder="Captain Phone" pattern="[0-9]{11}" id="captainPhone" onChange={handleChange} />
                </div>

                <div className="form-section">
                  <h4>Manager's Contact</h4>
                  <input required type="text" placeholder="Manager Full Name" id="managerName" onChange={handleChange} onFocus={showManagerBubble} />
                  <input required type="text" placeholder="Manager Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="managerEmail" onChange={handleChange} onFocus={showEmailRequirments} />
                  <input required type="tel" placeholder="Manager Phone" pattern="[0-9]{11}" id="managerPhone" onChange={handleChange} />
                </div>

                <div className="form-section">
                  <h4>Director's Contact</h4>
                  <input required type="text" placeholder="Director Full Name" id="directorName" onChange={handleChange} onFocus={showDirectorBubble}/>
                  <input required type="text" placeholder="Director Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="directorEmail" onChange={handleChange} onFocus={showEmailRequirments} />
                  <input required type="tel" placeholder="Director Phone" pattern="[0-9]{11}" id="directorPhone" onChange={handleChange} />
                </div>

                <div className="form-section">
                  <h4>Team Colour and Players</h4>
                  <select required id="selectedColor" defaultValue="" onChange={handleChange} onFocus={handleColorFocus}>
                    <option disabled value="">Please Select Team Colour</option>
                    {availableColors.map((color, index) => (
                      <option key={index} value={color.colorName} disabled={!color.available}>
                        {color.colorName} {!color.available ? "(Unavailable)" : ""}
                      </option>
                    ))}
                  </select>

                  {getEmptyPlayers().map((player, i) => (
                    <input
                      key={i}
                      required={player.required}
                      type="text"
                      placeholder={player.placeholder}
                      id={player.id}
                      onChange={handleChangeInPlayers}
                    />
                  ))}
                </div>

                <div className="form-section">
                  <h4>Additional Comments</h4>
                  <textarea id="contactMessage" rows="6" placeholder="Additional Message or Comments" onChange={handleChange}></textarea>
                </div>

                <div className="submitButton">
                  <button className="submit">
                    Submit <HashLoader cssOverride={override} loading={loading} />
                  </button>
                </div>
              </fieldset>
            </form>

            {errorMessage && <div id="message-warning">{errorMessage}</div>}
            {successMessage && <div id="message-success"><i className="fa fa-check"></i>{successMessage}</div>}
          </div>
        </div>

        <Modal isOpen={modalStatus} onRequestClose={closeModal} contentLabel="Admin Modal">
          <button onClick={closeModal}>close</button>
          <div>Welcome to top secret page, don’t share this with anyone.</div>
          <MyTable data={tabledata} refreshData={openModal} />
        </Modal>
      </section>
    </>
  );
};

export default Contact;
