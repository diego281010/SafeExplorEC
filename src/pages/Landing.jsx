import Statistics from "../components/statistics/Statistics";
import Main from "../components/main/Main";
import ZonePreview from "../components/main/ZonePreview";

function Landing() {
  return (
    <div className="landing-container">
      <Main />
      <Statistics />
      <ZonePreview />
    </div>
  );
}

export default Landing;
