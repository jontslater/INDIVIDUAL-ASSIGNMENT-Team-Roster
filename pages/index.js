import { useEffect, useState } from 'react';
import { getTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Home() {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [query, setQuery] = useState('');

  const filteredMembers = team.filter((member) => member.name.toLowerCase().includes(query.toLowerCase())
  || member.Race.toLowerCase().includes(query.toLowerCase()) || member.Class.toLowerCase().includes(query.toLowerCase()) || member.role.toLowerCase().includes(query.toLowerCase()));

  const getTheTeam = () => {
    getTeam(user.uid).then(setTeam);
  };

  useEffect(() => {
    getTheTeam();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <br />
      Search:
      <input className="searchBar" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
      <br />
      <br />
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {filteredMembers.map((member) => (
            <TeamCard key={member.firebaseKey} memberObj={member} onUpdate={getTheTeam} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
