import Image from "next/image";
import Link from "next/link";

interface PortfolioBoxProps {
  data: {
    id: number;
    title: string;
    image: string;
    urlGithub: string;
    urlDemo: string;
  };
}

const PortfolioBox = (props: PortfolioBoxProps) => {
  const { data } = props;
  const { id, title, image, urlDemo, urlGithub } = data;

  return (
    <div
      key={id}
      className="flex flex-col h-full p-4 border border-teal-50 rounded-xl"
    >
      <h3 className="mb-4 text-xl">{title}</h3>

      <div className="relative w-full overflow-hidden rounded-2xl h-28 md:h-32 bg-slate-950 p-2 mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex gap-5 mt-auto justify-between">
        <Link
          href={urlGithub}
          target="_blank"
          className="p-2 transition duration-150 rounded-lg bg-slate-500 hover:bg-slate-500/80"
        >
          Github
        </Link>

        <Link
          href={urlDemo}
          target="_blank"
          className="p-2 transition duration-150 rounded-lg bg-secondary hover:bg-secondary/80"
        >
          Live demo
        </Link>
      </div>
    </div>
  );
};

export default PortfolioBox;
