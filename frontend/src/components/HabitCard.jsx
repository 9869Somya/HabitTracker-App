import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import habitApiService from "../ApiService/HabitApiService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../contexts/AuthContext";

const HabitCard = ({ habit, streakCount, deleteHabit }) => {
  const { name, _id, frequency } = habit;
  const authContext = useAuth();
  const { user } = authContext;
  const token = localStorage.getItem("pptoken");

  const [showModal, setShowModal] = useState(false);
  const [newFrequency, setNewFrequency] = useState(frequency);
  const [reloadPage, setReloadPage] = useState(false);

  const handleClose = async () => {
    setShowModal(false);
  };
  const handleSave = async () => {
    setShowModal(false);
    const res = await habitApiService.updateHabit(
      _id,
      {
        frequency: newFrequency,
      },
      token
    );
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
    deleteHabit(_id, token);
  };

  useEffect(() => {
    if (reloadPage) {
      window.location.reload();
    }
  }, [reloadPage]);

  return (
    <div
      className="habit-card"
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "5px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
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
          <p
            style={{
              color: "green",
              textDecoration: "none",
              // fontWeight: "bold",
            }}
          >
            Congratulations! Habit completed!
          </p>
        )}
      </div>

      {parseInt(streakCount) !== parseInt(frequency) && (
        <div className="habit-actions">
          <Link
            to="#"
            onClick={handleShow}
            style={{
              color: "orange",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Update
          </Link>
          <Link
            to={`/habits/habit/streakLogs/${_id}`}
            style={{
              color: "blue",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            View
          </Link>
          <Link
            to=""
            onClick={handleDelete}
            style={{ color: "red", textDecoration: "none", fontWeight: "bold" }}
          >
            Delete
          </Link>
        </div>
      )}

      {parseInt(streakCount) === parseInt(frequency) && (
        <div className="habit-actions">
          <Link
            to="#"
            onClick={handleDelete}
            style={{
              color: "red",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
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
                style={{ backgroundColor: "white", color: "black" }}
              />
            </Form.Group>
            <Form.Group controlId="formHabitFrequency">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter frequency"
                value={newFrequency}
                onChange={handleFrequencyChange}
                style={{ backgroundColor: "white", color: "black" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ backgroundColor: "white", color: "black" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            style={{ backgroundColor: "primary", color: "white" }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HabitCard;
