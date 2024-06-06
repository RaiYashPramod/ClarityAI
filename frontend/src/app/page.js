import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TypographyH1, TypographyLarge } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import mockup from '../../public/mockup.png'
import Image from "next/image";
import { cn } from "@/lib/utils";


export default function Home() {
  return (
    <section className="">
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

        <TypographyLarge className="px-10 text-xl">
          Introducing <span className="text-4xl text-red-400">Clarity AI</span>{" "}
          to navigate through endless pages.
        </TypographyLarge>

        <div className="py-10">
          <Link href="/ask">
            <Button className="">Let&apos;s Start</Button>
          </Link>
        </div>

        <div className="-mt-32 -z-10 ">
          <Image src={mockup} alt="mockup" sizes="100rem" />  
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
