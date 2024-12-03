export default function Footer() {
	return (
		<footer className="fixed bottom-0 hidden w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-4 sm:flex-row md:px-6 lg:flex">
			<p className="text-xs">© 2024 FiBucks. All rights reserved.</p>
			<nav className="flex gap-4 sm:ml-auto sm:gap-6">
				<a className="text-xs underline-offset-4 hover:underline" href="#">
					Terms of Service
				</a>
				<a className="text-xs underline-offset-4 hover:underline" href="#">
					Privacy
				</a>
			</nav>
		</footer>
	);
}
