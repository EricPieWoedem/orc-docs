"use client";

import { APP_URL, cn } from "@/app/utils";

import { IconButton } from "@/components/icon-button";
import { CloseIcon } from "@/icons/close-icon";
import { MenuIcon } from "@/icons/menu-icon";
import {
	CloseButton,
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from "@headlessui/react";
import Link from "next/link";
import { ComponentProps, useState } from "react";

export const Navbar = ({ children, ...props }: ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"sticky top-0 z-10 bg-white/90 backdrop-blur-sm",
				"flex items-center justify-between gap-x-8 px-4 py-4 sm:px-6",
			)}
			{...props}
		>
			{children}
			<SiteNavigation />
		</div>
	);
};

function MobileNavigation({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			className="lg:hidden"
		>
			<DialogBackdrop className="fixed inset-0 bg-gray-950/25" />
			<div className="fixed inset-0 flex justify-end pl-11">
				<DialogPanel className="w-full max-w-2xs bg-white px-4 py-5 ring ring-gray-950/10 sm:px-6">
					<div className="flex justify-end">
						<CloseButton
							as={IconButton}
							onClick={onClose}
						>
							<CloseIcon className="stroke-gray-950" />
						</CloseButton>
					</div>
					<div className="mt-4">
						<div className="flex flex-col gap-y-2">
							{[["Home", "/"]].map(([title, href]) => (
								<CloseButton
									as={Link}
									key={href}
									href={href}
									className="block rounded-md px-4 py-1.5 text-lg/7 font-medium tracking-tight text-gray-950 hover:bg-gray-950/5"
								>
									{title}
								</CloseButton>
							))}
						</div>
						<div className="mt-6 flex flex-col gap-y-2">
							<CloseButton
								as={Link}
								href={process.env.APP_URL ?? "https://web.dev.apps.orc.gov.gh/"}
								target="_blank"
								className="rounded-md gap-x-1.5 items-center justify-start inline-flex px-4 py-1 text-sm/7 font-semibold text-gray-950 hover:bg-gray-950/5"
							>
								Go To App
							</CloseButton>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}

function SiteNavigation() {
	let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="flex items-center">
			<IconButton
				className="lg:hidden"
				onClick={() => setMobileMenuOpen(true)}
			>
				<MenuIcon className="fill-gray-950" />
			</IconButton>
			<MobileNavigation
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
			/>
			<div className="flex gap-x-6 text-sm/6 text-gray-950 max-lg:hidden">
				<Link href="/">Home</Link>

				<Link
					href={APP_URL ?? "https://web.dev.apps.orc.gov.gh/"}
					target="_blank"
					title="Go To Web Application"
				>
					Go To App{" "}
				</Link>
			</div>
		</nav>
	);
}
