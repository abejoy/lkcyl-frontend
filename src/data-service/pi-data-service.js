// import axios from "axios";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPH_URI_ENDPOINT, // Replace with your actual GraphQL endpoint
    headers: {
      "x-api-key": process.env.REACT_APP_X_API_KEY, // Replace with your actual API key if needed
    },
  }),
});

const ADD_TEAM_MUTATION = gql`
  mutation AddTeam(
    $teamName: String!
    $managerEmail: String!
    $captainName: String!
    $captainEmail: String!
    $selectedColor: Color!
    $tournamentGender: Gender!
    $unit: String!
    $players: [String]!
    $managerName: String!
    $contactMessage: String!
    $captainPhone: String!
    $managerPhone: String!
  ) {
    addTeam(
      teamName: $teamName
      managerEmail: $managerEmail
      captainName: $captainName
      captainEmail: $captainEmail
      teamColor: $selectedColor
      gender: $tournamentGender
      kcylUnit: $unit
      playerNames: $players
      managerName: $managerName
      additionalMessage: $contactMessage
      captainPhone: $captainPhone
      managerPhone: $managerPhone
    ) {
      teamName
      managerName
      managerEmail
      captainName
      captainEmail
      teamColor
      kcylUnit
      gender
      additionalMessage
      captainPhone
      managerPhone
      players {
        name
        verified
      }
    }
  }
`;

export const submitForm = async (formdata) => {
  const contactMessage = formdata.contactMessage || "";
  const {
    teamName,
    managerEmail,
    captainName,
    captainEmail,
    selectedColor,
    tournamentGender,
    unit,
    players,
    managerName,
    captainPhone,
    managerPhone,
  } = formdata;
  const { data } = await client.mutate({
    mutation: ADD_TEAM_MUTATION,
    variables: {
      teamName,
      managerEmail,
      captainName,
      captainEmail,
      selectedColor,
      tournamentGender,
      unit,
      players,
      managerName,
      contactMessage,
      captainPhone,
      managerPhone,
    },
  });
  return data.addTeam;
};

const UpdateTeamPlayers_QUERY = gql`
  mutation UpdateTeamPlayers($teamName: String!, $players: [PlayerInput]!) {
    updateTeamPlayers(teamName: $teamName, players: $players) {
      teamName
      managerName
      managerEmail
      captainName
      captainEmail
      teamColor
      kcylUnit
      gender
      additionalMessage
      captainPhone
      managerPhone
      players {
        name
        verified
      }
    }
  }
`;
export const updatePlayers = async (teamName, players) => {
  const { errors, data } = await client.mutate({
    mutation: UpdateTeamPlayers_QUERY,
    variables: { players, teamName },
  });
  if (errors && errors.length > 0) {
    console.error("GraphQL Errors:", errors);
    throw new Error("Errors returned from the server.");
  }
  return data.updateTeamPlayers;
};

const GET_ALL_TEAMS = gql`
  query GetAllTeam {
    getAllTeam {
      teamName
      managerName
      managerEmail
      captainName
      captainEmail
      teamColor
      kcylUnit
      gender
      additionalMessage
      captainPhone
      managerPhone
      players {
        name
        verified
      }
    }
  }
`;

export const getAllTeams = async () => {
  const { errors, data } = await client.query({
    query: GET_ALL_TEAMS,
    fetchPolicy: "network-only",
  });
  if (errors && errors.length > 0) {
    console.error("GraphQL Errors:", errors);
    throw new Error("Errors returned from the server.");
  }
  return data.getAllTeam;
};

const GET_TABLE_DATA = gql`
  query GetTableData {
    getTableData
  }
`;
export const getTableData = async () => {
  const { errors, data } = await client.query({
    query: GET_TABLE_DATA,
    fetchPolicy: "network-only",
  });
  if (errors && errors.length > 0) {
    console.error("GraphQL Errors:", errors);
    throw new Error("Errors returned from the server.");
  }
  return data.getTableData;
};

const GET_TEAM_BY_TEAM_NAME_QUERY = gql`
  query GetTeam($teamName: String!) {
    getTeam(teamName: $teamName) {
      teamName
      managerName
      managerEmail
      managerPhone
      captainName
      captainEmail
      captainPhone
      teamColor
      kcylUnit
      gender
      additionalMessage
      players {
        name
        verified
      }
    }
  }
`;
export const getTeamByTeamName = async (teamName) => {
  const { errors, data } = await client.query({
    query: GET_TEAM_BY_TEAM_NAME_QUERY,
    fetchPolicy: "network-only",
    variables: { teamName },
  });
  if (errors && errors.length > 0) {
    console.error("GraphQL Errors:", errors);
    throw new Error("Errors returned from the server.");
  }
  return data.getTeam;
};

// export const helloWorld = async () => {
//   return axios.get(url + "hello");
// };

// export const getAllAvailableColors = async () => {
//   return axios.get(url + "colours");
// };

const GET_AVAILABLE_COLORS_QUERY = gql`
  query GetAvailableColors {
    getAvailableColors {
      colorName
      available
    }
  }
`;

export const getAllAvailableColors = async () => {
  const { errors, data } = await client.query({
    query: GET_AVAILABLE_COLORS_QUERY,
    fetchPolicy: "network-only",
  });
  if (errors && errors.length > 0) {
    console.error("GraphQL Errors:", errors);
    throw new Error("Errors returned from the server.");
  }
  return data.getAvailableColors;
};
