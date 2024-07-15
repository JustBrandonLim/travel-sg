export const runtime = "edge";

export default function Footer() {
  return (
    <footer>
      <span className="block">&copy; {new Date().getFullYear()}, TravelSG</span>
    </footer>
  );
}
