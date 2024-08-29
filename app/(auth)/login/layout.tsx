// import { Navbar } from "@nextui-org/navbar";
import { Navbar } from "@/components/navbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Navbar />
			{children}
		</section>
	);
}
