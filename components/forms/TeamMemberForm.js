import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/teamData';

const initialState = {
  name: '',
  role: '',
  Wis: '',
  Str: '',
  Race: '',
  Int: '',
  Dex: '',
  Con: '',
  Cha: '',
  Class: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput2" label="Member Portrait" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="img"
          value={formInput.img}
          onChange={handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Member Race" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Member Race"
          name="Race"
          value={formInput.Race}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Member Class" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Member Race"
          name="Class"
          value={formInput.Class}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Member Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Member Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Strength" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Strength"
          name="Str"
          value={formInput.Str}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Dexterity" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Dexterity"
          name="Dex"
          value={formInput.Dex}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Constitution " className="mb-3">
        <Form.Control
          type="number"
          placeholder="Constitution"
          name="Con"
          value={formInput.Con}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Intelligence " className="mb-3">
        <Form.Control
          type="number"
          placeholder="Intelligence"
          name="Int"
          value={formInput.Int}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label=" Wisdom" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Wisdom"
          name="Wis"
          value={formInput.Wis}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label=" Charisma " className="mb-3">
        <Form.Control
          type="number"
          placeholder="Charisma"
          name="Cha"
          value={formInput.Cha}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    Str: PropTypes.string,
    Dex: PropTypes.string,
    Con: PropTypes.string,
    Int: PropTypes.string,
    Wis: PropTypes.string,
    Cha: PropTypes.string,
    name: PropTypes.string,
    Race: PropTypes.string,
    role: PropTypes.string,
    stats: PropTypes.bool,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
