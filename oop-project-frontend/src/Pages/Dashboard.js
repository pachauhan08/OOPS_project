import React from "react"
import SideBar from "./SideBar"
import { InputGroup, Input, InputGroupText, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap"
import Calendar from "./Calendar"
import axios from "axios"

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            searchedUser: "",
            allUsers: [],
            addedUsers: [],
            currentEvents: [],
            otherEvents: [],
            isModalOpen: false, // modal is pop up
            title: "",
            description: "",
            start: "",
            end: "",
            isUsers: false,
            users: "",
            receiverUid: ""
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8000/all-user/auth").then(user => {
            this.setState({ allUsers: user.data })
        }).catch(err => {
            console.log(err.message);
        })
        axios.get(`http://localhost:8000/api/meetings/${JSON.parse(localStorage.getItem("userDetails")).uid}`).then(user => {
            this.setState({ currentEvents: user.data }, () => {
                const allAddedUsers = JSON.parse(localStorage.getItem("addedUsers"))
                var allEvents = this.state.currentEvents
                if (allAddedUsers) {
                allAddedUsers.map(eachUser => {  //iterating through all array elements and creating a new array
                    axios.get(`http://localhost:8000/api/meetings/${eachUser.uid}`).then(user => {
                        user.data.map(eachUser => allEvents.push(eachUser))
                        this.setState({ currentEvents: allEvents })
                    }).catch(err => {
                        console.log(err.message);
                    })
                })}
            })
        }).catch(err => {
            console.log(err.message);
        })
    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
            if (name === "users")
                this.setState({ isUsers: true })
        }
        var filteredArray = this.state.allUsers.filter((item) =>  //searching user
            item.name.toLowerCase().includes(this.state.searchedUser.toLowerCase())
        )
        var filteredArray1 = this.state.allUsers.filter((item) =>
            item.name.toLowerCase().includes(this.state.users.toLowerCase())
        )
        const addUser = (user) => {
            var temporaryArray = []
            if (JSON.parse(localStorage.getItem("addedUsers")))
                temporaryArray = JSON.parse(localStorage.getItem("addedUsers"))
            temporaryArray.push(user)
            localStorage.setItem("addedUsers", JSON.stringify(temporaryArray))
            window.location.reload()
        }
        const removeUser = (user) => {
            let tempArray = JSON.parse(localStorage.getItem("addedUsers")).filter((obj) => obj !== user);
            localStorage.setItem("addedUsers", JSON.stringify(tempArray))
        }
        const createEvent = () => {
            const data = {
                title: this.state.title,
                description: this.state.description,
                senderName: JSON.parse(localStorage.getItem("userDetails")).name,
                pending: false,
                backgroundColor: JSON.parse(localStorage.getItem("userDetails")).color,
                senderUid: JSON.parse(localStorage.getItem("userDetails")).uid,
                receiverUid: this.state.receiverUid,
                start: this.state.start,
                end: this.state.end
            }
            axios.post("http://localhost:8000/api/meetings", data).then(user => {
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
                        DASHBOARD
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                        <div style={{ margin: "1rem", width: "50%" }}>
                            <Button color="success" onClick={() => { this.setState({ isModalOpen: true }) }} style={{ width: "max-content", height: "max-content", alignSelf: "center", marginBottom: "1rem" }}>
                                ADD EVENT
                            </Button>
                            <Calendar currentEvents={this.state.currentEvents} />
                        </div>
                        <div style={{ margin: "1rem", width: "50%" }}>
                            <InputGroup style={{ width: "300px" }} size="sm">
                                <Input onChange={onChange} value={this.state.searchedUser} name="searchedUser" placeholder="SEARCH USER" />
                                <InputGroupText>
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                            </InputGroup>
                            {this.state.searchedUser &&
                                <div className="dashboard-users-display">
                                    {filteredArray.map(eachUser => {
                                        return (
                                            <div onClick={() => addUser(eachUser)} className="dashboard-profile-card">
                                                <div style={{ color: "var(--black-color)" }} className="dashboard-profile-details">
                                                    <div>{eachUser.name}</div>
                                                    <div>{eachUser.role}</div>
                                                    <div>{eachUser.email}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}
                            <div>
                                {JSON.parse(localStorage.getItem("addedUsers"))?.map(eachUser => {
                                    return (
                                        <div className="dashboard-profile">
                                            <div style={{ backgroundColor: `${eachUser.color}` }} className="dashboard-profile-picture">
                                                {eachUser.name.charAt(0)}
                                            </div>
                                            <div className="dashboard-profile-details">
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>{eachUser.name}
                                                    <i onClick={() => removeUser(eachUser)} className="fa fa-times"></i></div>
                                                <div>{eachUser.role}</div>
                                                <div>{eachUser.email}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={() => { this.setState({ isModalOpen: false }) }}>
                    <ModalHeader toggle={() => { this.setState({ isModalOpen: false }) }}>ADD EVENT</ModalHeader>
                    <ModalBody>
                        <Input onChange={onChange} value={this.state.title} placeholder="TITLE" name="title" style={{ marginBottom: "1rem" }} type="text" />
                        <Input onChange={onChange} value={this.state.description} placeholder="DESCRIPTION" name="description" style={{ marginBottom: "1rem" }} type="textarea" />
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <Input onChange={onChange} value={this.state.start} placeholder="Date" name="start" type="datetime-local" />
                            <Input onChange={onChange} value={this.state.end} placeholder="Time" name="end" type="datetime-local" />
                        </div>
                        <Input onChange={onChange} value={this.state.users} placeholder="Add other users" style={{ marginBottom: "1rem" }} name="users" type="text" />
                        {this.state.isUsers &&
                            <div className="dashboard-users-display">
                                {filteredArray1.map(eachUser => {
                                    return (
                                        <div style={{ paddingLeft: "0.5rem" }} className="dashboard-profile-card">
                                            <div onClick={() => this.setState({ users: eachUser.name, isUsers: false, receiverUid: eachUser.uid })} style={{ color: "var(--black-color)" }} className="dashboard-profile-details">
                                                <div>{eachUser.name}</div>
                                                <div>{eachUser.email}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={createEvent} color="success">
                            ADD
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Dashboard