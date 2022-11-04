import { FaChartBar } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import { BsClipboardPlus } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    link: "/",
    name: "stats",
    icon: <FaChartBar />,
  },
  {
    id: 2,
    link: "/all-jobs",
    name: "all jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    link: "/add-job",
    name: "add job",
    icon: <BsClipboardPlus />,
  },
  {
    id: 4,
    link: "/profile",
    name: "profile",
    icon: <ImProfile />,
  },
];
export default links;
