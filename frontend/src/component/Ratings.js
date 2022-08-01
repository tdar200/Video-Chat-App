import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Modal, Form, Button } from "react-bootstrap";

function Ratings(props) {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [hover, setHover] = useState(null);


  useEffect(() => {

    


  }, [])


  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Ratings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Please Rate this session</Form.Label>

            {[...Array(5)].map((star, idx) => {
              const ratingValue = idx + 1;

              return (
                <label>
                  <input
                    className='ratingInput'
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className='star'
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={100}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </Form.Group>

          <Form.Group>
            <Form.Label>Leave a feedback for the session </Form.Label>

            <textarea
              class='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
              onChange={(e) => setFeedback(e.target.value)}
              value={feedback}></textarea>
          </Form.Group>

          <Button variant='success' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Ratings;
