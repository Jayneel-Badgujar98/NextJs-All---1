import Image from "next/image";
import FeedbackForm from "./feedbackForm";
import ImagesGalleryApp from "./ImagesGalleryApp"
import ProfileIcon from "@/components/ProfileIcon";

export default function Home() {
  return (
    <div className="bg-black" >
      {/* <FeedbackForm /> */}
      <ProfileIcon />
      <ImagesGalleryApp />
    </div>
  );
}
