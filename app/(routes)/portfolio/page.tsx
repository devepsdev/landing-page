import { dataPortfolio } from "@/data";

import AvatarPortfolio from "@/components/avatar-portfolio";
import CircleImage from "@/components/circle-image";
import TransitionPage from "@/components/transition-page";
import ContainerPage from "@/components/container-page";
import PortfolioBox from "@/components/portfolio-box";


const PortfolioPage = () => {

    return (
        <ContainerPage>
            <TransitionPage />
            <AvatarPortfolio />
            <CircleImage />
            <div className="flex flex-col justify-center h-full">
                <h1 className="text-2xl leading-tight text-center md:text-4xl">Mis últimos <span className="font-bold text-secondary">trabajos realizados</span></h1>
                <p className="mt-3 text-center text-gray-300 md:mb-4">Proyectos desplegados y en marcha, con su código en GitHub.</p>

                <div className="relative z-10 grid w-full max-w-6xl gap-6 mx-auto mt-6 md:grid-cols-2">
                    {dataPortfolio.map((data) => (
                        <PortfolioBox key={data.id} data={data} />
                    ))}
                </div>
            </div>
        </ContainerPage>
    );
}

export default PortfolioPage;