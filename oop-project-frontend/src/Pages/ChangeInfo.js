import React from "react";
import SideBar from "./SideBar";
import { Button, Input } from "reactstrap"
import bcrypt from "bcryptjs"
import axios from "axios";

class ChangeInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            name: "",
            password: "",
            phoneNumber: "",
            email: "",
            currentPassword: "",
            error: ""
        }
    }
    componentDidMount() {
        const uid = JSON.parse(localStorage.getItem("userDetails")).uid
        axios.get(`http://localhost:8000/user/auth/${uid}`).then(data => {
            localStorage.setItem("userDetails", JSON.stringify(data.data))
        })
    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const onSubmit = () => {
            try {
                bcrypt.compare(this.state.currentPassword, JSON.parse(localStorage.getItem("userDetails")).password).then(match => {
                    if (!match) {
                        this.setState({ error: "Please enter correct current password to edit changes" })
                    }
                    else {
                        const uid = JSON.parse(localStorage.getItem("userDetails")).uid
                        if (this.state.username) {
                            axios.put(`http://localhost:8000/user/auth/changeUserName/${uid}/${this.state.username}`).then(data => {
                                window.location.reload()
                            })
                        }
                        if (this.state.name) {
                            axios.put(`http://localhost:8000/user/auth/changeName/${uid}/${this.state.name}`).then(data => {
                                window.location.reload()
                            })
                        }
                        if (this.state.password) {
                            var hashed_password = null
                            bcrypt.genSalt().then(salt => {
                                bcrypt.hash(this.state.password, salt).then(got => {
                                    hashed_password = got
                                    axios.put(`http://localhost:8000/user/auth/change-password/${uid}/${hashed_password}`).then(data => {
                                        window.location.reload()
                                    })
                                })

                            })
                        }
                        if (this.state.phoneNumber) {
                            axios.put(`http://localhost:8000/user/auth/changeNumber/${uid}/${this.state.phoneNumber}`).then(data => {
                                window.location.reload()
                            })
                        }
                        if (this.state.email) {
                            const emailRegex = /@hyderabad\.bits-pilani\.ac\.in$/
                            if (!emailRegex.test(this.state.email))
                                this.setState({ error: "Please enter a valid BITS mail" })
                            else {
                                axios.put(`http://localhost:8000/user/auth/changeEmail/${uid}/${this.state.email}`).then(data => {
                                    window.location.reload()
                                })
                            }
                        }
                    }
                })
            }
            catch (err) {
                console.log(err.message);
            }
        }
        return (
            <div style={{ fontWeight: "600" }}>
                <SideBar />
                <div style={{ display: "flex", justifyContent: "flex-end", marginLeft: "300px" }}>
                    <h4 style={{ marginRight: "3rem", color: "#04D76F", fontWeight: "900" }}>DASHBOARD</h4>
                </div>
                <div style={{ margin: "0px 300px", color: "var(--white-color)", backgroundColor: "var(--orange-color)", borderRadius: "1rem", padding: "1rem 2rem", width: "max-content", margin: "auto" }}>
                    <h3 style={{ marginBottom: "30px" }}>Change User Information</h3>
                    <div>User Name</div>
                    <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                        <Input style={{ marginRight: "1rem" }} disabled value={JSON.parse(localStorage.getItem("userDetails")).username} placeholder="Current User name" />
                        <Input style={{ marginRight: "1rem" }} onChange={onChange} value={this.state.username} name="username" placeholder="New User Name" />
                    </div>
                    <div>Name</div>
                    <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                        <Input style={{ marginRight: "1rem" }} disabled value={JSON.parse(localStorage.getItem("userDetails")).name} placeholder="Current User name" />
                        <Input style={{ marginRight: "1rem" }} onChange={onChange} value={this.state.name} name="name" placeholder="New Name" />
                    </div>
                    <div>Password</div>
                    <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                        <Input style={{ marginRight: "1rem" }} disabled value={"NO Password"} type="password" placeholder="Current User name" />
                        <Input style={{ marginRight: "1rem" }} onChange={onChange} value={this.state.password} name="password" placeholder="New Password" type="password" />
                    </div>
                    <div>Phone Number</div>
                    <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                        <Input style={{ marginRight: "1rem" }} disabled value={JSON.parse(localStorage.getItem("userDetails")).phone_number} placeholder="Current User name" />
                        <Input style={{ marginRight: "1rem" }} onChange={onChange} value={this.state.phoneNumber} name="phoneNumber" placeholder="New Phone Number" />
                    </div>
                    <div>Email</div>
                    <div style={{ display: "flex", marginBottom: "0.75rem" }}>
                        <Input style={{ marginRight: "1rem" }} disabled value={JSON.parse(localStorage.getItem("userDetails")).email} placeholder="Current User name" />
                        <Input style={{ marginRight: "1rem" }} onChange={onChange} value={this.state.email} name="email" placeholder="New Email" />
                    </div>
                    <div>
                        To save the changes, enter your current password: <br />
                        <Input onChange={onChange} style={{ marginTop: "1rem", marginBottom: "1rem" }} value={this.state.currentPassword} name="currentPassword" placeholder="Current Password" type="password" />
                    </div>
                    {this.state.error} <br />
                    <Button onClick={onSubmit} color="success">
                        SAVE CHANGES
                    </Button>
                </div>
            </div>
        )
    }
}

export default ChangeInfo