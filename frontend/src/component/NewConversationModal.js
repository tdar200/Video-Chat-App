import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { SocketContext } from "../Context";

function NewConversationModal({closeModal}) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const { contacts, createConversation } = useContext(SocketContext);

  console.log("contacts" , contacts)
  console.log(selectedContactIds, "selectedContactsId")
  function handleSubmit(e) {
    e.preventDefault();

    createConversation(selectedContactIds);
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => {

            console.log("contactification", contact)

           return <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
})}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;
