import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import React from 'react';
import Link from 'next/link';
import { deleteSingleMember } from '../api/teamData';

function TeamCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="teamcard" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img className="imageCard" variant="top" src={memberObj.img} alt="" style={{ height: '100px', width: '100px' }} />
        <Card.Title> Name: {memberObj.name}</Card.Title>
        <Card.Title> Race: {memberObj.Race}</Card.Title>
        <Card.Title>Class: {memberObj.Class}</Card.Title>
        <Card.Title>Role: {memberObj.role}</Card.Title>
        <Card.Title>Str: {memberObj.Str}</Card.Title>
        <Card.Title>Dex: {memberObj.Dex}</Card.Title>
        <Card.Title>Con: {memberObj.Con}</Card.Title>
        <Card.Title>Int: {memberObj.Int}</Card.Title>
        <Card.Title>Wis: {memberObj.Wis}</Card.Title>
        <Card.Title>Cha: {memberObj.Cha}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/members/edit/${memberObj.firebaseKey}`} passHref>
          <Button className="MemCard-btn" variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2 MemCard-btn">
          DELETE
        </Button>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  memberObj: PropTypes.shape({
    img: PropTypes.string,
    name: PropTypes.string,
    Str: PropTypes.number,
    Dex: PropTypes.number,
    Con: PropTypes.number,
    Int: PropTypes.number,
    Wis: PropTypes.number,
    Cha: PropTypes.number,
    Race: PropTypes.string,
    Class: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
