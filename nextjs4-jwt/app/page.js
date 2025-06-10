import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>This is a protected route. Only accessible if logged in as admin.</p>
      <Image
        src="/images/admin-dashboard.png"
        alt="Admin Dashboard"
        width={500}
        height={300}
      />
    </div>
  );
}
