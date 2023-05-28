import React from "react";
import axios from "axios"; //calling fronend from backend 
import randomColor from "randomcolor";
import { Input, Button } from "reactstrap"
import { Navigate } from "react-router-dom"
import bcrypt from "bcryptjs" // password hashing

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      role: "Student",
      page: 2, // register page
      error: ""
    }
  }
  render() {
    const onChange = (event) => {
      const { name, value } = event.target
      this.setState({ [name]: value })
    }
    const loginSubmit = () => {
      const { username, password } = this.state
      axios.get(`http://localhost:8000/user/auth/${username}/${password}`).then(data => {
        try {
          bcrypt.compare(this.state.password, data.data.password).then(match => {
            if (match) {
              localStorage.setItem("userDetails", JSON.stringify(data.data))
              window.location.reload()
            }
            else {
              this.setState ({error: "Password incorrect"})
            }
          })
        }
        catch (err) {
          this.setState ({error: err.message})
        }
      })
    }
    const registerSubmit = async () => {
      var color = randomColor()
      const emailRegex = /@hyderabad\.bits-pilani\.ac\.in$/
      if (this.state.password !== this.state.confirmPassword)
        this.setState({ error: "The passwords are not matching. Please try again" })
      else if (!emailRegex.test(this.state.email))
        this.setState({ error: "Please enter BITS mail" })
      else {
        var hashed_password = null
        try {
          const salt = await bcrypt.genSalt()
          hashed_password = await bcrypt.hash(this.state.password, salt)
        }
        catch (err) {
          console.log(err.message);
        }
        const data = {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          role: this.state.role,
          password: hashed_password,
          phone_number: this.state.phoneNumber,
          color: color,
          admin: false
        }
        axios.post("http://localhost:8000/user/auth", data).then(user => {
          localStorage.setItem("userDetails", JSON.stringify(user.data))
          window.location.reload()
        }).catch(err => {
          console.log(err.message);
        })
      }
    }
    if (localStorage.getItem("userDetails")) return <Navigate to="/dashboard" />
    return (
      <div className="home-background">
        <div className="home-title">
          BITSCHEDULER
        </div>
        <div className="home-logo">
          {this.state.page === 1 ? "Sign in" : "Enter user information"} 
        </div>
        {this.state.page === 1 ?
          <div className="home-card">
            <div className="home-login">
              Sign In and start managing your Time!
            </div>
            <Input onChange={onChange} value={this.state.username} name="username" placeholder="USERNAME" type="text" />
            <Input onChange={onChange} value={this.state.password} name="password" placeholder="PASSWORD" type="password" style={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <div onClick={() => this.setState({ page: 2 })} className="home-new-user">
              New User?
            </div>
            {this.state.error}
            <Button onClick={loginSubmit} style={{ backgroundColor: "var(--blue-color)", color: "var(--white-color)", padding: "0.5rem 2rem", margin: "auto" }}>
              LOG IN
            </Button>
          </div> :
          <div className="home-card">
            <div className="home-login">
              REGISTER
            </div>
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="username" value={this.state.username} placeholder="USERNAME" type="text" />
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="name" value={this.state.name} placeholder="NAME" type="text" />
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="phoneNumber" value={this.state.phoneNumber} placeholder="PHONE NUMBER" type="text" />
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="email" value={this.state.email} placeholder="BITS EMAIL" type="email" />
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="password" value={this.state.password} placeholder="PASSWORD" type="password" />
            <Input style={{ marginBottom: "1rem" }} onChange={onChange} name="confirmPassword" value={this.state.confirmPassword} placeholder="CONFIRM PASSWORD" type="password" />
            <div className="home-role-toggler">
              <div onClick={() => this.setState({ role: "Student" })} className={this.state.role === "Student" ? "home-role-active" : null} style={{ width: "50%", padding: "2rem 0.5rem", textAlign: "center", cursor: "pointer", fontSize: "1.2rem" }}>
                STUDENT
              </div>
              <div onClick={() => this.setState({ role: "Staff" })} className={this.state.role === "Staff" ? "home-role-active" : null} style={{ width: "50%", padding: "2rem 0.5rem", textAlign: "center", cursor: "pointer", fontSize: "1.2rem" }}>
                STAFF
              </div>
            </div>
            {this.state.error}
            <div onClick={() => this.setState({ page: 1 })} className="home-new-user">
              Already Registered?
            </div>
            <Button onClick={registerSubmit} style={{ backgroundColor: "var(--blue-color)", color: "var(--white-color)", padding: "1rem 2rem", marginTop: "1rem", width: "max-content", margin: "auto" }}>
              REGISTER
            </Button>
          </div>}
      </div>
    )
  }
}

export default Home