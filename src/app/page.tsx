import { Icon } from "@/components/svg/Icon";

const HomePage = () => {
  return (
    <div>
      <h1 className="px-2 py-3">Welcome to the Home Page</h1>
      <p>This is the main content of the home page.</p>

      <div>
        <Icon svg="home" width={"100px"} height={"100px"} fillColor="#000" />

      </div>
    </div>
  );
}

export default HomePage;