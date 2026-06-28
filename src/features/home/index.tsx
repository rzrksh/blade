import {
  ExternalLink,
  GitPullRequestArrow,
  Heart,
  Rocket,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/composition/footer";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import HeroImage from "./components/hero-image";

export const Home = () => {
  return (
    <>
      <main className="px-4 md:px-8 lg:px-16 max-w-[var(--max-home-width)] mx-auto mb-12">
        <div className="mt-10 md:mt-20 mb-12 md:mb-20 flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-14">
          <div className="w-full lg:flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              Development
              <br className="hidden md:block" />
              Super Toolbox
            </h1>
            <p className="text-gray-500 text-base md:text-xl mb-8 md:mb-12">
              All-in-one toolkit for development to make your day easier.
              <br className="hidden md:block" />
              Test, inspect, and simplify everyday tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/tools" className="inline-block">
                <Button
                  size="lg"
                  className="bg-gray-200 text-black hover:text-white dark:bg-lime-400 dark:hover:text-black"
                >
                  <Rocket />
                  <span>Try Blade</span>
                </Button>
              </Link>
              <Link
                href="https://github.com/rzrksh/blade"
                className="inline-block"
                target="_blank"
              >
                <Button size="lg" variant="outline">
                  <ExternalLink />
                  <span>View on Github</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:flex-1 flex justify-center">
            <HeroImage />
          </div>
        </div>
        <div className="mb-10 md:mb-14">
          <div className="text-center text-sm font-bold mb-1 dark:text-lime-400 tracking-widest">
            ALL - IN - ONE
          </div>
          <div className="text-center text-2xl md:text-4xl font-bold mb-2">
            Everything you need. In one place.
          </div>
          <div className="text-center text-sm font-light text-gray-500">
            Powerful tools for modern developers. No signup and No Ads
          </div>
        </div>
        <div>
          <div className="text-center text-xl md:text-2xl font-bold mb-4">
            Built to be free
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <Card className="p-4 md:p-6 w-full">
              <CardTitle className="flex items-center gap-2">
                <Heart width={15} height={15} className="dark:text-lime-400" />
                <span>Totally Free</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Yep! You heard that right, it is free and and it always be. This
                is our commitment from the start, to make Blade free to use.
              </CardDescription>
            </Card>
            <Card className="p-4 md:p-6 w-full">
              <CardTitle className="flex items-center gap-2">
                <GitPullRequestArrow
                  width={15}
                  height={15}
                  className="dark:text-lime-400"
                />
                <span>Open Source</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Made for devs, by devs. Fork it, improve it, and let's build
                something great, together.
              </CardDescription>
            </Card>
            <Card className="p-4 md:p-6 w-full">
              <CardTitle className="flex items-center gap-2">
                <Wrench width={15} height={15} className="dark:text-lime-400" />
                <span>Robust and Constantly Maintained</span>
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Always up to date, polished, and ready to help. We also try to
                make the tools as robust as possible.
              </CardDescription>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
