import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TypographyH1, TypographyLarge } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import mockup from "../../public/mockup.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="relative text-white">
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <MaxWidthWrapper className="">
        <Header />
        <div className="">
          <TypographyH1 className="py-20">
            {/* Having Difficulty to <span className="text-red-400">LOOK</span> for solution in Official Documentations? */}
            Finding It <span className="text-red-400">Hard</span> to{" "}
            <span className="text-red-400">Extract</span> Relevant Information{" "}
            <br /> from Documentations?
          </TypographyH1>
        </div>

        <TypographyLarge className="px-10 text-2xl">
          Introducing <span className="text-4xl text-red-400">Clarity AI</span>{" "}
          to navigate through endless pages.
        </TypographyLarge>

        <div className="py-10 z-10">
          <Link href="/ask">
            {/* <Button className="">Let&apos;s Start</Button> */}
            <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-neutral-200 px-6 font-medium text-neutral-950">
              <span>Let&apos;s Start</span>
              <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </button>
          </Link>
        </div>

        <div className="-mt-32 z-0">
          <Image src={mockup} alt="mockup" sizes="100rem" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
