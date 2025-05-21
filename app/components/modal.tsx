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
			<div>{children}</div>
		</ReactResponsiveModal>
	);
}
