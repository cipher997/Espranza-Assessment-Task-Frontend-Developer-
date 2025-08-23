import SearchForm from "../../components/SearchForm/SearchForm"
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Hotel Finder</h1>
      <SearchForm />
    </div>
  );
}
