import React, { useCallback, useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import HashLoader from "react-spinners/HashLoader";
import {
  getTeamByTeamName,
  updatePlayers,
} from "../data-service/pi-data-service";
import { styles } from "./MyTable";
import "./TeamData.css"; // Make sure this path is correct

const TeamData = (props) => {
  const [rowDataFromBe, setRowDataFromBe] = useState({});
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const row = props.row;

  const fetchData = useCallback(async () => {
    const data = await getTeamByTeamName(row[0]);
    setRowDataFromBe(data);
    const newPlayers = data.players.map((p, index) => ({
      id: index,
      name: p.name,
      verified: p.verified,
    }));
    setPlayers(newPlayers);
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
  //   const data = await getTeamByTeamName(row[0]);
  //   setRowDataFromBe(data);
  //   const newPlayers = data.players.map((p, index) => ({
  //     id: index,
  //     name: p.name,
  //     verified: p.verified,
  //   }));
  //   setPlayers(newPlayers);
  // };

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
    <div style={styles.centerDiv}>
      <div style={styles.sectionDivs}>
        <div>Unit: {rowDataFromBe.kcylUnit}</div>
        <div>{rowDataFromBe.gender} Tournament</div>
        <div>Color: {rowDataFromBe.teamColor}</div>
        <div>Group: {rowDataFromBe.group}</div>
        <div>Additional Comments: {rowDataFromBe.additionalMessage}</div>
      </div>

      <div style={styles.sectionDivs}>
        <div>Captain Details</div>
        <div>{rowDataFromBe.captainName}</div>
        <div>
          {" "}
          <a href={"tel:" + rowDataFromBe.captainPhone}>
            {" "}
            {rowDataFromBe.captainPhone}{" "}
          </a>
        </div>
        <div>
          {" "}
          <a href={"mailto:" + rowDataFromBe.captainEmail}>
            {" "}
            {rowDataFromBe.captainEmail}{" "}
          </a>
        </div>
      </div>

      <div style={styles.sectionDivs}>
        <div>Manager Details</div>
        <div>{rowDataFromBe.managerName}</div>
        <div>
          {" "}
          <a href={"tel:" + rowDataFromBe.managerPhone}>
            {" "}
            {rowDataFromBe.managerPhone}{" "}
          </a>
        </div>
        <div>
          {" "}
          <a href={"mailto:" + rowDataFromBe.managerEmail}>
            {" "}
            {rowDataFromBe.managerEmail}{" "}
          </a>
        </div>
      </div>

      <div style={styles.sectionDivs}>
        <div>Players</div>
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
      </div>

      <div style={styles.sectionDivs}>
        <button onClick={submitVerification}>
          Submit Verification{" "}
          <HashLoader
            cssOverride={override}
            loading={loading}
            color="#ffffff"
          />
        </button>
      </div>
    </div>
  );
};

export default TeamData;
