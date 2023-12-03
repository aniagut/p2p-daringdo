import { Join } from "../components/Join";
import DaringDoKick from "../assets/daring_do_petting_a_kitten_by_martinnus1_d70naxf.png";

export const Home = () => {
  return (
    <div className="App flex flex-col items-center justify-center w-screen h-screen">
      <img className="max-h-80 m-4" src={DaringDoKick} alt="DaringDo" />
      <Join />
    </div>
  );
};
