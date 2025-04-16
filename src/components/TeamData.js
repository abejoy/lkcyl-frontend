import React, { useCallback, useEffect, useRef, useState } from "react";
import { Store } from "react-notifications-component";
import HashLoader from "react-spinners/HashLoader";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import AWS from "aws-sdk";
import {
  getTeamByTeamName,
  updatePlayers,
} from "../data-service/pi-data-service";
import "./TeamData.css"; // Make sure this path is correct

AWS.config.update({
  region: "eu-west-2", // e.g., "us-east-1"
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();


const TeamData = (props) => {
  const [rowDataFromBe, setRowDataFromBe] = useState({});
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const fetchCalled = useRef(false); // Ref to track if fetchData has been called

  const row = props.row;

  const fetchData = useCallback(async () => {
    if (fetchCalled.current) return; // Prevent double calls
    fetchCalled.current = true;
    const data = await getTeamByTeamName(row[0]);
    setRowDataFromBe(data);
    const newPlayers = data.players.map((p, index) => ({
      id: index,
      name: p.name,
      verified: p.verified,
    }));
    setPlayers(newPlayers);

    //getpdf
    const params = {
      Bucket: 'prodlkcyllkcylstackemailbucket',
      Key: `verificationPDFs/${row[0]}.pdf`, // Path to your PDF file in the bucket
      Expires: 250, // URL expiration time in seconds
    };

    try {
      const signedUrl = s3.getSignedUrl("getObject", params);
      console.log("Signed URL:", signedUrl);
      setPdfUrl(signedUrl);
    } catch (error) {
      console.error("Error fetching PDF URL:", error);
    }

  }, [row]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    background: "#685dc3",
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

  const showPlayersVerifiedToast = () => {
    showToast(
      "Players Verified",
      "This teams players have been ammended",
      "success"
    );
  };

  const verifyPlayer = (e) => {
    const index = parseInt(e.target.id); // Convert the id to the appropriate type
    const playerIndex = players.findIndex((p) => p.id === index);
    if (playerIndex === -1) {
      return; // Exit the function if no matching player is found
    }

    const player = players[playerIndex];
    player.verified = !player.verified;

    const newPlayers = [...players];
    newPlayers[playerIndex] = player;
    setPlayers(newPlayers);
  };

  const submitVerification = async () => {
    setLoading(true);
    const playersToAdd = players.map((p) => ({
      name: p.name,
      verified: p.verified,
    }));
    const returnedTeam = await updatePlayers(row[0], playersToAdd);
    const formatedReturnedPlayewrs = returnedTeam?.players?.map((p) => ({
      name: p.name,
      verified: p.verified,
    }));

    if (
      JSON.stringify(playersToAdd) === JSON.stringify(formatedReturnedPlayewrs)
    ) {
      setLoading(false);
      showPlayersVerifiedToast();
      props.closeModal();
    }
  };

  return (
    <div className="team-data-container">
      {/* Team Details Section */}
      <div className="team-details">
        <h3>{`Team: ${row[0]}`}</h3>
        <p><strong>Unit:</strong> {rowDataFromBe.kcylUnit}</p>
        <p><strong>Tournament:</strong> {rowDataFromBe.gender} Tournament</p>
        <p><strong>Color:</strong> {rowDataFromBe.teamColor}</p>
        <p><strong>Group:</strong> {rowDataFromBe.group}</p>
        <p><strong>Additional Comments:</strong> {rowDataFromBe.additionalMessage}</p>
      </div>

      {/* Captain Details Section */}
      <div className="contact-details">
        <h3>Captain Details</h3>
        <p><strong>Name:</strong> {rowDataFromBe.captainName}</p>
        <p><strong>Phone:</strong> <a href={"tel:" + rowDataFromBe.captainPhone}>{rowDataFromBe.captainPhone}</a></p>
        <p><strong>Email:</strong> <a href={"mailto:" + rowDataFromBe.captainEmail}>{rowDataFromBe.captainEmail}</a></p>
      </div>

      {/* Manager Details Section */}
      <div className="contact-details">
        <h3>Manager Details</h3>
        <p><strong>Name:</strong> {rowDataFromBe.managerName}</p>
        <p><strong>Phone:</strong> <a href={"tel:" + rowDataFromBe.managerPhone}>{rowDataFromBe.managerPhone}</a></p>
        <p><strong>Email:</strong> <a href={"mailto:" + rowDataFromBe.managerEmail}>{rowDataFromBe.managerEmail}</a></p>
      </div>

      {/* Director Details Section */}
      <div className="contact-details">
        <h3>Director Details</h3>
        <p><strong>Name:</strong> {rowDataFromBe.directorName}</p>
        <p><strong>Phone:</strong> <a href={"tel:" + rowDataFromBe.directorPhone}>{rowDataFromBe.directorPhone}</a></p>
        <p><strong>Email:</strong> <a href={"mailto:" + rowDataFromBe.directorEmail}>{rowDataFromBe.directorEmail}</a></p>
      </div>

      {/* Players Section */}
      <div className="players-section">
        <h3>Players</h3>
        {players.map((player, index) => (
        <div
          key={index}
          id={player.id}
          onClick={verifyPlayer}
          className="checkbox-wrapper-47"
        >
          <input
            type="checkbox"
            name="cb"
            id="cb-47"
            onChange={verifyPlayer}
            checked={player.verified}
          />
          <label id={player.id}>{"  " + player.name}</label>
        </div>
      ))}
              <button onClick={submitVerification} className="submit-button">
          Submit Verification{" "}
          <HashLoader cssOverride={override} loading={loading} color="#ffffff" />
        </button>
      </div>

      <div className="pdf-section">
              <div>
        <h4>Verification Form</h4>
        <a href={pdfUrl} download className="download-link">
          Download Verification Form
        </a>
        {pdfUrl ? (
          <div className="pdf-viewer-container">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer defaultScale={'PageWidth'} fileUrl={pdfUrl} />
            </Worker>
          </div>
        ) : (
          <p>No PDF selected</p>
        )}
      </div>
      </div>
                 

    </div>
  );
};

export default TeamData;
 


