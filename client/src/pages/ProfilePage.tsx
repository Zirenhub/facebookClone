import { useParams } from 'react-router-dom';

function ProfilePage() {
  const { id } = useParams();

  return (
    <div>
      <p>Profile Page</p>
    </div>
  );
}

export default ProfilePage;
