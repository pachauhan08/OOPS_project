import React from "react"
import { Nav, Collapse, Navbar, NavItem, NavLink } from "reactstrap"
import Profile from "../Assets/Profile.png"

class SideBar extends React.Component {
    render() {
        return (
            <div>
                <div style={{ color: "#F9D978", fontSize: "1.5rem", textAlign: "center", width: "227px", fontWeight: "700", backgroundColor: "var(--orange-color)" }}>
                    BITS SCHEDULER
                </div>
                <Navbar style={{ display: "flex", height: "100%", position: "absolute", flexDirection: "column", width: "225px", backgroundColor: "var(--green-color)", boxShadow: "0px 0px 6px black", color: "var(--orange-color)" }} expand="md">
                    <Collapse navbar>
                        <Nav navbar style={{ display: "flex", marginTop: "10px", flexDirection: "column", color: "#000000" }}>
                            <NavItem>
                                <img src={Profile} />
                            </NavItem>
                            <NavItem>
                                <div style={{ textAlign: "center", fontWeight: "800", marginBottom:"0.5rem"}}>
                                    {JSON.parse(localStorage.getItem("userDetails")).role}
                                </div>
                            </NavItem>
                            <NavItem>
                                <div style={{ textAlign: "center", fontWeight: "800", backgroundColor:"var(--white-color)", marginBottom:"0.5rem" }}>
                                {JSON.parse(localStorage.getItem("userDetails")).name}
                                </div>
                            </NavItem>
                            <NavItem>
                                <div style={{ textAlign: "center", fontWeight: "800", marginBottom:"4rem", backgroundColor:"var(--white-color)"  }}>
                                {JSON.parse(localStorage.getItem("userDetails")).username}
                                </div>
                            </NavItem>
                            <NavItem>
                                <NavLink className="menu-content" href="/dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="menu-content" href="/facilities">
                                    Facilities
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="menu-content" href="/change-info">
                                    Change User Info
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" className="menu-content" onClick={() => {localStorage.removeItem("userDetails");window.location.reload();}}>
                                    Log Out
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default SideBar