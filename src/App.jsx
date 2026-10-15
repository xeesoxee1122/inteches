import Navbar from "./components/Navbar";
import heroImg from "./assets/pics/29.jpg";
import modalPlayImg from "./assets/pics/30.jpg";
import { Info, ArrowLeft } from "lucide-react";
import { FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import CardImage from "./components/CardImage";
import { photoAlbums } from "./constants/images"; // Import albums
import Aos from "aos";
import "aos/dist/aos.css";

// Import Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(-1);

  const Button = ({ children, variant, ...rest }) => {
    return (
      <button
        className={`flex items-center gap-2 p-3 px-7 rounded-lg font-semibold active:scale-90 duration-300 ease-in-out ${
          variant === "primary" ? "bg-white text-black " : ""
        } ${variant === "secondary" ? "bg-white/30 text-white" : ""}`}
        {...rest}
      >
        {children}
      </button>
    );
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen flex justify-center items-end"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="w-full max-w-screen-2xl px-5 lg:px-10 mb-[5%] flex flex-col gap-3 lg:gap-5 z-10 text-white ">
          <h1
            className="lg:text-4xl text-2xl font-bold lg:w-[50%]"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            MEMORIES OF R6
          </h1>
          <p
            className="text-sm lg:text-base lg:w-[40%]"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            R6 solidd
          </p>
          <p data-aos="fade-right" data-aos-duration="1300">
            Click "Play" to see Details
          </p>
          <div
            className="actions flex items-center gap-3"
            data-aos="fade-right"
            data-aos-duration="1400"
          >
            <Button variant={"primary"} onClick={() => setOpenModal(true)}>
              <FaPlay />
              Play
            </Button>
            <Button variant={"secondary"}>
              <Info size={20} />
              More Info
            </Button>
          </div>
        </div>
      </section>

      {/* Galeri Folder / Foto */}
      <section className="flex justify-center bg-black text-white">
        <div className="py-5 lg:py-10 flex flex-col gap-5 px-5 lg:px-10 max-w-screen-2xl w-full">
          {!selectedAlbum ? (
            /* Tampilan Level 1: Daftar Folder */
            <>
              <h3 className="font-semibold text-xl">More to Explore Of Us</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {photoAlbums.map((album, idx) => (
                  <div
                    key={album.id}
                    onClick={() => setSelectedAlbum(album)}
                    className="group rounded-lg overflow-hidden relative cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-duration={`${1000 + idx * 100}`}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-44 lg:h-56 object-cover group-hover:scale-105 duration-300 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h4 className="font-bold text-lg">{album.title}</h4>
                      <p className="text-sm text-neutral-300">{album.photos.length} Foto</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Tampilan Level 2: Isi Folder */
            <>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md mb-2"
                >
                  <ArrowLeft size={18} />
                  Kembali ke Daftar Folder
                </button>
                <h3 className="font-semibold text-sm">{selectedAlbum.title} ({selectedAlbum.photos.length} Foto)</h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-5">
                {selectedAlbum.photos.map((image, idx) => (
                  <CardImage
                    src={image.src}
                    key={idx}
                    idx={idx}
                    onClick={() => setPhotoIndex(idx)}
                  />
                ))}
              </div>

              {/* Tampilan Level 3: Lightbox Preview */}
              <Lightbox
                open={photoIndex >= 0}
                index={photoIndex}
                close={() => setPhotoIndex(-1)}
                slides={selectedAlbum.photos}
              />
            </>
          )}
        </div>
      </section>

      {/* Modal Details bawaan */}
      {/* SESUDAHNYA: */}
      <Modal setOpenModal={setOpenModal} openModal={openModal}>
        <div
          className="relative bg-cover bg-center bg-no-repeat h-[250px] lg:h-[450px]"
          style={{
            backgroundImage: `url(${modalPlayImg})`,
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
        </div>
        <div className="flex flex-col gap-3 lg:gap-5 p-5 text-white">
          <h1 className="font-bold text-2xl">Nice To Meet You</h1>
          <p>Pekuliahan Pertama kali R6</p>
          <p>SARAN KATA KATA BAGUS DISINI!!!</p>
          <p>
            Thank You All,
            <br />
            R6
          </p>
        </div>
      </Modal>
    </main>
  );
}

export default App;