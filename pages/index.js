import { useEffect, useState } from 'react';
import { getTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';

function Home() {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const getTheTeam = () => {
    getTeam(user.uid).then(setTeam);
  };

  useEffect(() => {
    getTheTeam();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {team.map((member) => (
          <TeamCard key={member.firebaseKey} memberObj={member} onUpdate={getTheTeam} />
        ))}
      </div>

    </div>
  );
}

export default Home;
