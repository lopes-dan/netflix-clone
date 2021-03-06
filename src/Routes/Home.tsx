import Carousel from "../components/Carousel/Carousel";
import MainVideo from '../components/MainVideo/MainVideo';


interface Props{
  title: string
}


const Home: React.FC<Props> = ({title}) => {

  return (
    <div data-testid="homeWrapper">
      <MainVideo  title={title} />
      <Carousel data-testid="carousel" />
    </div>
  );
};

export default Home;