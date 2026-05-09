import { ExternalLink, GitPullRequestArrow, Heart, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import HeroImage from "./components/hero-image";

export const Home = () => {
  return (
    <main className="px-16">
      <div className="mt-8 mb-20">
        <HeroImage />
        <div className="mx-[10%] text-center">
          <h1 className="text-8xl font-bold mb-6">
            Your development
            <br />
            super toolbox
          </h1>
          <p className="text-gray-500 text-xl mb-20">
            All-in-one toolkit for development to make your day easier.
            <br />
            Test, inspect, and simplify everyday tasks.
          </p>
        </div>
        <div className="flex justify-center">
          <Button size="lg" className="mx-auto">
            <ExternalLink />
            <span>Try rzrblade</span>
          </Button>
        </div>
      </div>
      <div>
        <div className="text-center text-2xl font-bold">Why rzrblade?</div>
        <div className="flex gap-2 mt-4">
          <Card className="p-6 w-full">
            <CardTitle className="flex items-center gap-2">
              <span>Totatally Free</span>
              <Heart width={15} height={15} />
            </CardTitle>
            <CardDescription>
              Yep! You heard that right, it is free and and it always be. This
              is our commitment from the start, to make rzrblade free to use.
            </CardDescription>
          </Card>
          <Card className="p-6 w-full">
            <CardTitle className="flex items-center gap-2">
              <span>Open Source</span>
              <GitPullRequestArrow width={15} height={15} />
            </CardTitle>
            <CardDescription>
              Made for devs, by devs. Fork it, improve it, and let's build
              something great, together.
            </CardDescription>
          </Card>
          <Card className="p-6 w-full">
            <CardTitle className="flex items-center gap-2">
              <span>Robust and Constantly Maintained</span>
              <Wrench width={15} height={15} />
            </CardTitle>
            <CardDescription>
              Always up to date, polished, and ready to help. We also try to
              make the tools as robust as possible.
            </CardDescription>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
