import React from "react";
import BarNav from "./BarNav";

const FootballStats = (props) => {

  return (
    <>
        <BarNav />
        <div style={{backgroundColor: '#1F1F1F'}} >
        <iframe title="quarterfinals" style={{width:'100%', height: '85vh' }} src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTeQ2089RDdIWG3hRSahC_rYrUF6dgSb-GJCMVYQEPD4heBUJdif-aSc_a_cC9G0VdblQN1wKlkat5c/pubhtml?gid=878056535&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
        </div>
  </>
  );
};

export default FootballStats;
