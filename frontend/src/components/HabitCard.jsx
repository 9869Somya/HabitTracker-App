import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const HabitCard = ({ habit, streakCount, deleteHabit }) => {
  const { name, _id, frequency } = habit;

  const [showModal, setShowModal] = useState(false);
  const [newFrequency, setNewFrequency] = useState(frequency);
  const [reloadPage, setReloadPage] = useState(false);

  const handleClose = async () => {
    setShowModal(false);
  };
  const handleSave = async () => {
    setShowModal(false);
    const res = await habitApiService.updateHabit(_id, {
      frequency: newFrequency,
    });
    if (res.status) {
      console.log("Habit frequency updated successfully");
      setReloadPage(true);
    } else {
      console.error("Failed to update habit frequency");
    }
  };

  const handleShow = () => setShowModal(true);

  const handleFrequencyChange = (e) => {
    setNewFrequency(e.target.value);
  };

  const handleDelete = () => {
    deleteHabit(_id);
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  return (
    <div className="habit-card">
      <div
        className={`habit-info ${
          parseInt(streakCount) === parseInt(frequency) ? "completed" : ""
        }`}
      >
        <h3>
          {name} - {frequency}
        </h3>
        {streakCount !== undefined && (
          <p>
            Streak Count: {streakCount}/{frequency}
          </p>
        )}
        {parseInt(streakCount) === parseInt(frequency) && (
          <p>Congratulations! You've completed this habit!</p>
        )}
      </div>

      {parseInt(streakCount) !== parseInt(frequency) && (
        <div className="habit-actions">
          <Link to="#" onClick={handleShow}>
            Update
          </Link>
          <Link to={`habit/streakLogs/${_id}`}>View</Link>
          <Link to="" onClick={handleDelete}>
            Delete
          </Link>
        </div>
      )}

      {parseInt(streakCount) === parseInt(frequency) && (
        <div className="habit-actions">
          <Link to="#" onClick={handleDelete}>
            Delete
          </Link>
        </div>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHabitName">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter habit name"
                defaultValue={name}
              />
            </Form.Group>
            <Form.Group controlId="formHabitFrequency">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter frequency"
                value={newFrequency}
                onChange={handleFrequencyChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HabitCard;
