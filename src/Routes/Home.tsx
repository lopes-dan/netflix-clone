import Carousel from "../components/Carousel/Carousel";
import MainVideo from '../components/MainVideo/MainVideo';
import { useParams } from 'react-router-dom';

interface Props {
  title: string
}


const Home: React.FC<Props> = ({ title }) => {

  const { id } = useParams();

  return (
    <>
      <div data-testid="homeWrapper" style={{overflow: "hidden", position:"relative"}}>
        <MainVideo title={title} />

        <Carousel data-testid="carousel" />
      </div>
    </>
  );
};

export default Home;