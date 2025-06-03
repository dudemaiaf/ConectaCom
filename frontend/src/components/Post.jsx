import '../App.css';
import { Card } from 'primereact/card';

const Post = ({ username, content }) => {
  return (
    <Card
      title={`@${username}`}
      className="mb-3"
      style={{
        marginBottom: '1rem',
        border: '1px solid #ddd',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      }}
    >
      <p>{content}</p>
    </Card>
  );
};

export default Post;
  