import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Store } from 'react-notifications-component';
import HashLoader from 'react-spinners/HashLoader';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import AWS from 'aws-sdk';
import { getTeamByTeamName, updatePlayers } from '../data-service/pi-data-service';
import { FaDownload, FaUpload } from 'react-icons/fa'; // Import icons
import './TeamData.css'; // Make sure this path is correct

AWS.config.update({
  region: 'eu-west-2', // e.g., "us-east-1"
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3();

const Bucket = 'prodlkcyllkcylstackemailbucket';
const bucketPath = 'verificationPDFs'; // Path in the bucket where the PDF is stored

const TeamData = (props) => {
  const [rowDataFromBe, setRowDataFromBe] = useState({});
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // File to upload
  const [uploading, setUploading] = useState(false); // Upload state

  const fetchCalled = useRef(false); // Ref to track if fetchData has been called

  const row = props.row;
  const teamName = row[0];

  const getPdf = async (teamName) => {
    const params = {
      Bucket,
      Key: `${bucketPath}/${teamName}.pdf`,
      Expires: 250, // URL expiration time in seconds
    };

    try {
      const signedUrl = s3.getSignedUrl('getObject', params);
      setPdfUrl(signedUrl);
    } catch (error) {
      console.error('Error fetching PDF URL:', error);
    }
  };

  const fetchData = useCallback(async () => {
    if (fetchCalled.current) return; // Prevent double calls
    fetchCalled.current = true;
    const data = await getTeamByTeamName(teamName);
    setRowDataFromBe(data);
    const newPlayers = data.players.map((p, index) => ({
      id: index,
      name: p.name,
      verified: p.verified,
    }));
    setPlayers(newPlayers);

    getPdf(teamName);
  }, [teamName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
    background: '#685dc3',
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadPdf = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const params = {
      Bucket,
      Key: `${bucketPath}/${teamName}.pdf`,
      Body: selectedFile,
      ContentType: selectedFile.type,
    };

    try {
      await s3.upload(params).promise();
      alert('File uploaded successfully!');
      // Optionally, update the pdfUrl to the uploaded file's URL

      getPdf(teamName);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const showToast = (title, message, type) => {
    Store.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeInRight'],
      animationOut: ['animate__animated', 'animate__fadeOutRight'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  const showPlayersVerifiedToast = () => {
    showToast('Players Verified', 'This teams players have been ammended', 'success');
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
    const returnedTeam = await updatePlayers(teamName, playersToAdd);
    const formatedReturnedPlayewrs = returnedTeam?.players?.map((p) => ({
      name: p.name,
      verified: p.verified,
    }));

    if (JSON.stringify(playersToAdd) === JSON.stringify(formatedReturnedPlayewrs)) {
      setLoading(false);
      showPlayersVerifiedToast();
      props.closeModal();
    }
  };

  return (
    <div className="team-data-container">
      {/* Team Details Section */}
      <div className="team-details">
        <h3 className="stats-heading">{`Team: ${teamName}`}</h3>
        <p>
          <strong>Unit:</strong> {rowDataFromBe.kcylUnit}
        </p>
        <p>
          <strong>Tournament:</strong> {rowDataFromBe.gender} Tournament
        </p>
        <p>
          <strong>Color:</strong> {rowDataFromBe.teamColor}
        </p>
        <p>
          <strong>Group:</strong> {rowDataFromBe.group}
        </p>
        <p>
          <strong>Additional Comments:</strong> {rowDataFromBe.additionalMessage}
        </p>
      </div>

      {/* Captain Details Section */}
      <div className="contact-details">
        <h3 className="stats-heading">Captain Details</h3>
        <p>
          <strong>Name:</strong> {rowDataFromBe.captainName}
        </p>
        <p>
          <strong>Phone:</strong> <a href={'tel:' + rowDataFromBe.captainPhone}>{rowDataFromBe.captainPhone}</a>
        </p>
        <p>
          <strong>Email:</strong> <a href={'mailto:' + rowDataFromBe.captainEmail}>{rowDataFromBe.captainEmail}</a>
        </p>
      </div>

      {/* Manager Details Section */}
      <div className="contact-details">
        <h3 className="stats-heading">Manager Details</h3>
        <p>
          <strong>Name:</strong> {rowDataFromBe.managerName}
        </p>
        <p>
          <strong>Phone:</strong> <a href={'tel:' + rowDataFromBe.managerPhone}>{rowDataFromBe.managerPhone}</a>
        </p>
        <p>
          <strong>Email:</strong> <a href={'mailto:' + rowDataFromBe.managerEmail}>{rowDataFromBe.managerEmail}</a>
        </p>
      </div>

      {/* Director Details Section */}
      <div className="contact-details">
        <h3 className="stats-heading">Director Details</h3>
        <p>
          <strong>Name:</strong> {rowDataFromBe.directorName}
        </p>
        <p>
          <strong>Phone:</strong> <a href={'tel:' + rowDataFromBe.directorPhone}>{rowDataFromBe.directorPhone}</a>
        </p>
        <p>
          <strong>Email:</strong> <a href={'mailto:' + rowDataFromBe.directorEmail}>{rowDataFromBe.directorEmail}</a>
        </p>
      </div>

      {/* Players Section */}
      <div className="players-section">
        <h3 className="stats-heading">Players</h3>
        {players.map((player, index) => (
          <div key={index} id={player.id} onClick={verifyPlayer} className="checkbox-wrapper-47">
            <input type="checkbox" name="cb" id="cb-47" onChange={verifyPlayer} checked={player.verified} />
            <label id={player.id}>{'  ' + player.name}</label>
          </div>
        ))}
        <button onClick={submitVerification} className="submit-button">
          Submit Verification <HashLoader cssOverride={override} loading={loading} color="#ffffff" />
        </button>
      </div>

      <div className="pdf-section">
        <div>
          <h3 className="stats-heading">Verification Form</h3>

          {/* Download Link with Icon */}
          <a href={pdfUrl} download={`${teamName} Verification Form.pdf`} className="download-link">
            <FaDownload style={{ marginRight: '8px' }} />
            Download Verification Form
          </a>

          {/* Upload Section */}
          <div className="upload-section">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={uploadPdf} disabled={uploading} className="upload-button">
              <FaUpload style={{ marginRight: '8px' }} />
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>
          </div>

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
