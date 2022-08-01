import React, {useContext} from 'react'
import { ListGroup } from 'react-bootstrap'
import { SocketContext } from '../Context'

function Contacts() {


    const {contacts} = useContext(SocketContext)

  return (
    <ListGroup variant="flush">
    {contacts.map((contact, idx) => (
      <ListGroup.Item key={idx}>
        {contact.name}
      </ListGroup.Item>
    ))}
  </ListGroup>
  )
}

export default Contacts