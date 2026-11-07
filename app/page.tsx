import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen m-5">
      <div className="md:grid grid-cols-2">
        <div>
          <h1 className="text-4xl text-green-400 font-bold">Note Hub</h1>
          <h2 className="text-2xl text-green-300">Capture your thoughts...</h2>
          <p className="text-justify">Photosynthesis is the fundamental biological process where green plants, algae, and some bacteria convert light energy into chemical energy. This process serves as the primary energy source for nearly all life on Earth by generating oxygen and producing organic compounds like glucose.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex culpa atque ratione doloremque placeat quod, consequuntur perspiciatis excepturi dolores fugit, itaque incidunt a nihil doloribus explicabo laudantium cupiditate minima unde.
          </p>
          <div className="my-5"><Link href={'/login'} className='bg-green-500 text-white px-3 py-2 rounded-2xl'>Let's start</Link></div>
        </div>
        <div>
          <Image width={400} height={400} src={'/landing.gif'} alt="Landing page"/>
        </div>
      </div>
    </div>
  );
}
