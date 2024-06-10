import { TypographyLarge, TypographyLarge1 } from "./ui/Typography";

const Header = () => {
  return (
    <section className="flex flex-row items-center justify-between w-full pt-20 px-5 md:px-0">
      <TypographyLarge className="text-indigo-400">Clarity AI</TypographyLarge>      
        <div className="flex flex-col items-start gap-y-1 xl:flex-row xl:items-center xl:gap-x-1 xl:w-fit">
          <TypographyLarge className="w-fit flex-nowrap whitespace-nowrap font-mono-regular">
            Made by{" "}
          </TypographyLarge>
          <a
            className="font-mono-bold relative overflow-y-hidden group h-fit text-indigo-400"
            target="_blank"
            href="https://www.linkedin.com/in/raiyashpramodanita"
          >
            <TypographyLarge className="flex group-hover:-translate-y-5 group-hover:opacity-0 transition-all ease-in-out-circ duration-500">
              Rai Yash Pramod Anita
            </TypographyLarge>
            <TypographyLarge1 className="absolute inset-0 group-hover:translate-y-0 translate-y-5 xl:translate-y-8 transition-all ease-in-out-circ duration-500 underline overflow-hidden flex-nowrap whitespace-nowrap">
              RaiYashPramodAnita:)
            </TypographyLarge1>
          </a>
        </div>
      
    </section>
  );
};

export default Header;
