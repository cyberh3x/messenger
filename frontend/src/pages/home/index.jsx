import ImageBox from "components/box/imageBox";
import AppLayout from "pages/layouts/app";

const Home = () => {
  return (
    <AppLayout>
      <ImageBox
        image="/assets/images/home.svg"
        imageProps={{ alt: "Home", title: "Home" }}
      />
    </AppLayout>
  );
};

export default Home;
