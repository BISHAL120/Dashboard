import { AreaChartFour } from "@/components/chart/area/areaChartThree";
import { AreaChartOne } from "@/components/chart/area/areaChart";
import { PieChartOne } from "@/components/chart/pie/pieChart1";
import WelcomeCard from "@/components/home/cards/welcomeCard/welcomeCard";
// import Weather from "@/components/home/wegets/weather/weather";
import Cards from "@/components/shared/cards";
import { DailyReport } from "@/components/chart/area/24HourReport";
import WeeklyReport from "@/components/chart/weeklyExpence/weeklyReport";
import TopSellingProducts from "@/components/demo/topSellingProduct";
// import Bitcoin from "@/components/home/bitcoin/bitcoin";
import EmployeeSalaryChart from "@/components/demo/employSalery";
import MiniTodo from "@/components/todo/miniTodo";

const Home = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pb-10 space-y-10 p-3">
      <WelcomeCard />
      <div className="flex flex-col gap-3 lg:flex-row justify-center lg:justify-between items-start">
        {/* <Bitcoin /> */}
        {/* <Weather /> */}

        <WeeklyReport className="lg:w-full" />
        <MiniTodo />
      </div>

      <div>
        <Cards />
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-2 ">
        <AreaChartOne className="m-1" />
        <TopSellingProducts />
      </div>

      <div className="flex justify-around items-center flex-wrap space-y-5 xl:space-y-0 overflow-hidden">
        <div className="w-full">
          <DailyReport className="" />
          {/* <div className="min-w-[345px]">
            <PieChartOne className="h-[450px] " />
          </div> */}
        </div>
      </div>
      <div>
        <AreaChartFour />
        <EmployeeSalaryChart />
      </div>
      {/* <InfoCard /> */}
    </div>
  );
};

export default Home;
