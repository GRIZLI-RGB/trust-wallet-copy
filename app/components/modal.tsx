import { Modal as ReactResponsiveModal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";

interface ModalProps {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
	return (
		<ReactResponsiveModal open={open} onClose={onClose}>
			<div>{children}</div>
		</ReactResponsiveModal>
	);
}
