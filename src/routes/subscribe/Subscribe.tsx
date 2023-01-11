import { useNavigate } from 'react-router-dom';
import './Subscribe.styles.scss';

const Subscribe = () => {
  const navigate = useNavigate();
  return (
    <div className='subscribe'>
      <h2>Subscribe to the Owner's Videos</h2>
      <div className='subscribe-button'>
        <button>Subscribe</button>
      </div>
      <div className='back-button'>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  )
}

export default Subscribe;