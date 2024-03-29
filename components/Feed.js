import Footer from "./Footer";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-5xl mx-5 md:mx-auto '>
      {/* Left Section */}
      <section className='col-span-2'>
        <Stories />
        <Posts />
      </section>
      {/* Right Section */}

      <section className='hidden xl:inline-grid md:col-span-1 ml-8'>
        <div className='fixed top-18 w-[310px]'>
          <MiniProfile />
          <Suggestions />
          <Footer />
        </div>
      </section>
    </main>
  );
}

export default Feed;
