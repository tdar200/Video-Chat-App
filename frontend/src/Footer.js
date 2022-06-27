import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        background: "black",
        height: "100px",
        color: "white",
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <ul>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
        <div style={{ flexDirection: "column" }}>
          <ul>
            <li>Lorem</li>
            <li>Lorem</li>

            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
        <div style={{ flexDirection: "column" }}>
          <ul>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
        <div style={{ flexDirection: "column" }}>
          <ul>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
