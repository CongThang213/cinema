import Navbar from "@/components/layout/navbar";
import Banner from "@/components/home/Banner";
import MovieList from "@/components/home/MovieList";
import Footer from "@/components/layout/footer";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <Banner />
        <MovieList />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
