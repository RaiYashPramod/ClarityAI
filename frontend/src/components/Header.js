import MaxWidthWrapper from "./MaxWidthWrapper";
import { TypographyLarge } from "./ui/Typography";

const Header = () => {
  return (
    <MaxWidthWrapper className="flex flex-row items-center justify-between pt-20 md:px-0">
      <TypographyLarge className="text-red-400">Clarity AI</TypographyLarge>      
        <div className="flex flex-col items-start gap-y-1 xl:flex-row xl:items-center xl:gap-x-1 xl:w-fit">
          <TypographyLarge className="w-fit flex-nowrap whitespace-nowrap font-mono-regular">
            Made by{" "}
          </TypographyLarge>
          <a
            className="font-mono-bold relative overflow-y-hidden group h-fit text-red-400"
            target="_blank"
            href="https://www.linkedin.com/in/raiyashpramodanita"
          >
            <TypographyLarge className="flex group-hover:-translate-y-5 group-hover:opacity-0 transition-all ease-in-out-circ duration-500">
              Rai Yash Pramod Anita
            </TypographyLarge>
            <TypographyLarge className="absolute inset-0 group-hover:translate-y-0 translate-y-5 xl:translate-y-8 transition-all ease-in-out-circ duration-500 no-underline overflow-hidden flex-nowrap whitespace-nowrap">
              RaiYashPramodAnita:)
            </TypographyLarge>
          </a>
        </div>
      
    </MaxWidthWrapper>
  );
};

export default Header;
