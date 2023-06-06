import AuthShowcase from "./AuthShowcase";

const Sidebar = () => {
  return (
    <div className="fixed flex h-screen w-52 justify-end border-r border-white/10 font-medium">
      <ul className="m-4 flex flex-col gap-6 text-lg">
        <li>
          <a href="#"></a>Home
        </li>
        <li>
          <a href="#"></a>Messages
        </li>
        <li>
          <a href="#"></a>Profile
        </li>
        <li>
          <a href="#"></a>Likes
        </li>
        <li>
          <AuthShowcase />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
