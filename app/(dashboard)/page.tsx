import { AreaChartFour } from "@/components/chart/area/areaChartThree";
import { AreaChartOne } from "@/components/chart/area/areaChart";
import { PieChartOne } from "@/components/chart/pie/pieChart1";
import RevenueUpdates from "@/components/chart/revenueUpdate/revenue";
import InfoCard from "@/components/home/cards/infoCard/infoCard";
import WelcomeCard from "@/components/home/cards/welcomeCard/welcomeCard";
import Weather from "@/components/home/wegets/weather/weather";
import Cards from "@/components/shared/cards";
import { AreaChartOne2 } from "@/components/chart/area/areaChart2";
import WeeklyReport from "@/components/chart/weeklyExpence/weeklyReport";
import TopSellingProducts from "@/components/demo/topSellingProduct";
import Bitcoin from "@/components/home/bitcoin/bitcoin";
import EmployeeSalaryChart from "@/components/demo/employSalery";

const Home = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pb-10 space-y-10 p-3">
      <div className="flex justify-center lg:justify-between items-center">
        <WelcomeCard />
        {/* <Bitcoin /> */}
        <Weather />
      </div>

      <div>
        <Cards />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-2 ">
        <WeeklyReport />
        <TopSellingProducts />
      </div>

      <div className="flex justify-around items-center flex-wrap space-y-5 xl:space-y-0 overflow-hidden">
        <AreaChartOne className="xl:h-[450px]" />
        <div className="w-full xl:w-[755px] flex flex-col md:flex-row gap-5">
          <AreaChartOne2 className="xl:h-[450px]" />
          {/* <AreaChartTwo className=" xl:max-w-[380px] flex-grow xl:flex-grow-0" /> */}
          <div className="min-w-[345px]">
            <PieChartOne className="h-[450px] " />
          </div>
        </div>
      </div>
      <div>{/* <RevenueUpdates /> */}</div>
      <div>
        <AreaChartFour />
        <EmployeeSalaryChart />
      </div>
      {/* <InfoCard /> */}
    </div>
  );
};

export default Home;
