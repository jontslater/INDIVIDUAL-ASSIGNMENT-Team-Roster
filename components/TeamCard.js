import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { deleteSingleMember } from '../api/teamData';

function TeamCard({ memberObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title> Name: {memberObj.name}</Card.Title>
        <Card.Title> Race: {memberObj.Race}</Card.Title>
        <Card.Title>Class: {memberObj.Class}</Card.Title>
        <Card.Title>Role: {memberObj.role}</Card.Title>
        <Card.Title>Stats: {memberObj.stats}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/members/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
          DELETE
        </Button>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    stats: PropTypes.string,
    Race: PropTypes.string,
    Class: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
