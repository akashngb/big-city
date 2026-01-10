import { WeatherWidget } from "@/components/bento/widgets/weather";
import { BentoGrid } from "@/components/bento/grid";

const widgets = [
  {
    id: 1,
    title: "Weather",
    color: "bg-card",
    element: <WeatherWidget />,
    width: 2,
    height: 2
  }
]
export default function Home() {
  return (
    <div>
      <BentoGrid items={widgets} gridCols={3} classNames={{}} />
      <WeatherWidget />
    </div>
  );
}
