import { FaMapMarkedAlt } from "react-icons/fa";
import DayOneItinerary from "../../components/Days";

const TripMap = ({ data }) => {
  return (
    <div>
      {/* <h2 className="text-xl font-bold text-[#18283E] flex items-center gap-2">
        <FaMapMarkedAlt className="text-blue-600" /> แผนที่การเดินทาง
      </h2>
      <p className="text-gray-700 mt-2">แสดงเส้นทางและจุดหมายของทริปนี้!</p>
      <div className="mt-4">
        <img src="https://via.placeholder.com/600x300" alt="แผนที่" className="rounded-lg" />
      </div> */}
      <DayOneItinerary countDays={data} />
    </div>
  );
};

export default TripMap;
