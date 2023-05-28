import React from "react"
import SideBar from "./SideBar"
import { Input, Card, Button } from "reactstrap"
import axios from "axios"

class Facilities extends React.Component {
    constructor() {
        super()
        this.state = {
            roomName: "",
            start: "",
            end: "",
            selectedRoom: "",
            bookings: [],
            roomStatus: []
        }
    }
    componentDidMount() {  //executes before loading
        axios.get(`http://localhost:8000/api/facility/${JSON.parse(localStorage.getItem("userDetails")).uid}`).then(user => {
            this.setState({ bookings: user.data })  //facilites already booked loaded
        }).catch(err => {
            console.log(err.message);
        })
    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const bookRoom = () => {
            const data = {
                roomName: this.state.roomName,
                start: this.state.start,
                end: this.state.end,
                bookedUid: JSON.parse(localStorage.getItem("userDetails")).uid
            }
            axios.post(`http://localhost:8000/api/facility`, data).then(user => {
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        const checkAvailability = () => {
            axios.get(`http://localhost:8000/api/facility/all/${this.state.selectedRoom}`).then(user => {
                this.setState({ roomStatus: user.data })
            }).catch(err => {
                console.log(err.message);
            })
        }
        const deleteBooking= (booking) => {
            axios.delete(`http://localhost:8000/api/facility/delete/${booking.uid}`).then(user => {
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        return (
            <div>
                <SideBar />
                <div style={{ marginLeft: "300px" }}>
                    <div style={{ color: "var(--green-color)", fontSize: "2rem", fontWeight: "900", textAlign: "end", marginRight: "2rem" }}>
                        FACILITIES
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                            <Card style={{ padding: "1rem 2rem", margin: "0rem 1rem" }}>
                                <h3>BOOK ROOMS IN ACADEMIC BLOCK</h3>
                                <div style={{ color: "red", fontWeight: "400", marginBottom: "0.5rem" }}>
                                    NOTE: Please check room availability before booking
                                </div>
                                <div style={{ display: "flex", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "200px", alignSelf: "center", fontWeight: "bold" }}>Room No.:</div>
                                    <Input value={this.state.roomName} onChange={onChange} name="roomName" type="select">
                                        <option value="">--SELECT ROOM --</option>
                                        <option value="F 102">F 102</option>
                                        <option value="F 103">F 103</option>
                                        <option value="F 104">F 104</option>
                                        <option value="F 105">F 105</option>
                                        <option value="F 106">F 106</option>
                                        <option value="F 107">F 107</option>
                                        <option value="F 108">F 108</option>
                                        <option value="F 109">F 109</option>
                                    </Input>
                                </div>
                                <div style={{ display: "flex", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "200px", alignSelf: "center", fontWeight: "bold" }}>Start Time:</div>
                                    <Input onChange={onChange} value={this.state.start} name="start" type="datetime-local" />
                                </div>
                                <div style={{ display: "flex", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "200px", alignSelf: "center", fontWeight: "bold" }}>End Time:</div>
                                    <Input onChange={onChange} value={this.state.end} name="end" type="datetime-local" />
                                </div>
                                <Button onClick={bookRoom} style={{ margin: "auto", marginTop: "1rem" }} color="success"> 
                                    BOOK ROOM
                                </Button>
                            </Card>
                            <Card style={{ padding: "1rem 2rem", margin: "0rem 1rem" }}>
                                <h3>VIEW ROOM AVAILABILITY</h3>
                                <div style={{ display: "flex", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                                    <div style={{ width: "200px", alignSelf: "center", fontWeight: "bold" }}>Room No.:</div>
                                    <Input onChange={onChange} value={this.state.selectedRoom} name="selectedRoom" type="select">
                                        <option value="">--SELECT ROOM --</option>
                                        <option value="F 102">F 102</option>
                                        <option value="F 103">F 103</option>
                                        <option value="F 104">F 104</option>
                                        <option value="F 105">F 105</option>
                                        <option value="F 106">F 106</option>
                                        <option value="F 107">F 107</option>
                                        <option value="F 108">F 108</option>
                                        <option value="F 109">F 109</option>
                                    </Input>
                                </div>
                                <Button onClick={checkAvailability} style={{ margin: "auto", marginTop: "1rem" }} color="success">
                                    CHECK AVAILABILITY
                                </Button>
                                {this.state.roomStatus &&
                                    <div>
                                        <h3 style={{ textAlign: "center", marginTop: "0rem" }}>
                                            TIME SLOTS BOOKED
                                        </h3>
                                        {this.state.roomStatus ? this.state.roomStatus.map(eachBooking => {
                                            return (
                                                <div style={{ textAlign: "center" }}>
                                                    {eachBooking.start} - {eachBooking.end}
                                                </div>
                                            )
                                        }) : <div style={{ color: "grey", textAlign: "center" }}>
                                            The room is available
                                        </div>}
                                    </div>}
                            </Card>
                        </div>
                        <Card style={{ display: "flex", justifyContent: "center", padding: "1rem 2rem", margin: "auto", width: "600px" }}>
                            <h3 style={{ textAlign: "center" }}>YOUR BOOKINGS</h3>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                <div>ROOM NAME</div>
                                <div>TIME</div>
                                <div>ACTION</div>
                            </div>
                            {!this.state.bookings ? <div style={{ color: "grey", textAlign: "center" }}>
                                There are no bookings
                            </div> : <div>
                                {this.state.bookings.map(eachBooking => {
                                    return (
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"1rem" }}>
                                            <div>{eachBooking.roomName}</div>
                                            <div>{eachBooking.start} - {eachBooking.end}</div>
                                            <i onClick={() => deleteBooking(eachBooking)} className="fa fa-times"></i>
                                        </div>
                                    )
                                })}
                            </div>}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Facilities