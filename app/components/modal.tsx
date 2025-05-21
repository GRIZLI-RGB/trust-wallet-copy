import { Modal as ReactResponsiveModal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

interface ModalProps {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
	return (
		<ReactResponsiveModal
			showCloseIcon={false}
			classNames={{
				modal: "!bg-[#1b1b1c] !rounded-[24px] !py-5 !px-4",
			}}
			center
			open={open}
			onClose={onClose}
		>
			<div className="relative">
				<div className="absolute top-0 right-1">
					<div className="flex w-full">
						<button
							data-testid="close-modal-button"
							type="button"
							className="outline-none bg-transparent text-background-1 py-4 px-4 text-subheader-16 leading-subheader-16 default-button !p-0 w-full"
							onClick={onClose}
						>
							<svg
								className="text-utility-1-opacity-1"
								fill="none"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.69611 5.07538L4.57479 7.1967L9.87809 12.5L4.57479 17.8033L6.69611 19.9246L11.9994 14.6213L17.3027 19.9246L19.424 17.8033L14.1207 12.5L19.424 7.1967L17.3027 5.07538L11.9994 10.3787L6.69611 5.07538Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</div>
				</div>

				{children}
			</div>
		</ReactResponsiveModal>
	);
}
