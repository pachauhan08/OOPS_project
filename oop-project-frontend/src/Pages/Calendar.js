import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'
import { Modal, ModalBody, ModalHeader, Input, ModalFooter, Button } from "reactstrap"

export default class Calendar extends React.Component {
    state = {
        isModalOpen: false,
        title: "",
        description: "",
        start: "",
        uid: "",
        end: "",
        isEditable: true
    }
    render() {
        const onChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }
        const editEvent = () => {
            const { uid, title, description, start, end } = this.state
            axios.put(`http://localhost:8000/api/meeting/${uid}/${title}/${description}/${start}/${end}`).then(user => {
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        const deleteEvent = () => {
            const { uid } = this.state
            axios.delete(`http://localhost:8000/api/delete-meetings/${uid}`).then(user => {
                window.location.reload()
            }).catch(err => {
                console.log(err.message);
            })
        }
        return (
            <div className='demo-app'>
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev, next, today',
                            center: 'title',
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        initialView='timeGridDay'
                        events={this.props.currentEvents}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    />
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={() => { this.setState({ isModalOpen: false }) }}>
                    <ModalHeader toggle={() => { this.setState({ isModalOpen: false }) }}>EDIT EVENT</ModalHeader>
                    <ModalBody>
                        <Input onChange={onChange} value={this.state.title} placeholder="TITLE" name="title" style={{ marginBottom: "1rem" }} type="text" />
                        <Input onChange={onChange} value={this.state.description} placeholder="DESCRIPTION" name="description" style={{ marginBottom: "1rem" }} type="textarea" />
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <Input onChange={onChange} value={this.state.start} placeholder="Date" name="start" type="datetime-local" />
                            <Input onChange={onChange} value={this.state.end} placeholder="Time" name="end" type="datetime-local" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={editEvent} disabled={!this.state.isEditable} color="success">
                            EDIT
                        </Button>
                        <Button onClick={deleteEvent} disabled={!this.state.isEditable} color="danger">
                            DELETE EVENT
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    /*
    Meet edit by default is true 
    */
    handleEventClick = (clickInfo) => {
        axios.get(`http://localhost:8000/api/meeting/${clickInfo.event.title}`).then(user => {
            if (user.data.senderUid !== JSON.parse(localStorage.getItem("userDetails")).uid)
                this.setState({ isEditable: false }) 
            this.setState({ title: user.data.title, description: user.data.description, start: user.data.start, end: user.data.end, uid: user.data.uid })
            this.setState({ isModalOpen: true })
        }).catch(err => {
            console.log(err.message);
        })
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <div>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </div>
    )
}
